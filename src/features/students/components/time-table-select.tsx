"use client";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTimes } from "@/features/times/api/use-get-times";
import { studentSchema } from "@/schema";

type StudentFormType = z.infer<typeof studentSchema>;

interface Props {
  branchProgramId: string;
  form: UseFormReturn<StudentFormType>;
  selectedPrograms: { timeTableId: string; branchProgramId: string }[];
  isPending?: boolean;
}

export const TimeTableSelect = ({
  branchProgramId,
  form,
  isPending,
  selectedPrograms,
}: Props) => {
  const { data } = useGetTimes({ branchProgramId });

  const otherSelectedPrograms = selectedPrograms.filter(
    (p) => p.branchProgramId !== branchProgramId
  );

  return (
    <div className=" w-full ">
      {!data || data.length === 0 ? (
        <p className="text-sm text-muted-foreground ">
          There is no time slot for this program
        </p>
      ) : (
        <Select
          onValueChange={(value) =>
            form.setValue("enrolledPrograms", [
              ...otherSelectedPrograms,
              { branchProgramId, timeTableId: value },
            ])
          }
          disabled={isPending}
        >
          <SelectTrigger className="w-full bg-background shadow-none">
            <SelectValue placeholder="Select a Branch " />
          </SelectTrigger>
          <SelectContent className="w-full">
            {data?.map((time) => (
              <SelectItem key={time.id} value={time.id} className="capitalize">
                {time.startTime}-{time.endTime}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
