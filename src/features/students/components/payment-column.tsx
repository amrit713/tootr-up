"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Banknote,
  BanknoteArrowUp,
  Calendar,
  Coins,
  GraduationCap,
  MapIcon,
  MapPin,
  School,
  TicketPercent,
  User,
} from "lucide-react";

import { PaymentType, StudentType } from "@/types";

import { format } from "date-fns";
import { cn, currencyFormatter, snakeCaseToTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const paymentColumns: ColumnDef<PaymentType>[] = [
  {
    accessorKey: "payDate",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <Calendar className="size-4" /> Paid Date
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex items-center gap-2">
          <p className="">
            {format(
              new Date(
                payment.lastPaidDate ? payment.lastPaidDate : payment.createdAt
              ),
              "yyy MMM dd"
            )}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Total Amount",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <Banknote className="size-4" /> Total Amount
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return <p className="">{currencyFormatter(payment.totalFee)}</p>;
    },
  },

  {
    accessorKey: "paidAmout",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <BanknoteArrowUp className="size-4" /> Paid Amount
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <p className="">{currencyFormatter(payment.totalFeeAfterDiscount)}</p>
      );
    },
  },

  {
    accessorKey: "Discount",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <TicketPercent className="size-4" /> Discount
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Badge className="bg-emerald-500">
          {(payment.discountPrice * 100) / payment.totalFee}%
        </Badge>
      );
    },
  },
];
