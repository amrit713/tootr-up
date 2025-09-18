import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  className?: string;
}

export const LoadingState = ({ title, description, className }: Props) => {
  return (
    <div className={"py-4 px-8 flex flex-1 items-center justify-center"}>
      <div
        className={`flex flex-col items-center justify-center gap-6 bg-background rounded-lg p-10  ${className}`}
      >
        <Loader2Icon className="size-6 animate-spin text-primary dark:text-purple-400" />
        <div className="flex flex-col gap-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm dark:text-neutral-400 text-neutral-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
