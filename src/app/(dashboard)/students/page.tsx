import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import React from "react";

async function StudentsPage() {
  const user = await currentUser();
  if (user) {
    redirect("/sign-in");
  }
  return <div>StudentsPage</div>;
}

export default StudentsPage;
