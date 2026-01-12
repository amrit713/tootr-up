"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useCreateAttendance } from "@/features/attendances/api/api/use-create-attendance";
import { useGetAttendance } from "@/features/attendances/api/api/use-get-attendance";
import { AttendanceStatus } from "@/generated/prisma/enums";
import { useAttendanceFilters } from "@/hooks/use-attendance";
import { cn } from "@/lib/utils";

import { StudentEnrollmentType } from "@/types";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AttedanceCardProps {
  enrolledStudent: StudentEnrollmentType;
  onStatusChange: (studentId: string, status: "PRESENT" | "ABSENT") => void;
}

export const AttedanceCard = ({
  enrolledStudent,
  onStatusChange,
}: AttedanceCardProps) => {
  const [attendanceId, setAttendanceId] = useState<string | undefined>(
    undefined
  );
  const { date } = useAttendanceFilters();
  const { mutate } = useCreateAttendance();

  const { data, refetch } = useGetAttendance({ id: attendanceId });

  useEffect(() => {
    if (enrolledStudent.attendance.length > 0) {
      setAttendanceId(enrolledStudent.attendance[0].id);
      refetch();
    }
  }, [enrolledStudent]);

  const toggleStatus = (status: AttendanceStatus) => {
    mutate(
      {
        json: {
          date: date ?? "",
          studentEnrollmentId: enrolledStudent.id,
          status,
        },
      },
      {
        onSuccess(data) {
          setAttendanceId(data.data.id);
          refetch();
          onStatusChange(enrolledStudent.id, status);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "border flex justify-between items-center p-2 rounded",
        data?.status === "PRESENT" && "bg-emerald-500/5 border-emerald-500/20",
        data?.status === "ABSENT" && "bg-rose-500/5 border-rose-500/20"
      )}
    >
      <div className="flex flex-col gap-2 font-normal w-full">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 hover:opacity-75 transition border border-netural-400  ">
            <AvatarFallback className="bg-emerald-500/10 font-medium text-primary dark:text-white flex items-center justify-center ">
              {enrolledStudent.student.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center ">
            <span className="capitalize text-sm  font-semibold">
              {enrolledStudent.student.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {" "}
              {enrolledStudent.student.number}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className={cn(
            "!text-emerald-500 !border-emerald-500 rounded-full !size-6",
            data?.status === "PRESENT" && "!bg-emerald-500 !text-white"
          )}
          variant={"outline"}
          size={"icon"}
          onClick={() => toggleStatus("PRESENT")}
        >
          <Check />
        </Button>
        <Button
          className={cn(
            "!text-rose-500 !border-rose-500 rounded-full !size-6",
            data?.status === "ABSENT" && "!bg-rose-500 !text-white"
          )}
          variant={"outline"}
          size={"icon"}
          onClick={() => toggleStatus("ABSENT")}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
