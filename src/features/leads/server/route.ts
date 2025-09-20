import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";


import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { leadSchema, updateLeadSchema } from "@/schema";
import { db } from "@/lib/db";
import { LeadStatus, Priority } from "@/generated/prisma";
import z from "zod";



const filterSchema = z.object({
    search: z.string().nullish(),
    dueDate: z.string().nullish(),
    status: z.nativeEnum(LeadStatus).nullish()

})


const app = new Hono<{ Variables: Variables }>()
    .post("/", authMiddleware, zValidator("json", leadSchema), async c => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { number, parentName, age, grade, gender, schoolName, address, status, source, branch, email, programs, studentName } = c.req.valid("json")

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
                number, parentName, age: age ? Number(age) : undefined, grade, gender, studentName, schoolName, address, status, source, branch, userId: user.id, email, programs: programs && [...programs],

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

        const { search, dueDate, status } = c.req.valid("query")
        console.log("🚀 ~ dueDate:", dueDate)




        let startOfDay;
        let endOfDay;

        if (dueDate) {


            const date = new Date(dueDate)





            startOfDay = new Date(date.setHours(0, 0, 0, 0))
            endOfDay = new Date(date.setHours(23, 59, 59, 999));
            console.log("🚀 ~ startOfDay:", startOfDay)
            console.log("🚀 ~ endOfDay:", endOfDay)


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
                } : undefined

                // due_date: dueDate ? dueDate : undefined
            },
            include: {
                user: {
                    select: {
                        name: true,
                        id: true
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
    .get("/analytics", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const now = new Date();
        const thisMonthStart = startOfMonth(now);
        const thisMonthEnd = endOfMonth(now);
        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));

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

        const { number, parentName, age, grade, gender, schoolName, address, status, source, branch, email, programs } = c.req.valid("json")

        const lead = await db.lead.update({
            where: {
                id: leadId
            },
            data: {
                number, parentName, age: age ? Number(age) : undefined, grade, gender, schoolName, address, status, source, branch, email, programs: programs && [...programs]
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