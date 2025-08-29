import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";

interface ButtonLoaderProps {
  isLoading?: boolean;
  loadingText?: string;
  label: string;
  icon?: LucideIcon;
}

export const ButtonLoader = ({
  isLoading,
  loadingText,
  label,
  icon: Icon,
}: ButtonLoaderProps) => {
  return (
    <>
      {isLoading && loadingText ? (
        loadingText
      ) : (
        <>
          {label}
          {Icon && <Icon className={"size-4 ml-1/5 inline"} />}
        </>
      )}

      {isLoading ? (
        <span className="ml-1.5 flex items-center gap-1">
          <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block" />
          <span className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block" />
          <span className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block" />
        </span>
      ) : null}
    </>
  );
};
