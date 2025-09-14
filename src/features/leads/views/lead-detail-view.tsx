"use client";

import { FollowupHistory } from "../../followUps/components/followup-history";
import { useGetLead } from "../api/use-get-lead";
import { LeadDetail } from "../components/lead-detail";
import { useLeadId } from "../hooks/use-lead-id";

export const LeadDetailView = () => {
  const leadId = useLeadId();

  const { data: lead } = useGetLead(leadId);

  return (
    <main className="flex flex-col gap-2 md:grid grid-cols-7  ">
      <div className=" col-span-3  ">
        <LeadDetail lead={lead} leadId={leadId} />
      </div>
      <div className=" col-span-4">
        <FollowupHistory status={lead?.status} />
      </div>
    </main>
  );
};
