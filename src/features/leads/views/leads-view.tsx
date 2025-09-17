"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DataTable } from "@/features/leads/components/leads-table";
import { columns } from "@/components/global/column";
import { useGetLeads } from "../api/use-get-leads";
import { LeadFilter } from "../components/lead-filter";
import { Gender } from "@/generated/prisma";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useLeadFilters } from "@/hooks/use-filter";

export const LeadsView = () => {
  const { onOpen } = useModal();
  const { search, status, dueDate } = useLeadFilters();

  const { data: leads } = useGetLeads({ search, status, dueDate });
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Leads Table</p>
        <Button onClick={() => onOpen("createLead")}>
          <PlusIcon className="size-4" /> Add Lead
        </Button>
      </div>
      <div className="">
        <LeadFilter />
      </div>
      <DataTable columns={columns} data={leads ?? []} />
    </div>
  );
};
