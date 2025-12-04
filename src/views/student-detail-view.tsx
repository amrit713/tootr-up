"use client";

import { LoadingState } from "@/components/global/loading-state";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useStudentId } from "@/features/leads/hooks/use-student-id";
import { useGetStudent } from "@/features/students/api/use-get-student";
import StudentDetail from "@/features/students/components/student-detail";
import { StudentDetailTab } from "@/features/students/components/student-details-tab";

export const StudentDetailView = () => {
  const studentId = useStudentId();
  const { data: student, isLoading } = useGetStudent({ studentId });
  return (
    <Card className="shadow-none ">
      <CardContent className="flex flex-col gap-10">
        {isLoading ? (
          <LoadingState
            title="Loading student information"
            description="Please wait while we fetch the student details."
          />
        ) : (
          student && (
            <>
              <div className=" flex flex-col gap-6">
                <StudentDetail
                  name={student.name}
                  image={student.image}
                  id={student.id}
                />
                <Separator className="" />
              </div>
              <StudentDetailTab student={student} />
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};
