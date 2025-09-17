"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadType } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { FollowUpDate } from "@/features/followUps/components/follow-up-date";

export const columns: ColumnDef<LeadType>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const number = row.original.number;
      return <p className="line-clamp-1">{number}</p>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className="" variant={status}>
          {snakeCaseToTitleCase(status)}
        </Badge>
      );
    },
  },

  {
    accessorKey: "lead creator",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Received by
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.user.name;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-6 hover:opacity-75 transition border border-netural-400  ">
            <AvatarFallback className="bg-primary/10 font-medium text-primary dark:text-white flex items-center justify-center ">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="capitalize text-sm font-medium">{name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "followUpDueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const due_date = row.original.due_date;
      return <>{due_date ? <FollowUpDate value={due_date} /> : "-"}</>;
    },
  },
];
