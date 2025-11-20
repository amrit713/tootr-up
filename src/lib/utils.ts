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


export function parseCSVDate(input: any): string | undefined {
  if (!input) return undefined;

  // When CSV gives object like { $type, value }
  let raw = typeof input === "string" ? input : input.value;




  if (!raw) return undefined;

  raw = raw.toString().trim();

  // Fix weird "+012025" prefix
  raw = raw.replace(/^\+0*/, "").replace(/^\+/, "");

  let date = new Date(raw);

  // If still invalid → try DD/MM/YYYY or DD-MM-YYYY
  if (isNaN(date.getTime())) {
    const m = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
    if (m) {
      const [_, d, mn, y] = m;
      date = new Date(`${y}-${mn.padStart(2, "0")}-${d.padStart(2, "0")}`);
    }
  }

  return isNaN(date.getTime()) ? undefined : date.toISOString();
}


