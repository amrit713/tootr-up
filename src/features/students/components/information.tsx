"use client";

import { cn } from "@/lib/utils";

interface InformationProps {
  label: string;
  title: string;
}

export const Information = ({ label, title }: InformationProps) => {
  return (
    <div className="flex flex-col font-space">
      <p className=" uppercase text-muted-foreground text-xs">{label}</p>
      <p className={cn(label !== "email" && "capitalize")}>{title}</p>
    </div>
  );
};
