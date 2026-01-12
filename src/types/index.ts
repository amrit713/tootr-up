



import { FollowUpStatus, Lead, Priority, } from "@/generated/prisma/enums";
import { UserWithRole } from "better-auth/plugins";

import { StudentType, StudentEnrollmentType, StudentDetailType, PaymentType } from "./students";

export type { StudentType, StudentEnrollmentType, StudentDetailType, PaymentType }



export type LeadType = Omit<Lead, "createdAt" | "updatedAt" | "due_date"> & {
    createdAt: string
    updatedAt: string
    due_date?: string | null
    user: {
        name: string, id: string
    },
    assignee: {
        name: string, id: string
    } | null,
    branch: {
        name: string
    } | null;
    followups: { priority: Priority, status: FollowUpStatus }[]
}


export type LeadDetailType = Omit<Lead, "createdAt" | "updatedAt" | "due_date"> & {
    createdAt: string
    updatedAt: string
    due_date?: string | null

    user: {
        name: string, email: string
    },
    assignee: {
        name: string, id: string
    } | null,

    branch: {
        name: string
    } | null
}


export type UserType = UserWithRole & { status: string }


