"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { ImportTable } from "./import-table";

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

interface SelectedColumnsState {
  [key: string]: string | null;
}

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onContinueSelect = () => {
    const filteredBody = body.filter((row) =>
      row.some((cell) => cell && cell.trim() !== "")
    );

    const arrayOfData = filteredBody.map((row) =>
      row.reduce((acc: Record<string, string>, cell, index) => {
        const header = headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {})
    );

    onSubmit(arrayOfData);
  };

  const onTableHeadSelectedChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  return (
    <div className="">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="">
            <p className="text-lg font-semibold">Import {body.length} Leads</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Button
              variant={"outline"}
              className="w-full md:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button onClick={onContinueSelect}>Continue</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectedChange={onTableHeadSelectedChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
