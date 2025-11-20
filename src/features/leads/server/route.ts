import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { HTTPException } from "hono/http-exception";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";


import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { leadItemSchema, leadSchema, updateLeadSchema } from "@/schema";
import { db } from "@/lib/db";
import { LeadStatus, Priority } from "@/generated/prisma";
import { parseCSVDate } from "@/lib/utils";



const filterSchema = z.object({
    search: z.string().nullish(),
    dueDate: z.string().nullish(),
    status: z.nativeEnum(LeadStatus).nullish(),
    assigneeId: z.string().nullish()

})


const app = new Hono<{ Variables: Variables }>()
    .post("/", authMiddleware, zValidator("json", leadSchema), async c => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { number, parentName, age, grade, gender, schoolName, address, status, source, branchId, email, programs, assigneeId, studentName } = c.req.valid("json")

        const existinglead = await db.lead.findUnique({
            where: {
                number
            }
        })

        if (existinglead) {
            throw new HTTPException(409, { message: "Lead with this number already exist" })
        }



        const lead = await db.lead.create({
            data: {
                number, parentName, age: age ? Number(age) : undefined, grade, gender, studentName, schoolName, address, status, source, branchId, userId: user.id, email, programs: programs && [...programs], assigneeId,

                followups: {
                    create: {
                        priority: Priority.LOW,
                        userId: user.id,

                    }
                }
            }

        })
        if (!lead) {
            throw new HTTPException(500, { message: "Server Error" })
        }

        return c.json({
            data: lead
        })

    })


    .get("/", authMiddleware, zValidator("query", filterSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { search, dueDate, status, assigneeId } = c.req.valid("query")



        let startOfDay;
        let endOfDay;

        if (dueDate) {
            const date = new Date(dueDate)

            startOfDay = new Date(date.setHours(0, 0, 0, 0))
            endOfDay = new Date(date.setHours(23, 59, 59, 999));



        }

        const leads = await db.lead.findMany({
            where: {
                status: status || undefined,
                number: search ? {
                    contains: search,
                    mode: "insensitive"
                } : undefined,

                due_date: dueDate ? {
                    gte: startOfDay,
                    lte: endOfDay
                } : undefined,
                assigneeId: assigneeId ? assigneeId : undefined



            },
            include: {
                branch: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                assignee: {
                    select: {
                        name: true, id: true,
                    }
                },
                followups: {
                    take: 1,
                    select: {

                        priority: true,
                        status: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })


        if (!leads) {
            throw new HTTPException(404, { message: "Leads not found" })
        }



        return c.json({
            totalLead: leads.length,
            data: leads,
            startOfDay, endOfDay
        })
    })
    .post("/bulk-create", authMiddleware, zValidator("json", z.array(leadItemSchema)), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const data = c.req.valid("json")





        const branches = await db.branch.findMany({
            select: { id: true, name: true },
        });

        const branchMap = Object.fromEntries(
            branches.map((b) => [b.name.toLowerCase(), b.id])
        );


        const seen = new Set();

        const uniqueRows = data.filter((row) => {
            if (seen.has(row.number)) return false;
            seen.add(row.number);
            return true;
        });

        const leadsToInsert = uniqueRows.map(lead => ({
            userId: user.id,
            number: lead.number,
            email: lead.email ?? undefined,
            grade: lead.grade ?? undefined,
            address: lead.address ?? undefined,


            // createdAt: lead.createdAt,
            status: lead.status as LeadStatus ?? "NEW",
            // due_date: lead.dueDate,

            parentName: lead.parentName,
            programs: lead.programId ? [lead.programId] : undefined,
            branchId: lead.branch ? branchMap[lead.branch] : undefined,
            studentName: lead.studentName ?? undefined
        }));




        const result = await db.lead.createMany({
            data: leadsToInsert,
            skipDuplicates: true
        })


        if (!result) {
            throw new HTTPException(500, { message: "Server Error" })
        }

        const createdLeads = await db.lead.findMany({
            where: {
                number: { in: uniqueRows.map(r => r.number) }
            }
        });

        const followupsToInsert = createdLeads.map((lead, i) => ({
            leadId: lead.id,
            userId: user.id,
            priority: Priority.LOW,
            remark: uniqueRows[i].remark ?? "",
            status: uniqueRows[i].status as LeadStatus ?? "NEW",
        }));

        await db.followUp.createMany({
            data: followupsToInsert
        });


        return c.json({
            data: result
        })
    })
    .get("/analytics", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        // const now = new Date();
        // const thisMonthStart = startOfMonth(now);
        // const thisMonthEnd = endOfMonth(now);
        // const lastMonthStart = startOfMonth(subMonths(now, 1));
        // const lastMonthEnd = endOfMonth(subMonths(now, 1));

        const totalLeadCount = await db.lead.count({})
        const convertedLead = await db.lead.count({
            where: {
                status: LeadStatus.CONVERTED
            }
        })
        const lostLead = await db.lead.count({
            where: {
                status: LeadStatus.LOST
            }
        })
        const criticalLead = await db.lead.count({
            where: {
                status: LeadStatus.CRITICAL
            }
        })

        const convertedPrecentage = (convertedLead / totalLeadCount) * 100
        const lostPrecentage = (lostLead / totalLeadCount) * 100
        const criticalPrecentage = (criticalLead / totalLeadCount) * 100



        return c.json({
            data: {
                totalLead: totalLeadCount,
                lostLead,
                criticalLead, convertedLead,
                lostPrecentage, criticalPrecentage, convertedPrecentage
            }
        })
    })
    .get("/:leadId", authMiddleware, async c => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { leadId } = c.req.param()
        if (!leadId) {
            throw new HTTPException(404, { message: "No params Id found" });
        }

        const lead = await db.lead.findUnique({
            where: {
                id: leadId,

            },
            include: {
                user: {

                    select: {
                        name: true,
                        email: true
                    },

                },


                assignee: {
                    select: {
                        name: true, id: true,
                    }
                },
                branch: {
                    select: {
                        name: true
                    }
                }
            }

        })

        if (!lead) {
            throw new HTTPException(404, { message: "Lead not found" })
        }

        return c.json({
            data: lead
        })
    })
    .patch("/:leadId", authMiddleware, zValidator("json", updateLeadSchema), async c => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { leadId } = c.req.param()
        if (!leadId) {
            throw new HTTPException(404, { message: "No params Id found" });
        }

        const { number, parentName, age, grade, gender, schoolName, address, status, source, branchId, email, programs } = c.req.valid("json")

        const lead = await db.lead.update({
            where: {
                id: leadId
            },
            data: {
                number, parentName, age: age ? Number(age) : undefined, grade, gender, schoolName, address, status, source, branchId, email, programs: programs && [...programs]
            }
        })

        if (!lead) {
            throw new HTTPException(404, { message: "Lead not found" })
        }



        return c.json({
            data: lead
        })
    })
    .delete("/:leadId", authMiddleware, async c => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { leadId } = c.req.param()
        if (!leadId) {
            throw new HTTPException(404, { message: "No params Id found" });
        }

        await db.lead.delete({
            where: {
                id: leadId
            }
        })



        return c.json({
            data: leadId
        })
    })



export default app