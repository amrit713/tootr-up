"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetStudents } from "@/features/students/api/use-get-students";
import { columns } from "@/features/students/components/column";
import { StudentFilter } from "@/features/students/components/student-filter";
import { StudentsTable } from "@/features/students/components/students-table";
import { useStudentFilters } from "@/hooks/use-student-filter";

import { useRouter } from "next/navigation";

export const StudentView = () => {
  const router = useRouter();
  const { search, branch, program, joinDate, paymentStatus } =
    useStudentFilters();
  const { data: students, isLoading } = useGetStudents({
    search,
    branch,
    program,
    joinDate,
    paymentStatus,
  });

  return (
    <div className="">
      <Tabs defaultValue="table">
        <div className="w-full flex flex-col-reverse gap-4 md:flex-row md:justify-between items-center ">
          <TabsList className="gap-4 w-full md:w-auto">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="attedance">Attedance</TabsTrigger>
            <TabsTrigger value="record">Dashboard</TabsTrigger>
          </TabsList>
          <Button
            className="w-full md:w-auto"
            onClick={() => router.push("/students/create")}
          >
            Add Student
          </Button>
        </div>
        <TabsContent value={"table"} className="flex flex-col gap-2 mt-4">
          <StudentFilter />
          <StudentsTable
            columns={columns}
            data={students || []}
            isLoading={isLoading}
            total={students ? students.length : 0}
          />
        </TabsContent>
        <TabsContent value={"attendance"}></TabsContent>
      </Tabs>
    </div>
  );
};
