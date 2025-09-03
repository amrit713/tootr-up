
import { CompanyBranch, Gender, LeadSource, LeadStatus } from "@/generated/prisma"
import { z } from "zod"

export const leadSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentName: z.string().optional(),
    email: z.email().or(z.literal("")).optional(),
    studentName: z.string().optional(),
    age: z.string().optional(),
    grade: z.string().optional(),
    gender: z.enum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(LeadStatus).optional(),
    source: z.enum(LeadSource).optional(),
    branch: z.enum(CompanyBranch).optional(),
    programs: z.array(z.string()).optional()
})

export const updateLeadSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    email: z.email().or(z.literal("")).optional(),
    parentName: z.string().optional(),
    age: z.string().regex(/^\d+$/, {
        message: "Input must be a valid number (digits only)",
    }).optional().or(z.literal("")),
    grade: z.string().optional(),
    gender: z.enum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(LeadStatus).optional(),
    source: z.enum(LeadSource).optional(),
    branch: z.enum(CompanyBranch).optional(),
    programs: z.array(z.string()).optional()
})




