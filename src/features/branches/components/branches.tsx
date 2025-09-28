"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useGetBranches } from "../api/use-get-branches";
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BranchCard } from "./branch-card";

export const Branches = () => {
  const { data: branches, isLoading, error } = useGetBranches();

  const { onOpen } = useModal();

  return (
    <Card className="rounded shadow-none w-full max-h-[60vh]  ">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <GitBranch /> <span className="">Branches </span>
        </CardTitle>
        <CardDescription>
          All office branches of your organization across different locations.
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
          {branches?.map((branch) => (
            <BranchCard key={branch.id} id={branch.id} name={branch.name} />
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter>
        <Button
          variant={"outline"}
          className="w-full shadow-none"
          onClick={() => onOpen("createBranch")}
        >
          Add Branch
        </Button>{" "}
      </CardFooter>
    </Card>
  );
};
