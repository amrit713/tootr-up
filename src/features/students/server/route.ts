import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";
import { studentSchema, updateStudentSchema } from "@/schema";
import { PaymentStatus } from "@/generated/prisma";




const filterSchema = z.object({
    search: z.string().nullish(),
    joinDate: z.string().nullish(),
    branch: z.string().nullish(),
    program: z.string().nullish(),
    paymentStatus: z.nativeEnum(PaymentStatus).nullish()

})

const app = new Hono<{ Variables: Variables }>()
    .post("/", authMiddleware, zValidator("json", studentSchema), async (c) => {

        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { name, number, secondaryNumber, parentName, email, age, grade, gender, schoolName, address, branchId, totalFee, totalFeeAfterDiscount, taxableAmount, discountPrice, vatAmount, paidAmount, enrolledPrograms, joinedDate } = c.req.valid("json")




        const dueAmount = (totalFeeAfterDiscount ?? 0) - (paidAmount ?? 0)

        const student = await db.student.create({
            data: {
                name, number, secondaryNumber, parentName, grade, gender, schoolName, address, email, branchId, age: Number(age), enrolledDate: joinedDate ?? new Date(),
                StudentEnrollment: {
                    create: enrolledPrograms.map((p) => ({
                        branchProgramId: p.branchProgramId,
                        timeTableId: p.timeTableId, enrolledDate: joinedDate ?? new Date()
                    }))
                },

                Payment: {
                    create: {
                        totalFee: totalFee ?? 0, totalFeeAfterDiscount: totalFeeAfterDiscount ?? 0, taxableAmount: taxableAmount ?? 0, vatAmount: vatAmount ?? 0, paidAmount, discountPrice, dueAmount, paymentStatus: dueAmount === 0 ? PaymentStatus.PAID : PaymentStatus.PARTIAL
                    }
                }
            }
        })

        if (!student) {
            throw new HTTPException(500, { message: "Unable to created student" })
        }

        return c.json({ data: student })
    })
    .get("/", authMiddleware, zValidator("query", filterSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { search, joinDate, branch, program, paymentStatus } = c.req.valid("query")





        let startOfDay;
        let endOfDay;

        if (joinDate) {
            const date = new Date(joinDate)

            startOfDay = new Date(date.setHours(0, 0, 0, 0))
            endOfDay = new Date(date.setHours(23, 59, 59, 999));



        }

        let students = await db.student.findMany({
            where: {
                name: search ? {
                    contains: search,
                    mode: "insensitive"
                } : undefined,

                createdAt: joinDate ? {
                    gte: startOfDay,
                    lte: endOfDay
                } : undefined,
                branchId: branch ? branch : undefined,
                StudentEnrollment: program ? {
                    some: {
                        branchProgram: {
                            programId: program
                        }
                    }
                } : undefined,

            },
            include: {
                Branch: {
                    select: {
                        name: true
                    }
                },
                Payment: {
                    select: {
                        dueAmount: true,
                        paymentStatus: true,



                    }, orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })



        if (!students) {
            throw new HTTPException(404, { message: "Students not found" })
        }

        if (paymentStatus) {
            students = students.filter((s) => s.Payment[0]?.paymentStatus === paymentStatus)
        }

        return c.json({
            data: students,
        })

    })
    .get("/:id", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param()

        const student = await db.student.findUnique({
            where: {
                id
            }, include: {
                Branch: {
                    select: {
                        name: true
                    }
                },
                StudentEnrollment: {

                    select: {
                        id: true,
                        branchProgram: {
                            select: {
                                id: true,
                                program: {
                                    select: {
                                        name: true,

                                    }
                                }
                            }
                        }, timeTable: {
                            select: {
                                id: true,
                                startTime: true, endTime: true
                            }
                        }
                    }

                },
                Payment: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })



        if (!student) {
            throw new HTTPException(400, { message: "Student not found" });
        }

        return c.json({
            data: student
        })
    })
    .patch("/:id", authMiddleware, zValidator("json", updateStudentSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param()

        const { name, number, secondaryNumber, parentName, email, age, grade, gender, schoolName, address, branchId, joinedDate } = c.req.valid("json")

        const student = await db.student.update({
            where: {
                id
            },
            data: {
                name, number, secondaryNumber, parentName, grade, gender, schoolName, address, email, branchId, age: age ? Number(age) : undefined, enrolledDate: joinedDate ?? new Date(),
            }
        })


        if (!student) {
            throw new HTTPException(400, { message: "Student not found" });
        }

        return c.json({
            data: student
        })
    })


export default app