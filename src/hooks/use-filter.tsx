import { LeadStatus } from "@/generated/prisma";
import { create } from "zustand";

type LeadFilters = {
  search?: string;
  status?: LeadStatus;
  dueDate?: string;
};

type LeadFilterStore = LeadFilters & {
  setFilter: <K extends keyof LeadFilters>(
    key: K,
    value: LeadFilters[K]
  ) => void;
  resetFilters: () => void;
};

export const useLeadFilters = create<LeadFilterStore>((set) => ({
  search: undefined,
  status: undefined,
  dueDate: undefined,
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  resetFilters: () =>
    set({
      search: undefined,
      status: undefined,
      dueDate: undefined,
    }),
}));
