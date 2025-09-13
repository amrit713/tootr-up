import { FollowUp, FollowUpStatus, Lead, Priority } from "@/generated/prisma";
import { string } from "zod";


export type LeadType = Omit<Lead, "createdAt" | "updatedAt"> & {
    createdAt: string
    updatedAt: string
    user: {
        name: string, id: string
    },
    followups: { due_date: string, priority: Priority, status: FollowUpStatus }[]
}



