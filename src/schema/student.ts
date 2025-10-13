import { z } from "zod"

import { Gender } from "@/generated/prisma";

export const studentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    secondaryNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentName: z.string().min(3, "parent name must be at least 3 digit"),
    name: z.string().min(3, "name name must be at least 3 digit"),
    email: z.string().email().optional(),
    age: z.string().regex(/^\d+$/, {
        message: "Input must be a valid number (digits only)",
    }),
    grade: z.string(),
    gender: z.nativeEnum(Gender),
    schoolName: z.string(),
    address: z.string(),

    // payment section
    programFee: z.number(),
    totalFee: z.number(),
    totalFeeAfterDiscount: z.number(),
    taxableAmount: z.number(),
    discountPercent: z.number().optional(),
    discountPrice: z.number().optional(),
    vatAmount: z.number(),
    paidAmount: z.number(),

    branchId: z.string(),
    enrolledPrograms: z
        .array(
            z.object({
                branchProgramId: z.string().min(1, "Program must be selected"),
                timeTableId: z.string().min(1, "Please select a time slot for each program"),
            })
        )
        .min(1, "At least one program should be selected")
        .refine(
            (programs) => programs.every((p) => p.timeTableId && p.timeTableId.length > 0),
            { message: "Please select a time slot for all selected programs" }
        ),
})
export const updateStudentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    secondaryNumber: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    parentName: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    age: z.string().regex(/^\d+$/, {
        message: "Input must be a valid number (digits only)",
    }).optional(),
    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    branch: z.string().optional(),

    // payment section
    programFee: z.number(),
    totalFee: z.number(),
    totalFeeAfterDiscount: z.number(),
    taxableAmount: z.number(),
    discountPrice: z.number().optional(),

    // studentEnrollment
    enrolledPrograms: z.array(z.object({
        timeTableId: z.string(),
        branchProgramId: z.string()
    })).min(1, "At least student should enrolled to one program").optional()
})