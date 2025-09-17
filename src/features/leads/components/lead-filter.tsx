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
import { LeadStatus } from "@/generated/prisma";
import { useLeadFilters } from "@/hooks/use-filter";

import { snakeCaseToTitleCase } from "@/lib/utils";
import { DatePicker } from "@/components/global/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LeadFilter = () => {
  const { status, search, dueDate, setFilter, resetFilters } = useLeadFilters();
  console.log("🚀 ~ LeadFilter ~ dueDate:", dueDate);

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilter("status", undefined);
    } else {
      setFilter("status", value as LeadStatus);
    }
  };

  return (
    <div className="flex gap-2 flex-col md:flex-row ">
      <div className="relative">
        <Input
          value={search ? search : ""}
          placeholder="Number..."
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
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full md:w-auto ">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All statuses</SelectItem>
          <SelectSeparator />
          {Object.values(LeadStatus).map((status, idx) => (
            <SelectItem key={idx} value={status}>
              {snakeCaseToTitleCase(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due date"
        className=" w-full h-9 md:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) =>
          setFilter("dueDate", date ? date.toISOString() : undefined)
        }
      />

      {(search || dueDate || status) && (
        <Button variant={"outline"} onClick={resetFilters}>
          clear
        </Button>
      )}
    </div>
  );
};
