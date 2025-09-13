"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DataTable } from "@/features/leads/components/leads-table";
import { columns } from "@/components/global/column";
import { useGetLeads } from "../api/use-get-leads";

export const LeadView = () => {
  const { onOpen } = useModal();

  const { data: leads } = useGetLeads();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Leads Table</p>
        <Button onClick={() => onOpen("createLead")}>
          <PlusIcon className="size-4" /> Add Lead
        </Button>
      </div>
      <DataTable columns={columns} data={leads ?? []} />
    </div>
  );
};
