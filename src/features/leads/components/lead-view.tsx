"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const LeadView = () => {
  const { onOpen } = useModal();
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Leads Table</p>
        <Button onClick={() => onOpen("createLead")}>
          <PlusIcon className="size-4" /> Add Lead
        </Button>
      </div>
    </div>
  );
};
