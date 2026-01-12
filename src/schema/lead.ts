
import { Gender, LeadSource, LeadStatus } from "@/generated/prisma/browser"
import { z } from "zod"

export const leadSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentName: z.string().optional(),
    email: z.string().email().or(z.literal("")).optional(),
    studentName: z.string().optional(),
    age: z.string().regex(/^\d+$/, {
        message: "Input must be a valid number (digits only)",
    }).optional(),
    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    branchId: z.string().optional(),
    programs: z.array(z.string()).optional(),
    assigneeId: z.string().optional(),
})

export const updateLeadSchema = z.object({
    number: z.string().regex(/^\d{10}$/, "Invalid phone number").optional(),
    email: z.string().email().or(z.literal("")).optional(),
    parentName: z.string().optional(),
    studentName: z.string().optional(),
    age: z.string().regex(/^\d+$/, {
        message: "Input must be a valid number (digits only)",
    }).optional(),
    grade: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    schoolName: z.string().optional(),
    address: z.string().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    branchId: z.string().optional(),
    assigneeId: z.string().optional(),
    programs: z.array(z.string()).optional()
})

const numberFromCSV = z
    .string()
    .optional()
    .transform((val) => {
        if (!val) return undefined;
        const trimmed = val.trim();
        if (trimmed === "") return undefined;
        const num = Number(trimmed);
        return Number.isNaN(num) ? undefined : num;
    });



const allowedStatuses = [
    "NEW",
    "ONGOING",
    "CRITICAL",
    "CONVERTED",
    "LOST",
    "DEMO",
    "CALL_NOT_RECEIVED",
] as const;
const statusEnum = z
    .string()
    .nullable()
    .optional()
    .transform((v) => {
        if (!v) return "NEW";

        const trimmed = v.trim().toUpperCase();

        // If valid → return as is
        if (allowedStatuses.includes(trimmed as any)) {
            return trimmed;
        }

        // If invalid → default to NEW
        return "NEW";
    });






const phoneFromCSV = z
    .string()
    .transform((val) => {

        const cleaned = val.replace(/\D/g, "")

        return cleaned;
    });


export const leadItemSchema = updateLeadSchema.omit({
    branchId: true,
    programs: true, number: true,
    age: true,
    status: true,
}).extend({
    number: phoneFromCSV,
    branch: z.string().optional(),
    programId: z.string(),
    createdAt: z.string().optional(),
    dueDate:
        z.string().optional(),
    remark: z.string().optional(),
    age: numberFromCSV,
    status: statusEnum,

})







