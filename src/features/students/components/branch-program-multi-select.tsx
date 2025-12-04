"use client";
import { studentSchema, updateStudentSchema } from "@/schema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useGetBranchPrograms } from "@/features/branches/api/use-get-branch-program";
import { LoadingState } from "@/components/global/loading-state";
import { Checkbox } from "@/components/ui/checkbox";
import { TimeTableSelect } from "./time-table-select";

type StudentFormType = z.infer<typeof studentSchema>;

interface Props {
  branchId: string;
  form: UseFormReturn<StudentFormType>;
  isPending?: boolean;
}

export const BranchProgramMultiSelect = ({
  branchId,
  form,
  isPending,
}: Props) => {
  const { data: branchPrograms, isLoading: programLoading } =
    useGetBranchPrograms({ branchId });

  const selectedPrograms = form.watch("enrolledPrograms") || [];

  return (
    <div className="flex flex-col gap-2">
      {programLoading && (
        <LoadingState
          title="Loading Programs"
          description="This will only take a few seconds."
          className=" bg-background"
        />
      )}

      {branchPrograms?.length === 0 && (
        <p className=" text-center text-muted-foreground">
          No program in this branch
        </p>
      )}

      {branchPrograms?.map((branchProgram) => {
        const enrolledProgram = selectedPrograms.find(
          (p) => p.branchProgramId === branchProgram.id
        );
        const isChecked = !!enrolledProgram;

        return (
          <div
            key={branchProgram.id}
            className="hover:bg-accent/10 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/5 dark:has-[[aria-checked=true]]:border-primary dark:has-[[aria-checked=true]]:bg-primary/10"
          >
            <Checkbox
              id="toggle-2"
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary/50"
              checked={isChecked}
              disabled={isPending}
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("enrolledPrograms", [
                    ...selectedPrograms,
                    { branchProgramId: branchProgram.id, timeTableId: "" },
                  ]);
                } else {
                  form.setValue(
                    "enrolledPrograms",
                    selectedPrograms.filter(
                      (p) => p.branchProgramId !== branchProgram.id
                    )
                  );
                }
              }}
            />
            <div className="flex flex-col gap-2 font-normal w-full">
              <p className="text-sm leading-none font-medium capitalize">
                {branchProgram.program.name}
              </p>

              {isChecked && (
                <TimeTableSelect
                  branchProgramId={enrolledProgram.branchProgramId}
                  form={form}
                  isPending={isPending}
                  selectedPrograms={selectedPrograms}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
