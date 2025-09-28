"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useGetPrograms } from "../api/use-get-programs";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgramCard } from "./program-card";

export const ProgramList = () => {
  const { data: programs, isLoading, error } = useGetPrograms();

  const { onOpen } = useModal();

  return (
    <Card className="rounded shadow-none w-full max-h-[60vh]  ">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <List /> <span className="">Programs </span>
        </CardTitle>
        <CardDescription>
          All programs offered, along with their requirements, and other
          available details.
        </CardDescription>
      </CardHeader>

      <ScrollArea className="max-h-[38vh] ">
        <CardContent className="flex flex-col gap-2">
          {isLoading && (
            <>
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-900 h-10 rounded-md" />
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-900 h-10 rounded-md" />
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 h-10 rounded-md" />
            </>
          )}
          {programs?.map((program) => (
            <ProgramCard key={program.id} id={program.id} name={program.name} />
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter>
        <Button
          variant={"outline"}
          className="w-full shadow-none"
          onClick={() => onOpen("createProgram")}
        >
          Add Program
        </Button>{" "}
      </CardFooter>
    </Card>
  );
};
