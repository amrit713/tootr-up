"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value?: string | number;
  description?: string;
  icon: LucideIcon;
  percentage?: number;
  background?: string;

  color?: string;
}

export const SalesAnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  background,
  percentage,
  color,
}: Props) => {
  return (
    <Card className={cn("transition shadow-none ", background)}>
      <CardContent className="flex flex-col gap-1">
        <div className={cn("flex justify-between items-center ")}>
          <p className="text-lg text-muted-foreground font-space ">{title}</p>
          <div
            className={cn(
              "size-10 rounded-full bg-muted flex items-center justify-center border border-zinc-400 dark:border-zinc-600"
            )}
          >
            <Icon className={cn("size-6 text-zinc-800 dark:text-zinc-200 ")} />
          </div>
        </div>

        <div className="">
          <p className=" text-3xl font-semibold font-space">{value}</p>
          <div className=" flex gap-2 items-center">
            <span className={cn("text-base", color)}>
              {percentage && <>{percentage.toFixed(2)}%</>}
            </span>
            <p className="dark:text-neutral-500  text-neutral-400 text-xs ">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
