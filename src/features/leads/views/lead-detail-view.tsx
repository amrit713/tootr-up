import { FollowupHistory } from "../../followUps/components/followup-history";
import { LeadDetail } from "../components/lead-detail";

export const LeadDetailView = () => {
  return (
    <main className="flex flex-col gap-2 md:grid grid-cols-7  ">
      <div className=" col-span-3  ">
        <LeadDetail />
      </div>
      <div className=" col-span-4">
        <FollowupHistory />
      </div>
    </main>
  );
};
