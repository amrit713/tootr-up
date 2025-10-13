"use client";
import { useGetLead } from "@/features/leads/api/use-get-lead";
import { CreateStudentForm } from "@/features/students/components/create-student-form";
import { useSearchParams } from "next/navigation";

export const StudentCreteView = () => {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");

  let lead;
  if (leadId) {
    const { data } = useGetLead(leadId);
    lead = data;
  }

  return (
    <main className="">
      <CreateStudentForm lead={lead} />
    </main>
  );
};
