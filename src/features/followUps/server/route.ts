import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";


import { authMiddleware } from "@/lib/hono-middleware";
import { Variables } from "@/lib/auth"
import { db } from "@/lib/db";
import { followUpSchema, updateFollowUpSchema } from "@/schema";


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

                assignee: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },


            orderBy: {
                createdAt: "desc"
            }
        })

        if (!followups) {
            throw new HTTPException(500, { message: "Internal server Error" });
        }



        return c.json({
            data: followups,
            total: followups.length
        })




    })
    .post("/", authMiddleware, zValidator("json", followUpSchema), async (c) => {

        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        //TODO: need to check lead exist with this id or not first

        const { due_date, remark, priority, status, leadId, assigneeId } = c.req.valid("json")



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
                due_date, status, remark, priority, userId: user.id, assigneeId: assigneeId ?? undefined
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
                status: followUp.status,
                due_date: followUp.due_date,
                assigneeId: followUp.assigneeId
            }
        })

        if (!updatedLead) {
            throw new HTTPException(500, { message: "unable to update lead status" })
        }

        return c.json({ data: followUp })

    })
    .patch("/:followUpId", authMiddleware, zValidator("json", updateFollowUpSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { followUpId } = c.req.param()
        if (!followUpId) {
            throw new HTTPException(400, { message: "follow up id is not provided" });
        }

        const { remark, due_date, } = c.req.valid("json")

        const updatedFollowUp = await db.followUp.update({
            where: {
                id: followUpId
            },
            data: {
                remark, due_date
            }
        })
        if (!updatedFollowUp) {
            throw new HTTPException(404, { message: "Follow up  not found" })
        }


        return c.json({
            data: updatedFollowUp
        })


    })




export default app