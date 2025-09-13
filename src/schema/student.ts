import { z } from "zod"

import { CompanyBranch, Gender, LeadSource, LeadStatus } from "@/generated/prisma";

export const studentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentName: z.string().min(3, "parent name must be at least 3 digit"),
    email: z.string().email(),
    age: z.number(),
    grade: z.string(),
    gender: z.nativeEnum(Gender),
    schoolName: z.string(),
    address: z.string(),
    status: z.nativeEnum(LeadStatus),
    source: z.nativeEnum(LeadSource),
    branch: z.nativeEnum(CompanyBranch)

})
export const updateStudentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    email: z.string().email().optional(),
    parentName: z.string().min(3, "parent name must be at least 3 digit").optional(),
    age: z.number().optional(),
    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    branch: z.nativeEnum(CompanyBranch).optional()
})