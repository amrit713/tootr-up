import { UserView } from "@/features/auth/components/user-view";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import React from "react";

async function SettingPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div>
      {user.role === "admin" && <UserView />}

      <div className="">Other part</div>
    </div>
  );
}

export default SettingPage;
