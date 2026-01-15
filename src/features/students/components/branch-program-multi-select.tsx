"use client";

import { UseFormReturn } from "react-hook-form";
import { useGetBranchPrograms } from "@/features/branches/api/use-get-branch-program";
import { LoadingState } from "@/components/global/loading-state";
import { Checkbox } from "@/components/ui/checkbox";
import { TimeTableSelect } from "./time-table-select";
import { Badge } from "@/components/ui/badge"; // Optional: if you have a badge UI

interface Props {
  branchId: string;
  form: UseFormReturn<any>;
  isPending?: boolean;
}

export const BranchProgramMultiSelect = ({
  branchId,
  form,
  isPending,
}: Props) => {
  const { data: branchPrograms, isLoading: programLoading } =
    useGetBranchPrograms({ branchId });

  const selectedPrograms: any[] = form.watch("enrolledPrograms") || [];

  return (
    <div className="flex flex-col gap-2">
      {programLoading && (
        <LoadingState
          title="Loading Programs"
          description="Fetching available courses..."
          className="bg-background"
        />
      )}

      {branchPrograms?.length === 0 && !programLoading && (
        <p className="text-center text-muted-foreground py-4">
          No programs found in this branch.
        </p>
      )}

      {branchPrograms?.map((branchProgram) => {
        // Find if the student is currently associated with this program in the form
        const enrolledProgram = selectedPrograms.find(
          (p) => p.branchProgramId === branchProgram.id
        );

        const isChecked = !!enrolledProgram;

        // LOCK LOGIC: If 'id' exists, it came from the DB and cannot be removed
        const isAlreadyEnrolled = !!enrolledProgram?.id;

        return (
          <div
            key={branchProgram.id}
            className="flex items-start gap-3 rounded-lg border p-4 transition-colors has-[[aria-checked=true]]:border-primary has-aria-checked:bg-primary/5"
          >
            <Checkbox
              id={`prog-${branchProgram.id}`}
              checked={isChecked}
              // Prevent unchecking if already in database OR if global pending
              disabled={isPending || isAlreadyEnrolled}
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
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center w-full">
                <label
                  htmlFor={`prog-${branchProgram.id}`}
                  className="text-sm font-medium leading-none capitalize cursor-pointer"
                >
                  {branchProgram.program.name}
                </label>
                {isAlreadyEnrolled && (
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    Enrolled
                  </Badge>
                )}
              </div>

              {isChecked && (
                <div className="mt-1">
                  <TimeTableSelect
                    branchProgramId={branchProgram.id}
                    form={form}
                    // If already enrolled, you might also want to lock the timetable selection
                    isPending={isPending || isAlreadyEnrolled}
                    selectedPrograms={selectedPrograms}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
