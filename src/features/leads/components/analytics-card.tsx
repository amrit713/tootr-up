"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value?: number;
  description?: string;
  icon: LucideIcon;
  percentage?: number;
  background?: string;

  color?: string;
}

export const AnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  background,
  percentage,
  color,
}: Props) => {
  return (
    <Card className={cn("transition border-none ", background)}>
      <CardContent className="flex flex-col gap-2">
        <div className={cn("flex justify-between items-center ")}>
          <p className=" font-semibold  text-lg ">{title}</p>
          <Icon className={cn("size-8 ", color)} />
        </div>

        <div className="">
          <p className=" text-3xl font-semibold ">{value}</p>
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
