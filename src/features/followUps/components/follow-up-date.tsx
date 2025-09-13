import { differenceInDays, format } from "date-fns";

import { cn } from "@/lib/utils";

interface TaskDateProps {
  value: string;
  className?: string;
}

export const FollowUpDate = ({ value, className }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  let textColor = "text-muted-foreground";

  if (diffInDays <= 1) {
    textColor = "text-red-500";
  } else if (diffInDays <= 2) {
    textColor = "text-orange-500";
  } else {
    textColor = "text-yellow-500";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate font-medium", className)}>
        {format(value, "PPP")}
      </span>
    </div>
  );
};
