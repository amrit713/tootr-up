"use client";

import { JSX, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/global/responsive-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetPrograms } from "@/features/programs/api/use-get-programs";

export const useSelectProgram = (): [
  () => JSX.Element,
  () => Promise<string | undefined>
] => {
  const { data: programs, isLoading } = useGetPrograms();

  const [resolver, setResolver] = useState<
    ((value: string | undefined) => void) | null
  >(null);
  const selectValue = useRef<string>("");

  const confirm = useCallback(() => {
    return new Promise<string | undefined>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const close = () => setResolver(null);

  const handleConfirm = () => {
    resolver?.(selectValue.current || undefined);
    close();
  };

  const handleCancel = () => {
    resolver?.(undefined);
    close();
  };

  const ProgramDialog = () => (
    <ResponsiveModal open={resolver !== null} onOpenChange={close}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="py-4">
          <CardHeader className="p-0">
            <CardTitle>Select Program</CardTitle>
            <CardDescription>
              Please select a program for this Lead
            </CardDescription>
          </CardHeader>

          <div className="mt-4">
            <Select
              disabled={isLoading}
              defaultValue={selectValue.current}
              onValueChange={(v) => (selectValue.current = v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Program" />
              </SelectTrigger>

              <SelectContent>
                {programs?.map((program) => (
                  <SelectItem key={program.id} value={program.name}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 md:flex-none"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="flex-1 md:flex-none">
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ProgramDialog, confirm];
};
