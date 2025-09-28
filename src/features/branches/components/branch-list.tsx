"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock10Icon } from "lucide-react";
import { useGetBranches } from "../api/use-get-branches";
import { BranchProgram } from "./branch-program";

import { ErrorState } from "@/components/global/error-state";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { ProgramSelectForm } from "./program-select-form";

export const BranchList = () => {
  const { data: branches, isLoading, error } = useGetBranches();

  return (
    <Card className="rounded shadow-none max-h-[60vh] lg:col-span-2 ">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Clock10Icon /> <span className="">Branch & Program and Time </span>
        </CardTitle>
        <CardDescription>
          See your preferred branch, add a program, and add a convenient time
          slot between 9:00 AM and 6:00 PM.
        </CardDescription>
      </CardHeader>

      <ScrollArea className="max-h-[46vh]">
        <CardContent>
          <Accordion
            type="single"
            className=" my-4 w-full space-y-2"
            collapsible
          >
            {error && (
              <ErrorState
                title="Unable to load branches"
                description="Something went wrong! Please check your connection or try again later."
              />
            )}

            {isLoading && (
              <>
                <div className="animate-pulse bg-neutral-200 dark:bg-neutral-900 h-10 rounded-md" />
                <div className="animate-pulse bg-neutral-200 dark:bg-neutral-900 h-10 rounded-md" />
                <div className="animate-pulse bg-neutral-200 dark:bg-neutral-900 h-10 rounded-md" />
              </>
            )}
            {branches?.map((branch) => {
              return (
                <AccordionItem
                  value={branch.name}
                  key={branch.id}
                  className="border last:border-b rounded-md px-4  bg-neutral-50 dark:bg-black"
                >
                  <AccordionTrigger className="capitalize">
                    {branch.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4  ">
                      <BranchProgram id={branch.id} />

                      <ProgramSelectForm branchId={branch.id} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>

        <ScrollBar />
      </ScrollArea>
      <CardFooter></CardFooter>
    </Card>
  );
};
