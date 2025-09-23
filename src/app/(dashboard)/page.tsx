import { DashboardView } from "@/features/leads/views/dashboard-view";
import { currentUser } from "@/lib/current-user";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="">
      <DashboardView />
    </div>
  );
}
