"use client";

import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";

import { useStudentId } from "@/features/leads/hooks/use-student-id";
import { useGetStudent } from "@/features/students/api/use-get-student";
import { UpdateStudentForm } from "@/features/students/components/update-student-form";

export const UpdateStudentView = () => {
  const studentId = useStudentId();

  const { data, isLoading } = useGetStudent({ studentId });

  if (isLoading) {
    return (
      <LoadingState
        title="Loading student"
        description="Please wait while we fetch the student details"
      />
    );
  }

  if (!data) {
    return (
      <ErrorState
        title="Error occured"
        description="Error found while fetching student"
      />
    );
  }

  return (
    <main className="">
      <UpdateStudentForm student={data} />
    </main>
  );
};
