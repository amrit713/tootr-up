"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Banknote,
  BanknoteArrowUp,
  Calendar,
  CoinsIcon,
  TicketPercent,
} from "lucide-react";

import { PaymentType } from "@/types";

import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";
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
          <p className="text-amber-500 ">
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
    accessorKey: "Total Fee",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <Banknote className="size-4" /> Total Fee
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return <p className="">{currencyFormatter(payment.totalFee)}</p>;
    },
  },
  {
    accessorKey: "amount paid",
    header: () => {
      return (
        <div className="py-2 font-space font-bold flex gap-2 items-center">
          <CoinsIcon className="size-4" /> After Discount
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
        <Badge className="bg-emerald-600/10 border-emerald-500/50 dark:border-emerald-700 text-emerald-700 font-space font-bold dark:text-emerald-300 dark:border">
          {(payment.discountPrice * 100) / payment.totalFee}%
        </Badge>
      );
    },
  },
];
