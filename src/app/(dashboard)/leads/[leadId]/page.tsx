import { LeadDetailView } from "@/features/leads/views/lead-detail-view";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import React from "react";

async function LeadsDetailPage() {
  const user = await currentUser();
  if (user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <LeadDetailView />
    </div>
  );
}

export default LeadsDetailPage;
