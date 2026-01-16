"use client";

import * as React from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/global/loading-state";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  total: number;
}

export function StudentsTable<TData, TValue>({
  columns,
  data,
  isLoading,
  total,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8, // 👈 8 rows per page
  });

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div>
      {/* server side filtering */}
      <div className="">
        {isLoading ? (
          <LoadingState
            title="Loading students"
            description="Just a moment, preparing your students list."
          />
        ) : (
          <Table className="overflow-x-scroll  ">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={
                    "!border-x-1 !border-y-1  shadow-none bg-background p-1 rounded-lg flex items-center justify-between mb-2"
                  }
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="inline flex-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="space-y-2 ">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        "cursor-pointer !border-x-1 !border-y-1  shadow-none bg-background p-1 rounded-lg hover:bg-primary/5 flex",
                        (row.original as any).isActive
                          ? ""
                          : "opacity-80 bg-rose-600/10 text-rose-700 dark:text-rose-300"
                      )}
                      onClick={() => {
                        router.push(
                          `/students/${(row.original as any).id}` as any
                        );
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="inline flex-1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-19 text-center text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <span className="text-sm font-space font-bold text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1}/
          {table.getPageCount()}{" "}
          <span className="text-gray-800 dark:text-gray-200">( {total})</span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
