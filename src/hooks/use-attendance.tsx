import { create } from "zustand";

type StudentFilter = {
  branch?: string;
  timeSlot?: string;
  program?: string;
  date?: string;
};

type AttedanceFilter = StudentFilter & {
  setFilter: <K extends keyof StudentFilter>(
    key: K,
    value: StudentFilter[K]
  ) => void;
  resetFilters: () => void;
};

export const useAttendanceFilters = create<AttedanceFilter>((set) => ({
  branch: undefined,
  timeSlot: undefined,
  program: undefined,
  date: undefined,
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  resetFilters: () =>
    set({
      branch: undefined,
      timeSlot: undefined,
      program: undefined,
      date: undefined,
    }),
}));
