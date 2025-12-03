"use client";

import { ChevronDownIcon } from "lucide-react";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useGetBranches } from "@/features/branches/api/use-get-branches";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAttendanceFilters } from "@/hooks/use-attendance";
import { Calendar } from "@/components/ui/calendar";
import { useGetBranchPrograms } from "@/features/branches/api/use-get-branch-program";
import { useGetTimes } from "@/features/times/api/use-get-times";
import { format } from "date-fns";
import { ButtonLoader } from "@/components/global/button-loader";

interface StudentAttendanceFilterProps {
  onLoadStudent: () => void;
  isLoading: boolean;
}

export const StudentAttendanceFilter = ({
  onLoadStudent,
  isLoading,
}: StudentAttendanceFilterProps) => {
  const {
    program,
    date,
    timeSlot,
    branch,

    setFilter,
  } = useAttendanceFilters();

  const { data: branches } = useGetBranches();
  const { data: programs } = useGetBranchPrograms({ branchId: branch });
  const { data: times } = useGetTimes({ branchProgramId: program });

  const onBranchChange = (value: string) => {
    setFilter("branch", value);
  };

  const onProgramChange = (value: string) => {
    setFilter("program", value);
  };

  return (
    <div className="flex gap-2 flex-col md:flex-row md:justify-between">
      <div className="flex gap-2 flex-col md:flex-row">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground w-full md:w-auto justify-between text-left font-normal shadow-none  "
            >
              {date ? format(new Date(date), "yyy MMM dd") : "Select a date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              onSelect={(date) => setFilter("date", date?.toISOString())}
            />
          </PopoverContent>
        </Popover>
        <Select
          defaultValue={branch ?? undefined}
          onValueChange={(value) => onBranchChange(value)}
          disabled={!date}
        >
          <SelectTrigger className="w-full md:w-auto capitalize ">
            <SelectValue placeholder="Branches" />
          </SelectTrigger>
          <SelectContent>
            {branches?.map((branch) => (
              <SelectItem
                key={branch.id}
                value={branch.id}
                className="capitalize"
              >
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={program ?? undefined}
          onValueChange={(value) => onProgramChange(value)}
          disabled={!branch}
        >
          <SelectTrigger className="w-full md:w-auto capitalize ">
            <SelectValue placeholder="Programs" />
          </SelectTrigger>
          <SelectContent>
            {programs?.length === 0 && (
              <p className=" text-xs text-muted-foreground text-center">
                No program yet!
              </p>
            )}
            {programs?.map((program) => (
              <SelectItem
                key={program.id}
                value={program.id}
                className="capitalize"
              >
                {program.program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={program ?? undefined}
          onValueChange={(value) => setFilter("timeSlot", value)}
          disabled={!program}
        >
          <SelectTrigger className="w-full md:w-auto capitalize ">
            <SelectValue placeholder="Slot time" />
          </SelectTrigger>
          <SelectContent>
            {times?.length === 0 && (
              <p className=" text-xs text-muted-foreground text-center">
                No time slot yet!
              </p>
            )}
            {times?.map((time) => (
              <SelectItem key={time.id} value={time.id} className="capitalize">
                {time.startTime}-{time.endTime}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant={"ghost"}
        className="bg-emerald-100 dark:bg-emerald-800/40 "
        disabled={!timeSlot || isLoading}
        onClick={onLoadStudent}
      >
        <ButtonLoader
          isLoading={isLoading}
          loadingText="Loading"
          label="Load Student"
        />
      </Button>
    </div>
  );
};
