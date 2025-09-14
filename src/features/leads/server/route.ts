import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
import { HTTPException } from "hono/http-exception";


import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { leadSchema, updateLeadSchema } from "@/schema";
import { db } from "@/lib/db";
import { Priority } from "@/generated/prisma";


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
                        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
    .get("/", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const leads = await db.lead.findMany({
            include: {
                user: {
                    select: {
                        name: true, id: true
                    }
                },
                followups: {
                    select: {
                        due_date: true,
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
            data: leads
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