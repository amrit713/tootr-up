import { z } from "zod";

import { Priority } from "@/generated/prisma";

export const followUpSchema = z.object({
    due_date: z.date(),
    priority: z.enum(Priority),
    remark: z.string().optional()
})
export const updateFollowUpSchema = z.object({
    due_date: z.date(),
    priority: z.enum(Priority),
    remark: z.string().optional()
})