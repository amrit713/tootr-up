"use client";

import { ListChecksIcon, Search, XIcon } from "lucide-react";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
  SelectSeparator,
} from "@/components/ui/select";
import { LeadStatus, PaymentStatus } from "@/generated/prisma";
import { useLeadFilters } from "@/hooks/use-filter";

import { DatePicker } from "@/components/global/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetBranches } from "@/features/branches/api/use-get-branches";
import { useGetPrograms } from "@/features/programs/api/use-get-programs";
import { useStudentFilters } from "@/hooks/use-student-filter";
import { snakeCaseToTitleCase } from "@/lib/utils";

export const StudentFilter = () => {
  const {
    program,
    joinDate,
    branch,
    search,
    paymentStatus,
    setFilter,
    resetFilters,
  } = useStudentFilters();

  const { data: branches } = useGetBranches();
  const { data: programs } = useGetPrograms();

  const onBranchChange = (value: string) => {
    if (value === "all") {
      setFilter("branch", undefined);
    } else {
      setFilter("branch", value);
    }
  };

  const onProgramChange = (value: string) => {
    if (value === "all") {
      setFilter("program", undefined);
    } else {
      setFilter("program", value);
    }
  };
  const onPaymentStatusChange = (value: string) => {
    if (value === "all") {
      setFilter("paymentStatus", undefined);
    } else {
      setFilter("paymentStatus", value as PaymentStatus);
    }
  };

  return (
    <div className="flex gap-2 flex-col-reverse lg:flex-row">
      <div className="flex-1">
        <div className="relative min-w-xs ">
          <Input
            value={search ? search : ""}
            placeholder="Student Name..."
            onChange={(e) => setFilter("search", e.target.value)}
          />
          {search ? (
            <Button
              className="absolute top-[50%] right-0  -translate-y-[50%] "
              variant={"link"}
              size={"icon"}
              onClick={() => setFilter("search", undefined)}
            >
              <XIcon className="size-4 text-gray-500 dark:text-gray-400" />
            </Button>
          ) : (
            <Search className="size-4 absolute top-[50%] right-2.5 -translate-y-[50%] text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-col md:flex-row">
        <Select
          defaultValue={branch ?? undefined}
          onValueChange={(value) => onBranchChange(value)}
        >
          <SelectTrigger className="w-full md:w-auto ">
            <div className="flex items-center pr-2">
              <ListChecksIcon className="size-4 mr-2" />
              <SelectValue placeholder="All Branches" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All Branches</SelectItem>
            <SelectSeparator />
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
          defaultValue={paymentStatus ?? undefined}
          onValueChange={(value) => onPaymentStatusChange(value)}
        >
          <SelectTrigger className="w-full md:w-auto ">
            <div className="flex items-center pr-2">
              <ListChecksIcon className="size-4 mr-2" />
              <SelectValue placeholder="Payment Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>Payment Status</SelectItem>
            <SelectSeparator />
            {Object.values(PaymentStatus).map((status, idx) => (
              <SelectItem key={idx} value={status}>
                {snakeCaseToTitleCase(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={program ?? undefined}
          onValueChange={(value) => onProgramChange(value)}
        >
          <SelectTrigger className="w-full md:w-auto ">
            <div className="flex items-center pr-2">
              <ListChecksIcon className="size-4 mr-2" />
              <SelectValue placeholder="All Programs" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All Programs</SelectItem>
            <SelectSeparator />
            {programs?.map((program) => (
              <SelectItem
                key={program.id}
                value={program.id}
                className="capitalize"
              >
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DatePicker
          placeholder="Joined date"
          className=" w-full h-9 md:w-auto"
          value={joinDate ? new Date(joinDate) : undefined}
          onChange={(date) => {
            setFilter("joinDate", date ? date.toISOString() : undefined);
          }}
        />

        {(search || joinDate || branch || program || paymentStatus) && (
          <Button variant={"outline"} onClick={resetFilters}>
            clear
          </Button>
        )}
      </div>
    </div>
  );
};
