"use client";

import React, { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DataTable } from "@/features/leads/components/leads-table";
import { columns } from "@/components/global/column";
import { useGetLeads } from "../features/leads/api/use-get-leads";
import { LeadFilter } from "../features/leads/components/lead-filter";

import { useLeadFilters } from "@/hooks/use-filter";
import { ErrorState } from "@/components/global/error-state";

import { UploadButton } from "@/features/leads/components/upload-button";
import { ImportCard } from "@/features/leads/components/import-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSelectProgram } from "@/hooks/use-select-program";
import { toast } from "sonner";
import { useCreateBulkLeads } from "@/features/leads/api/use-create-bulk-lead";
import { LeadStatus } from "@/generated/prisma";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITITAL_IMPORT_RESULTS = {
  data: [],
  error: [],
  meta: {},
};

export const LeadsView = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITITAL_IMPORT_RESULTS);
  const [ProgramDialog, confirm] = useSelectProgram();

  const { onOpen } = useModal();
  const { mutate: createLeads, isPending } = useCreateBulkLeads();
  const { search, status, dueDate, assigneeId } = useLeadFilters();
  const {
    data: leads,
    isLoading,
    isError,
  } = useGetLeads({ search, status, dueDate, assigneeId });

  const onUpload = (results: typeof INITITAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITITAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const onSubmitImport = async (values: Record<string, string>[]) => {
    const programId = await confirm();
    if (!programId) {
      return toast.error("Please select a program to continue");
    }

    const data = values.map((value) => ({
      number: value.number,
      programId,
      studentName: value.studentName ?? undefined,
      age: value.age ?? undefined,
      branch: value.branch ?? undefined,
      createdAt: value.createdAt ?? undefined,
      remark: value.remark ?? undefined,
      parentName: value.parentName ?? undefined,
      address: value.address ?? undefined,
      status: (value.status as LeadStatus) ?? undefined,
      grade: value.grade ?? undefined,
      dueDate: value.dueDate ?? undefined,
      email: value.email ?? undefined,
    }));

    createLeads(
      { json: data },
      {
        onSuccess: () => {
          onCancelImport();
        },
      }
    );
  };

  if (isError) {
    return (
      <ErrorState title="Leads not found" description="unable to find leads" />
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ProgramDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex justify-between">
        <p className="text-lg font-semibold">Leads Table</p>
        <div className="flex gap-2">
          <UploadButton onUpload={onUpload} />
          <Button onClick={() => onOpen("createLead")}>
            <PlusIcon className="size-4" /> Add Lead
          </Button>
        </div>
      </CardHeader>

      {/* <ImportLeads /> */}

      <CardContent className="flex flex-col gap-4">
        <div className="">
          <LeadFilter />
        </div>
        <DataTable
          columns={columns}
          data={leads || []}
          isLoading={isLoading}
          total={leads ? leads.length : 0}
        />
      </CardContent>
    </Card>
  );
};
