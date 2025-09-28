import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 bg-background rounded-lg p-10 ">
        <AlertCircleIcon className="size-6  text-rose-500" />
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
