import { AttendanceStatus, Student, StudentEnrollment, Payment } from "@/generated/prisma";

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


export type StudentEnrollmentType = StudentEnrollment & {
  student: {
    name: string,
    number: string
  },
  attendance: { id: string, status: AttendanceStatus, date: string }[]

}

export type StudentDetailType = Omit<
  Student,
  "createdAt" | "updatedAt" | "enrolledDate" | "startedDate"
> & {
  createdAt: string;
  updatedAt: string;
  enrolledDate: string;
  startedDate: string | null;
  Branch: { name: string };
  StudentEnrollment: {
    id: string;
    branchProgram: {
      id: string;
      program: {
        name: string;
      };
    };
    timeTable: {
      startTime: string;
      endTime: string;
      id: string;
    };
  }[];
  Payment: PaymentType[];
};

export type PaymentType = Omit<
  Payment,
  "createdAt" | "updatedAt" | "lastPaidDate"
> & {
  createdAt: string;
  updatedAt: string;
  lastPaidDate: string | null;
};





