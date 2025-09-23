"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreVertical, TicketCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, snakeCaseToTitleCase } from "@/lib/utils";
import { UserWithRole } from "better-auth/plugins";
import { UserStatus } from "@/generated/prisma";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateUserStatus } from "../api/use-update-status";

export const columns: ColumnDef<UserWithRole & { status: UserStatus }>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, email } = row.original;
      return (
        <div className="flex items-center gap-1">
          <Avatar className="capitalize size-10">
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className=" flex flex-col gap-0.5">
            <p className="capitalize  text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { role } = row.original;
      return <p className="capitalize font-medium ">{role}</p>;
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
      const { status } = row.original;
      return (
        <Badge
          className={cn(
            "bg-amber-500",
            UserStatus.ACTIVE === status && "bg-emerald-500",
            UserStatus.DISABLE === status && "bg-rose-500"
          )}
        >
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Join Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <p>{format(createdAt, "mm/dd/yyyy")}</p>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { status, id } = row.original;

      const { mutate, isPending } = useUpdateUserStatus();
      const changeStatus = (status: UserStatus) => {
        mutate({ query: { userId: id, status } });
      };

      return (
        <div className="">
          {status === UserStatus.PENDING && (
            <div className="">
              <Button
                variant={"ghost"}
                className="rounded-full"
                size={"icon"}
                onClick={() => changeStatus(UserStatus.ACTIVE)}
              >
                <Check />
              </Button>
              <Button
                variant={"ghost"}
                className="rounded-full hover:bg-rose-100"
                size={"icon"}
                onClick={() => changeStatus(UserStatus.DISABLE)}
              >
                <X />
              </Button>
            </div>
          )}
        </div>
      );
    },
  },
];
