import { currentUser } from "@/lib/current-user";
import { StudentView } from "@/views/students-view";
import { redirect } from "next/navigation";
import React from "react";

async function StudentsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <StudentView />;
}

export default StudentsPage;
