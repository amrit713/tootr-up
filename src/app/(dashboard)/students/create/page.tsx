import { currentUser } from "@/lib/current-user";
import { StudentCreteView } from "@/views/student-create-view";
import { redirect } from "next/navigation";
import React from "react";

async function CreatePage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <StudentCreteView />;
}

export default CreatePage;
