import { z } from "zod"

import { CompanyBranch, Gender, LeadSource, LeadStatus } from "@/generated/prisma";

export const studentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentName: z.string().min(3, "parent name must be at least 3 digit"),
    email: z.email(),
    age: z.number(),
    grade: z.string(),
    gender: z.enum(Gender),
    schoolName: z.string(),
    address: z.string(),
    status: z.enum(LeadStatus),
    source: z.enum(LeadSource),
    branch: z.enum(CompanyBranch)

})
export const updateStudentSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    email: z.email().optional(),
    parentName: z.string().min(3, "parent name must be at least 3 digit").optional(),
    age: z.number().optional(),
    grade: z.string().optional(),
    gender: z.enum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(LeadStatus).optional(),
    source: z.enum(LeadSource).optional(),
    branch: z.enum(CompanyBranch).optional()
})