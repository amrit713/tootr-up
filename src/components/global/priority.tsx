"use client";

import { cn } from "@/lib/utils";
export enum LeadPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

import { ChevronsUpIcon } from "lucide-react";

const priorities = {
  [LeadPriority.CRITICAL]: {
    icon: ChevronsUpIcon,
    color: "text-rose-600",
    label: "CRITICAL",
    background: "bg-rose-600/10",
  },
  [LeadPriority.HIGH]: {
    icon: ChevronsUpIcon,
    color: "text-orange-600",
    label: "High",
    background: "bg-orange-600/10",
  },
  [LeadPriority.MEDIUM]: {
    icon: ChevronsUpIcon,
    color: "text-blue-600",
    background: "bg-blue-600/10",
    label: "Medium",
  },
  [LeadPriority.LOW]: {
    icon: ChevronsUpIcon,
    color: "text-yellow-600",
    label: "Low",
    background: "bg-yellow-600/10",
  },
};

interface PriorityProps {
  priority: LeadPriority;
  className?: string;
  isHideLabel?: boolean;
}

export const Priority = ({
  priority,
  className,
  isHideLabel,
}: PriorityProps) => {
  const { color, icon: Icon, label, background } = priorities[priority];

  return (
    <div
      className={cn("flex  items-center gap-1.5 py-0.5 px-3 rounded", color)}
    >
      <div className="flex flex-col">
        <Icon className={cn("size-4", color)} />
      </div>
      {!isHideLabel && <span className={cn(className)}>{label}</span>}
    </div>
  );
};
