import { z } from "zod"

import { Gender } from "@/generated/prisma/browser";

export const studentSchema = z.object({
    number: z.string().regex(/^\d{10}$/),
    secondaryNumber: z.string().regex(/^\d{10}$/),

    parentName: z.string().min(3),
    name: z.string().min(3),

    email: z.string().email().optional().or(z.literal("")),

    age: z.coerce.number().min(0),

    grade: z.string(),
    gender: z.nativeEnum(Gender),
    schoolName: z.string(),
    address: z.string(),

    programFee: z.coerce.number().optional(),
    totalFee: z.coerce.number().optional(),
    totalFeeAfterDiscount: z.coerce.number().optional(),
    taxableAmount: z.coerce.number().optional(),

    discountPercent: z.coerce.number().default(0),
    discountPrice: z.coerce.number().default(0),

    vatAmount: z.coerce.number().optional(),
    paidAmount: z.coerce.number().optional(),

    joinedDate: z.coerce.date().optional(),
    attendance: z.coerce.number().optional(),

    branchId: z.string(),

    enrolledPrograms: z.array(
        z.object({
            branchProgramId: z.string().min(1),
            timeTableId: z.string().min(1),
        })
    ).min(1),
});


export const updateStudentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    secondaryNumber: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),

    parentName: z.string().optional(),
    name: z.string().optional(),

    email: z.string().email().optional().or(z.literal("")),

    age: z.coerce.number().min(1).optional(),

    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),

    schoolName: z.string().optional(),
    address: z.string().optional(),

    joinedDate: z.coerce.date().optional(),

    branchId: z.string().optional(),

    enrolledPrograms: z
        .array(
            z.object({
                id: z.string().optional(),
                branchProgramId: z.string().min(1),
                timeTableId: z.string().min(1),
            })
        )
        .min(1, "At least one program must be selected")
        .optional(),
});
