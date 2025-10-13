"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DataTable } from "@/features/leads/components/leads-table";
import { columns } from "@/components/global/column";
import { useGetLeads } from "../features/leads/api/use-get-leads";
import { LeadFilter } from "../features/leads/components/lead-filter";

import { useLeadFilters } from "@/hooks/use-filter";
import { ErrorState } from "@/components/global/error-state";

export const LeadsView = () => {
  const { onOpen } = useModal();
  const { search, status, dueDate } = useLeadFilters();

  const {
    data: leads,
    isLoading,
    isError,
  } = useGetLeads({ search, status, dueDate });

  if (isError) {
    return (
      <ErrorState title="Leads not found" description="unable to find leads" />
    );
  }
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
      <DataTable
        columns={columns}
        data={leads || []}
        isLoading={isLoading}
        total={leads ? leads.length : 0}
      />
    </div>
  );
};
