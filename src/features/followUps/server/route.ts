import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";


import { authMiddleware } from "@/lib/hono-middleware";
import { Variables } from "@/lib/auth"
import { db } from "@/lib/db";
import { followUpSchema, leadSchema } from "@/schema";


const app = new Hono<{ Variables: Variables }>()

    .get("/", authMiddleware, zValidator("query", z.object({ leadId: z.string() })), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { leadId } = c.req.valid("query")
        if (!leadId) {
            throw new HTTPException(403, { message: "Lead Id is required" });
        }

        const followups = await db.followUp.findMany({
            where: {
                leadId
            },
            include: {
                user: true
            },


            orderBy: {
                createdAt: "desc"
            }
        })

        if (!followups) {
            throw new HTTPException(500, { message: "Internal server Error" });
        }

        console.log(followups)

        return c.json({
            data: followups,
            total: followups.length
        })




    })
    .post("/", authMiddleware, zValidator("json", followUpSchema), async (c) => {
        console.log("hello")
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }


        //TODO: need to check lead exist with this id or not first

        const { due_date, remark, priority, status, leadId } = c.req.valid("json")
        console.log("🚀 ~ due_date:", due_date)

        console.log(due_date)

        const lead = await db.lead.findUnique({
            where: {
                id: leadId
            }
        })

        if (!lead) {
            throw new HTTPException(404, { message: "lead not found" })
        }

        const followUp = await db.followUp.create({
            data: {
                leadId,
                due_date, status, remark, priority, userId: user.id
            }
        })

        if (!followUp) {
            throw new HTTPException(500, { message: "Server Error" })
        }


        const updatedLead = await db.lead.update({
            where: {
                id: leadId
            },
            data: {
                status: followUp.status
            }
        })

        if (!updatedLead) {
            throw new HTTPException(500, { message: "unable to update lead status" })
        }

        return c.json({ data: followUp })

    })




export default app