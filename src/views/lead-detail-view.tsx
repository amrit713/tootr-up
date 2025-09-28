"use client";

import { ErrorState } from "@/components/global/error-state";
import { FollowupHistory } from "../features/followUps/components/followup-history";
import { useGetLead } from "../features/leads/api/use-get-lead";
import { LeadDetail } from "../features/leads/components/lead-detail";
import { useLeadId } from "../features/leads/hooks/use-lead-id";
import { LoadingState } from "@/components/global/loading-state";
import { Card } from "@/components/ui/card";

export const LeadDetailView = () => {
  const leadId = useLeadId();

  const { data: lead, isError, isLoading } = useGetLead(leadId);

  if (isError) {
    return (
      <ErrorState
        title="Oops! Lead Not Available"
        description="Something went wrong while fetching this lead’s information. Please try again."
      />
    );
  }

  return (
    <main className="flex flex-col gap-2 md:grid grid-cols-7  ">
      <div className=" col-span-3  ">
        {isLoading ? (
          <Card>
            <LoadingState
              title="Getting Lead Info"
              description="Hang tight! We’re pulling up this lead’s details."
              className="bg-transparent"
            />
          </Card>
        ) : (
          <LeadDetail lead={lead} leadId={leadId} />
        )}
      </div>
      <div className=" col-span-4">
        <FollowupHistory status={lead?.status} />
      </div>
    </main>
  );
};
