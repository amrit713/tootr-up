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
import {
  Search,
  SearchIcon,
  UserCheck,
  UserIcon,
  Users,
  UserX,
  XIcon,
} from "lucide-react";
import { AttedanceCard } from "./attendance-card";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttendanceStatus } from "@/generated/prisma/enums";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useAttendanceFilters } from "@/hooks/use-attendance";

interface AttedanceProps {
  enrolledStudents: StudentEnrollmentType[];
  onLoadStudent: () => void;
}
export const Attedance = ({
  enrolledStudents,
  onLoadStudent,
}: AttedanceProps) => {
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, "PRESENT" | "ABSENT" | undefined>
  >({});
  const { setFilter, attendanceStatus, name } = useAttendanceFilters();

  const onAttendanceChange = (value: string) => {
    if (value === "all") {
      setFilter("attendanceStatus", undefined);
    } else {
      setFilter("attendanceStatus", value as AttendanceStatus);
    }
  };

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

  const filterStudents = useMemo(() => {
    if (!attendanceStatus) return enrolledStudents;
    return enrolledStudents.filter((student) => {
      const status = attendanceMap[student.id];
      return status === attendanceStatus;
    });
  }, [attendanceStatus, attendanceMap, enrolledStudents]);
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
        <div className="flex flex-col md:flex-row md:justify-between  gap-2 md:gap-10  items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="relative w-full md:min-w-xs md:max-w-3xl">
                <Input
                  value={name ? name : ""}
                  placeholder="Student name..."
                  onChange={(e) => {
                    setFilter("name", e.target.value);
                  }}
                />

                {name && (
                  <Button
                    className="absolute top-[50%] right-0  -translate-y-[50%] "
                    variant={"link"}
                    size={"icon"}
                    onClick={() => {
                      setFilter("name", undefined);

                      setTimeout(() => {
                        onLoadStudent();
                      }, 100);
                    }}
                  >
                    <XIcon className="size-4 text-gray-500 dark:text-gray-400" />
                  </Button>
                )}
              </div>
              <Button
                variant={"outline"}
                size={"icon"}
                className="shadow-none"
                onClick={onLoadStudent}
              >
                <SearchIcon className="text-primary/90 dark:text-purple-300" />
              </Button>
            </div>

            <Select
              defaultValue={attendanceStatus ?? undefined}
              onValueChange={(value) => onAttendanceChange(value)}
            >
              <SelectTrigger className="w-full md:w-auto ">
                <div className="flex items-center pr-2">
                  <UserIcon className="size-4 mr-2" />
                  <SelectValue placeholder="Attendance " />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>Attendance</SelectItem>
                <SelectSeparator />
                {Object.values(AttendanceStatus).map((status, idx) => (
                  <SelectItem key={idx} value={status}>
                    {snakeCaseToTitleCase(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-1.5 md:gap-2 font-space font-bold">
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
                className: "!bg-emerald-500 !text-white !h-7 !p-2 w-1/3 ",
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
                className: "!bg-rose-500 !text-white text-sm !h-7 !p-2 w-1/3",
              })}
            >
              <UserX />
              Absent: {absentCount}
            </div>
          </div>
        </div>

        <ScrollArea className="h-[39.9vh]">
          <div className="flex flex-col gap-2 ">
            {filterStudents.map((enrolledStudent) => {
              return (
                <AttedanceCard
                  key={enrolledStudent.id}
                  enrolledStudent={enrolledStudent}
                  onStatusChange={handleStatusChange}
                />
              );
            })}
            {filterStudents.length === 0 && (
              <p className="text-center mt-2 text-muted-foreground">
                No student found!
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
