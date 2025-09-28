"use client";

import { Loader2, OctagonAlert, X } from "lucide-react";
import { useState } from "react";

import { useGetBranchPrograms } from "../api/use-get-branch-program";
import { useDeleteBranchProgram } from "../api/use-delete-branch-program";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Times } from "@/features/times/components/times";

export const BranchProgram = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetBranchPrograms({ branchId: id });
  const { mutate } = useDeleteBranchProgram();

  const [drop, setDrop] = useState(false);
  const [DeleteBranchProgramDialog, deleteBranchProgram] = useConfirm(
    `Delete a program`,
    `Are you sure you want to delete a program`
  );

  const handleDeleteBranchProgram = async (branchId: string, id: string) => {
    const ok = await deleteBranchProgram();
    setDrop(false);
    if (!ok) return;

    mutate({
      param: {
        branchId,
        id,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center h-18">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center h-18 flex-col">
        <OctagonAlert className="size-4 text-destructive" />
        <p className=" text-muted-foreground text-xs">Something went wrong!</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex w-full items-center justify-center h-18 text-muted-foreground">
        No program yet!
      </div>
    );
  }
  return (
    <>
      <DeleteBranchProgramDialog />

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="my-4 w-full space-y-2 "
      >
        {data?.map((branchProgram) => {
          return (
            <AccordionItem
              key={branchProgram.id}
              value={branchProgram.id}
              className="group border-none bg-white dark:text-white dark:bg-neutral-800 rounded-md p-2 "
            >
              <AccordionTrigger className="data-[state=closed]:py-0 py-1  [&>svg]:hidden w-full">
                <div className=" w-full flex items-center justify-between">
                  <p className="capitalize">{branchProgram.program.name}</p>
                  <Button
                    variant={"ghost"}
                    className="rounded-full size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      handleDeleteBranchProgram(
                        branchProgram.branchId,
                        branchProgram.id
                      )
                    }
                  >
                    <X className="text-rose-500 size-4" />
                  </Button>
                </div>
              </AccordionTrigger>

              <AccordionContent className="mt-4">
                <Times branchProgramId={branchProgram.id} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
