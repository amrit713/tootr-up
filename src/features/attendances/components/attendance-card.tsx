"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useCreateAttendance } from "@/features/attendances/api/api/use-create-attendance";
import { AttendanceStatus } from "@/generated/prisma/browser";
import { useAttendanceFilters } from "@/hooks/use-attendance";
import { cn } from "@/lib/utils";

import { StudentEnrollmentType } from "@/types";

interface AttedanceCardProps {
  enrolledStudent: StudentEnrollmentType;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
}

export const AttedanceCard = ({
  enrolledStudent,
  onStatusChange,
}: AttedanceCardProps) => {
  const { date } = useAttendanceFilters();
  const { mutate } = useCreateAttendance();

  const [localStatus, setLocalStatus] = useState<AttendanceStatus | null>(null);

  // Initialize from server data ONCE
  useEffect(() => {
    if (enrolledStudent.attendance?.length > 0) {
      setLocalStatus(enrolledStudent.attendance[0].status);
    }
  }, [enrolledStudent.attendance]);

  const toggleStatus = (status: AttendanceStatus): void => {
    const previousStatus = localStatus;

    // ✅ OPTIMISTIC UPDATE
    setLocalStatus(status);

    mutate(
      {
        json: {
          date: date ?? "",
          studentEnrollmentId: enrolledStudent.id,
          status,
        },
      },
      {
        onSuccess() {
          onStatusChange(enrolledStudent.id, status);
        },
        onError() {
          // ❌ rollback if API fails
          setLocalStatus(previousStatus ?? null);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "border flex justify-between items-center p-2 rounded transition-colors",
        localStatus === "PRESENT" && "bg-emerald-500/5 border-emerald-500/20",
        localStatus === "ABSENT" && "bg-rose-500/5 border-rose-500/20"
      )}
    >
      {/* Student Info */}
      <div className="flex items-center gap-3 w-full">
        <Avatar className="size-12 border">
          <AvatarFallback className="bg-emerald-500/10 font-medium">
            {enrolledStudent.student.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-sm font-semibold capitalize">
            {enrolledStudent.student.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {enrolledStudent.student.number}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => toggleStatus("PRESENT")}
          className={cn(
            "!size-6 rounded-full !border-emerald-500 !text-emerald-500",
            localStatus === "PRESENT" && "!bg-emerald-500 !text-white"
          )}
        >
          <Check />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={() => toggleStatus("ABSENT")}
          className={cn(
            "!size-6 rounded-full !border-rose-500 !text-rose-500",
            localStatus === "ABSENT" && "!bg-rose-500 !text-white"
          )}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
