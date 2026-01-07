import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";


import { authMiddleware } from "@/lib/hono-middleware";
import { Variables } from "@/lib/auth"
import { db } from "@/lib/db";
import { AttendanceStatus } from "@/generated/prisma";



const filterSchema = z.object({
    program: z.string(),
    slotTime: z.string(),
    date: z.string().nullish(),
    attendanceStatus: z.nativeEnum(AttendanceStatus).nullish(),
    name: z.string().nullish()


})



const app = new Hono<{ Variables: Variables }>()

    .get("/", authMiddleware, zValidator("query", filterSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { program, slotTime, date, name } = c.req.valid("query")

        const studentEnrollments = await db.studentEnrollment.findMany({
            where: {
                branchProgramId: program,
                timeTableId: slotTime,
                student: (name || date) ? {
                    name: name ? {
                        contains: name,
                        mode: 'insensitive'
                    } : undefined,
                    enrolledDate: date ? { lte: new Date(date) } : undefined,
                } : undefined,
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

                        date: date ? new Date(date) : undefined,

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
    .get("/:id/analytics", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param();


        const totalAttendance = await db.attendance.count({
            where: {
                studentEnrollmentId: id
            }
        })

        const absent = await db.attendance.count({
            where: {
                studentEnrollmentId: id,
                status: AttendanceStatus.ABSENT
            }
        })

        const present = await db.attendance.count({
            where: {
                studentEnrollmentId: id,
                status: AttendanceStatus.PRESENT
            }
        })

        const absentPrecentage = (absent / totalAttendance) * 100
        const presentPrecentage = (present / totalAttendance) * 100


        return c.json({
            data: {
                totalAttendance,
                present, absent, absentPrecentage, presentPrecentage
            }
        })


    })

export default app