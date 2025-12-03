"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  GraduationCap,
  MapIcon,
  MapPin,
  School,
  User,
} from "lucide-react";

import { StudentType } from "@/types";

import { format } from "date-fns";
import { cn, currencyFormatter, snakeCaseToTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<StudentType>[] = [
  {
    accessorKey: "studentInfo",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <GraduationCap className="size-4" /> Student Info
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col ">
            <p className="capitalize text-sm font-medium">{student.name}</p>
            <div className="flex gap-2  text-xs text-muted-foreground">
              <p className="">{student.age}</p>
              <p className="">{student.gender}</p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "ParentInfo",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <User className="size-4" /> Parent Info
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col ">
            <p className="capitalize text-sm font-medium">
              {student.parentName}
            </p>
            <div className="flex flex-col   text-xs text-muted-foreground">
              <p className="">{student.number}</p>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "schoolInfo",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <School className="size-4" /> School
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col ">
            <p className="capitalize text-sm font-medium">
              {student.schoolName}
            </p>
            <div className="flex flex-col   text-xs text-muted-foreground">
              <p className="">Grade: {student.grade}</p>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <MapPin className="size-4" /> Address
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <p className="capitalize text-sm font-medium">{student.address}</p>
      );
    },
  },
  {
    accessorKey: "branch Info",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <Calendar className="size-4" /> Joined
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex flex-col">
          <p className="capitalize text-sm font-medium ">
            {student.Branch.name}
          </p>
          <p className=" text-xs text-muted-foreground">
            {format(new Date(student.createdAt), "yyy MMM dd")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Payment Status",
    header: () => {
      return (
        <div className="py-2  font-semibold flex gap-2 items-center">
          <Calendar className="size-4" /> Payment Status
        </div>
      );
    },
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex flex-col gap-1 ">
          <Badge
            className={cn(
              "text-xs",
              student.Payment[0].dueAmount !== 0
                ? "bg-orange-500/10 text-orange-500 border-orange-500/50"
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/50"
            )}
          >
            {snakeCaseToTitleCase(student.Payment[0].paymentStatus)}
          </Badge>
          {student.Payment[0].dueAmount !== 0 && (
            <p className={cn(" text-xs   font-semibold")}>
              Due: {currencyFormatter(student.Payment[0].dueAmount)}
            </p>
          )}
        </div>
      );
    },
  },
];
