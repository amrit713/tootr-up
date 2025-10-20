"use client ";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StudentEnrollmentType } from "@/types";
import { Search, UserCheck, Users, UserStar, UserX } from "lucide-react";
import { AttedanceCard } from "./attendance-card";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AttedanceProps {
  enrolledStudents: StudentEnrollmentType[];
}
export const Attedance = ({ enrolledStudents }: AttedanceProps) => {
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, "PRESENT" | "ABSENT" | undefined>
  >({});

  useEffect(() => {
    if (!enrolledStudents.length) return;
    const initialMap: Record<string, "PRESENT" | "ABSENT" | undefined> = {};
    enrolledStudents.forEach((s) => {
      const latest = s.attendance?.[0];
      if (latest?.status === "PRESENT" || latest?.status === "ABSENT") {
        initialMap[s.id] = latest.status;
      }
    });
    setAttendanceMap(initialMap);
  }, [enrolledStudents]);

  // ✅ Callback from child to update attendance state in parent
  const handleStatusChange = (
    studentId: string,
    status: "PRESENT" | "ABSENT"
  ) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // ✅ Memoize counts to prevent unnecessary recalculations
  const { presentCount, absentCount } = useMemo(() => {
    const values = Object.values(attendanceMap);
    return {
      presentCount: values.filter((v) => v === "PRESENT").length,
      absentCount: values.filter((v) => v === "ABSENT").length,
    };
  }, [attendanceMap]);
  return (
    <Card className="shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="">Student Attendance</CardTitle>
        <CardDescription>
          Keep track of student attendance and participation across programs and
          time slots.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:justify-between  gap-2 md:gap-10">
          <div className="relative w-full md:min-w-xs md:max-w-3xl">
            <Input placeholder="Number..." />
            {/* {search ? (
              <Button
                className="absolute top-[50%] right-0  -translate-y-[50%] "
                variant={"link"}
                size={"icon"}
                
              >
                <XIcon className="size-4 text-gray-500 dark:text-gray-400" />
              </Button>
            ) : (
              
            )} */}

            <Search className="size-4 absolute top-[50%] right-2.5 -translate-y-[50%] text-gray-500 dark:text-gray-400" />
          </div>

          <div className="flex gap-1.5 md:gap-4 font-space font-bold">
            <div
              className={buttonVariants({
                variant: "secondary",
                className: "!h-7 !p-2 !bg-primary/10 dark:!bg-primary/40  ",
                size: "sm",
              })}
            >
              <Users />
              Total: {enrolledStudents.length ?? 0}
            </div>

            <div
              className={buttonVariants({
                variant: "secondary",
                className: "!bg-emerald-500 !text-white !h-7 !p-2 ",
                size: "sm",
              })}
            >
              <UserCheck />
              Present: {presentCount}
            </div>

            <div
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "!bg-rose-500 !text-white text-sm !h-7 !p-2",
              })}
            >
              <UserX />
              Absent: {absentCount}
            </div>
          </div>
        </div>

        <ScrollArea className="h-[39.9vh]">
          <div className="flex flex-col gap-2 ">
            {enrolledStudents.map((enrolledStudent) => {
              return (
                <AttedanceCard
                  key={enrolledStudent.id}
                  enrolledStudent={enrolledStudent}
                  onStatusChange={handleStatusChange}
                />
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
