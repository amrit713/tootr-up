
import { Gender, LeadSource, LeadStatus } from "@/generated/prisma"
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

const statusEnum = z
    .string()
    .optional()
    .transform((v) => (v?.trim() === "" ? undefined : v))
    .refine(
        (v) =>
            v === undefined ||
            ["NEW", "ONGOING", "CRITICAL", "CONVERTED", "LOST", "DEMO", "CALL_NOT_RECEIVED"].includes(
                v
            ),
        {
            message:
                "Status must be NEW | ONGOING | CRITICAL | CONVERTED | LOST | DEMO | CALL_NOT_RECEIVED",
        }
    );


const dateFromCSV = z
    .string()
    .optional()
    .transform((v) => {
        if (!v) return undefined;

        const trimmed = v.trim();
        if (trimmed === "") return undefined;

        // Try parse directly (ISO works)
        let date = new Date(trimmed);

        // If invalid, try convert DD/MM/YYYY or DD-MM-YYYY → YYYY-MM-DD
        if (isNaN(date.getTime())) {
            const m = trimmed.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
            if (m) {
                const [_, d, mth, y] = m;
                const normalized = `${y}-${mth.padStart(2, "0")}-${d.padStart(2, "0")}`;
                date = new Date(normalized);
            }
        }

        return isNaN(date.getTime()) ? undefined : date; // <-- FIXED
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
    createdAt: dateFromCSV,
    dueDate:
        dateFromCSV,
    remark: z.string().optional(),
    age: numberFromCSV,
    status: statusEnum,

})







