import { LeadsView } from "@/features/leads/views/leads-view";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

async function LeadsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <LeadsView />
    </main>
  );
}

export default LeadsPage;
