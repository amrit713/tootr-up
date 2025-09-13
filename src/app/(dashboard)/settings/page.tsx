import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import React from "react";

async function SettingPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <div>SettingPage</div>;
}

export default SettingPage;
