import { z } from "zod"

import { Gender } from "@/generated/prisma/browser";

export const studentSchema = z.object({
    number: z.string().regex(/^\d{10}$/),
    secondaryNumber: z.string().regex(/^\d{10}$/),
    parentName: z.string().min(3),
    name: z.string().min(3),
    email: z.string().email().optional().or(z.literal("")),

    // Coerce is fine, but ensure the base type is optional for the resolver
    age: z.coerce.number().min(0).optional(),

    grade: z.string(),
    gender: z.nativeEnum(Gender),
    schoolName: z.string(),
    address: z.string(),

    programFee: z.coerce.number().optional(),
    totalFee: z.coerce.number().optional(),
    totalFeeAfterDiscount: z.coerce.number().optional(),
    taxableAmount: z.coerce.number().optional(),

    // Change .default(0) to .optional()
    discountPercent: z.coerce.number().optional(),
    discountPrice: z.coerce.number().optional(),

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


const phoneSchema = z
    .string()
    .regex(/^\d{10}$/, "Must be a valid 10-digit number");

export const updateStudentSchema = z.object({
    number: phoneSchema.optional(),
    secondaryNumber: phoneSchema.optional(),
    isActive: z.boolean().optional(),
    parentName: z.string().trim().optional(),
    name: z.string().trim().optional(),

    email: z
        .union([z.string().email("Invalid email"), z.literal("")])
        .optional(),

    age: z.coerce
        .number()
        .int("Age must be an integer")
        .min(0, "Age cannot be negative")
        .max(120, "Age seems invalid")
        .optional(),

    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),

    schoolName: z.string().optional(),
    address: z.string().optional(),

    joinedDate: z.coerce
        .date()
        .optional(),

    branchId: z.string().optional(),

    enrolledPrograms: z
        .array(
            z.object({
                id: z.string().optional(), // present when updating
                branchProgramId: z.string().min(1, "Program is required"),
                timeTableId: z.string().min(1, "Time table is required"),
            })
        )
        .min(1, "At least one program must be selected")
        .optional(),
});