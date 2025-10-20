import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";


import { authMiddleware } from "@/lib/hono-middleware";
import { Variables } from "@/lib/auth"
import { db } from "@/lib/db";



const filterSchema = z.object({
    program: z.string(),
    slotTime: z.string(),
    date: z.string().nullish(),


})

const app = new Hono<{ Variables: Variables }>()

    .get("/", authMiddleware, zValidator("query", filterSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { program, slotTime, date } = c.req.valid("query")
        console.log("🚀 ~ date:", date)



        const studentEnrollments = await db.studentEnrollment.findMany({
            where: {
                branchProgramId: program,
                timeTableId: slotTime
            }
            ,
            include: {
                student: {
                    select: {
                        name: true,
                        number: true
                    }
                }, attendance: {
                    where: {
                        date: date ? new Date(date) : undefined
                    },
                    select: {
                        id: true, status: true, date: true
                    }
                }
            }
        })

        if (!studentEnrollments) {
            throw new HTTPException(500, { message: "Internal server error" });
        }

        return c.json({
            data: studentEnrollments
        })
    })

export default app