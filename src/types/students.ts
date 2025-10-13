import { PaymentStatus, Student } from "@/generated/prisma";

export type StudentType = Omit<
  Student,
  "createdAt" | "updatedAt" | "enrolledDate" | "startedDate"
> & {
  createdAt: string;
  updatedAt: string;
  enrolledDate: string;
  startedDate: string | null;
  Branch: {
    name: string;
  };
  Payment: {
    dueAmount: number,
    paymentStatus: string,
  }[]
};
