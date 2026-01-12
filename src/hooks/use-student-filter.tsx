import { PaymentStatus } from "@/generated/prisma/browser";
import { create } from "zustand";

type StudentFilters = {
  search?: string;
  branch?: string;
  joinDate?: string;
  program?: string;
  paymentStatus?: PaymentStatus;
};

type StudentFilterStore = StudentFilters & {
  setFilter: <K extends keyof StudentFilters>(
    key: K,
    value: StudentFilters[K]
  ) => void;
  resetFilters: () => void;
};

export const useStudentFilters = create<StudentFilterStore>((set) => ({
  search: undefined,
  branch: undefined,
  joinDate: undefined,
  program: undefined,
  paymentStatus: undefined,
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  resetFilters: () =>
    set({
      search: undefined,
      branch: undefined,
      joinDate: undefined,
      program: undefined,
      paymentStatus: undefined,
    }),
}));
