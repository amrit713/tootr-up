import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


import {
  isToday,
  isTomorrow,
  isThisWeek,
  isSameWeek,
  addWeeks,
  format,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const snakeCaseToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};



export function getDueDateLabel(dueDate: Date): string {
  if (isToday(dueDate)) return "Today";
  if (isTomorrow(dueDate)) return "Tomorrow";

  if (isThisWeek(dueDate, { weekStartsOn: 1 })) return "This week";

  if (isSameWeek(dueDate, addWeeks(new Date(), 1), { weekStartsOn: 1 })) {
    return "Next week";
  }

  return format(dueDate, "MMM dd, yyyy"); // fallback
}


export function currencyFormatter(amount: number | string = 0) {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString("en-IN", {

    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `Rs. ${formatted}`
}


export function vatCalculate(amount: number | string = 0) {
  const num = Number(amount) || 0;

  return num * 13 / 100
}