import { FollowUp, FollowUpStatus, Lead, Priority } from "@/generated/prisma";
import { string } from "zod";


export type LeadType = Omit<Lead, "createdAt" | "updatedAt" | "due_date"> & {
    createdAt: string
    updatedAt: string
    due_date?: string | null
    user: {
        name: string, id: string
    },
    followups: { priority: Priority, status: FollowUpStatus }[]
}


export type LeadDetailType = Omit<Lead, "createdAt" | "updatedAt" | "due_date"> & {
    createdAt: string
    updatedAt: string
    due_date?: string | null

    user: {
        name: string, email: string
    },
}



