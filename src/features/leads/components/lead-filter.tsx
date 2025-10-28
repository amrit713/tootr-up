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
import { useGetUsers } from "@/features/auth/api/get-all-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const LeadFilter = () => {
  const { status, search, dueDate, setFilter, assigneeId, resetFilters } =
    useLeadFilters();

  const { data } = useGetUsers();

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilter("status", undefined);
    } else {
      setFilter("status", value as LeadStatus);
    }
  };

  const onAssigneIdChange = (value: string) => {
    if (value === "all") {
      setFilter("assigneeId", undefined);
    } else {
      setFilter("assigneeId", value);
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

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneIdChange(value)}
      >
        <SelectTrigger className="w-full md:w-auto ">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Assignee" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All Assignee</SelectItem>
          <SelectSeparator />
          {data?.users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex items-center gap-2">
                <Avatar className="size-6 hover:opacity-75 transition border border-netural-400  ">
                  <AvatarFallback className="bg-primary/10 font-medium text-primary dark:text-white flex items-center justify-center ">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="capitalize text-sm font-medium">{user.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due date"
        className=" w-full h-9 md:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilter("dueDate", date ? date.toISOString() : undefined);
        }}
      />

      {(search || dueDate || status || assigneeId) && (
        <Button variant={"outline"} onClick={resetFilters}>
          clear
        </Button>
      )}
    </div>
  );
};
