import { z } from "zod";

import { FollowUpStatus, Priority } from "@/generated/prisma/enums";

export const followUpSchema = z.object({
    due_date: z.coerce.date().optional(),
    priority: z.nativeEnum(Priority, { required_error: "Required" }),
    remark: z.string().optional(),
    status: z.nativeEnum(FollowUpStatus, { required_error: "Required" }),
    leadId: z.string().min(1, "required"),
    assigneeId: z.string().optional(),
})
export const updateFollowUpSchema = z.object({
    due_date: z.coerce.date().optional(),
    remark: z.string().optional()
})