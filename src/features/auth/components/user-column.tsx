"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserWithRole } from "better-auth/plugins";
import { UserStatus } from "@/generated/prisma/browser";
import { format } from "date-fns";
import { useUpdateUserStatus } from "../api/use-update-status";
import { UserType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserRole } from "../api/use-update-role";

export const columns: ColumnDef<UserWithRole>[] = [
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
      const { role, id } = row.original;
      const { mutate } = useUpdateUserRole();
      const changeRole = (role: string) => {
        mutate({ query: { userId: id, role } });
      };
      return (
        <Select
          onValueChange={(value) => changeRole(value)}
          defaultValue={role}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Branch " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"admin"}>Admin</SelectItem>
            <SelectItem value={"user"}>User</SelectItem>
            <SelectItem value={"trainer"}>Trainer</SelectItem>
          </SelectContent>
        </Select>
      );
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
      const { status } = row.original as UserType;
      return (
        <Badge
          className={cn(
            "bg-amber-500/10 border-amber-500/50 text-amber-500",
            UserStatus.ACTIVE === status &&
              "bg-emerald-500/10 border-emerald-500/50 text-emerald-500",
            UserStatus.DISABLE === status &&
              "bg-rose-500/10 border-rose-500/50 text-rose-500"
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
      const { status, id } = row.original as UserType;

      const { mutate } = useUpdateUserStatus();
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
