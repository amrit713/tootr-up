import { currentUser } from "@/lib/current-user";
import { SettingView } from "@/views/setting-view";
import { redirect } from "next/navigation";
import React from "react";

async function SettingPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <SettingView />;
}

export default SettingPage;
