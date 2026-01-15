"use client";

import { LoadingState } from "@/components/global/loading-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetStudentEnrollments } from "@/features/student-enrollments/api/use-get-student-enrollments";
import { useGetStudents } from "@/features/students/api/use-get-students";
import { Attedance } from "@/features/attendances/components/attendance";
import { columns } from "@/features/students/components/column";
import { StudentAttendanceFilter } from "@/features/students/components/student-attendance-filter";
import { StudentFilter } from "@/features/students/components/student-filter";
import { StudentsTable } from "@/features/students/components/students-table";
import { useAttendanceFilters } from "@/hooks/use-attendance";
import { useStudentFilters } from "@/hooks/use-student-filter";

import { useRouter } from "next/navigation";
import { AttendanceStatus } from "@/generated/prisma/browser";
import { DashboardStudents } from "@/features/students/components/dashboard-students";

export const StudentView = () => {
  const router = useRouter();
  const attendance = useAttendanceFilters();
  const { search, branch, program, joinDate, paymentStatus } =
    useStudentFilters();

  const { data: students, isLoading } = useGetStudents({
    search,
    branch,
    program,
    joinDate,
    paymentStatus,
  });

  const {
    data: enrolledStudents,
    refetch,
    isFetching,
  } = useGetStudentEnrollments({
    program: attendance.program ?? "",
    slotTime: attendance.timeSlot ?? "",
    date: attendance.date ?? "",
    attendanceStatus:
      (attendance.attendanceStatus as AttendanceStatus) ?? undefined,
    name: attendance.name ?? undefined,
  });

  const onLoadStudent = () => {
    refetch();
  };

  return (
    <div className="">
      <Tabs defaultValue="table">
        <div className="w-full flex flex-col-reverse gap-4 md:flex-row md:justify-between items-center ">
          <TabsList className="gap-4 w-full md:w-auto">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="attendance">Attedance</TabsTrigger>
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
        <TabsContent value={"attendance"} className="flex flex-col gap-4">
          <Card className="shadow-none">
            <CardHeader className="text-center">
              <CardTitle>Attedance Filter</CardTitle>
              <CardDescription>
                Select branch, program, time, and date to view students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceFilter
                onLoadStudent={onLoadStudent}
                isLoading={isFetching}
              />
            </CardContent>
          </Card>
          {isFetching ? (
            <LoadingState
              title="Loading Students"
              description="Fetching the latest enrollment details. Please wait..."
            />
          ) : (
            enrolledStudents && (
              <Attedance
                enrolledStudents={enrolledStudents}
                onLoadStudent={onLoadStudent}
              />
            )
          )}
        </TabsContent>
        <TabsContent value={"record"} className="flex flex-col gap-4">
          <DashboardStudents />
        </TabsContent>
      </Tabs>
    </div>
  );
};
