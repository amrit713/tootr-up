import { LeadView } from "@/features/leads/views/lead-view";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

async function LeadsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main>
      <LeadView />
    </main>
  );
}

export default LeadsPage;
