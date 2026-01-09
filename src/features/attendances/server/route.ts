import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";
import { AttendanceStatus } from "@/generated/prisma";


const app = new Hono<{ Variables: Variables }>()
    .get("/", authMiddleware, zValidator("query", z.object({
        date: z.string(),
        branchProgramId: z.string(),
        timeTableId: z.string()

    })), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { date, branchProgramId, timeTableId } = c.req.valid("query")

        const enrollments = await db.studentEnrollment.findMany({
            where: { branchProgramId, timeTableId },
            select: { id: true },
        });

        const studentEnrollmentIds = enrollments.map(e => e.id);

        const convertDate = new Date(date)

        const attendances = await db.attendance.findMany({
            where: {
                date: convertDate,
                studentEnrollmentId: { in: studentEnrollmentIds }
            },

        })

        if (!attendances) {
            throw new HTTPException(500, { message: "Server Error" })
        }

        return c.json({ data: attendances })

    })
    .post("/", authMiddleware, zValidator("json", z.object({
        date: z.string(),
        studentEnrollmentId: z.string(),
        status: z.nativeEnum(AttendanceStatus),

    })), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "trainer") {
            throw new HTTPException(401, { message: "Only trainers can mark attendance" });
        }


        const { date, studentEnrollmentId, status } = c.req.valid("json")


        const convertDate = new Date(date)

        const existingAttendance = await db.attendance.findFirst({
            where: {
                date: convertDate,
                studentEnrollmentId
            }
        })

        if (existingAttendance) {
            const attendance = await db.attendance.update({
                where: {
                    id: existingAttendance.id,
                }, data: {
                    status
                }
            })

            return c.json({ data: { id: attendance.id } })
        }

        const attendance = await db.attendance.create({
            data: {
                date: convertDate,
                studentEnrollmentId,
                status
            }
        })

        return c.json({ data: { id: attendance.id } })







    }).get("/:id", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param()



        const attendance = await db.attendance.findUnique({
            where: {
                id
            },

        })

        if (!attendance) {
            throw new HTTPException(500, { message: "Unable to created" })
        }

        return c.json({ data: attendance })
    })

export default app