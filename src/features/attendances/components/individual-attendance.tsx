import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsCard } from "@/features/leads/components/analytics-card";
import { useGetStudentEnrollmentAnalytics } from "@/features/student-enrollments/api/use-get-student-enrollment-analytics";
import {
  AlertTriangleIcon,
  CalendarCheck,
  CheckCheck,
  CheckCheckIcon,
  X,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

interface Props {
  studentEnrollments: {
    branchProgram: {
      program: {
        name: string;
      };
    };
    timeTable: {
      startTime: string;
      endTime: string;
    };
    id: string;
  }[];
}

export function IndividualAttendance({ studentEnrollments }: Props) {
  const [value, setValue] = useState<string>(studentEnrollments[0].id);

  const { data: analytics, isLoading } = useGetStudentEnrollmentAnalytics({
    enrollmentId: value,
  });

  return (
    <div className="py-4 flex flex-col gap-4 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-lg font-space font-bold uppercase">
          Attendance Analytics
        </h1>

        <Select
          defaultValue={value}
          onValueChange={(newValue) => setValue(newValue)}
        >
          <SelectTrigger className="w-full md:w-auto capitalize">
            <SelectValue placeholder="Select a Program " />
          </SelectTrigger>
          <SelectContent>
            {studentEnrollments.map((studentEnrollment) => (
              <SelectItem
                key={studentEnrollment.id}
                value={studentEnrollment.id}
                className="capitalize"
              >
                {studentEnrollment.branchProgram.program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3  gap-4  ">
        <AnalyticsCard
          title="Total Attendance"
          value={analytics?.totalAttendance}
          icon={CalendarCheck}
          color="text-primary dark:text-blue-400"
          background="dark:bg-neutral-900"
        />
        <AnalyticsCard
          title="Total Present"
          value={analytics?.present}
          percentage={analytics?.presentPrecentage}
          description="present percent"
          icon={CheckCheckIcon}
          color="text-emerald-500 dark:text-emerald-400"
          background="dark:bg-neutral-900"
        />
        <AnalyticsCard
          title="Total Absent"
          value={analytics?.absent}
          description="absent percent"
          percentage={analytics?.absentPrecentage}
          icon={XCircle}
          color="text-rose-500 dark:text-rose-400"
          background="dark:bg-neutral-900"
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border  p-2  rounded  font-space flex gap-2 flex-col  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-full ">
                <CalendarCheck className="size-4 " />
              </div>
              <p className="">Total Attendance:</p>
            </div>
            <p className="text-lg  text-muted-foreground">
              {analytics?.totalAttendance}
            </p>
          </div>

          <div className="flex flex-col w-full">
            <span className="font-medium flex  justify-end">100%</span>

            <Progress
              value={100}
              className="bg-neutral-500/20"
              indicatorClassName="bg-gray-500"
            />
          </div>
        </div>
        <div className="border border-rose-300 dark:   bg-rose-300/5 dark:border-rose-300/30 p-2  rounded font-space flex flex-col gap-2  ">
          <div className="flex justify-between gap-2 items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-500/10 dark:bg-rose-500/30 rounded-full ">
                <X className="size-4 " />
              </div>

              <p className="">Total Absent:</p>
            </div>
            <p className="text-lg text-rose-400 ">{analytics?.absent} </p>
          </div>
          <div className="flex flex-col w-full">
            <div className="">
              <span className="font-medium flex  justify-end">
                {analytics?.absentPrecentage}%
              </span>
            </div>
            <Progress
              value={analytics?.absentPrecentage}
              className="bg-rose-500/20"
              indicatorClassName="bg-rose-500"
            />
          </div>
        </div>
        <div className="border p-2  rounded font-space border-emerald-500  bg-emerald-300/5 dark:border-emerald-300/30  flex gap-2  flex-col ">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-2  ">
              <div className="p-2 bg-emerald-500/10 dark:bg-emerald-700/20 rounded-full ">
                <CheckCheck className="size-4  " />
              </div>

              <p className="">Total Present:</p>
            </div>
            <p className="text-lg text-emerald-600 ">{analytics?.present} </p>
          </div>

          <div className="flex flex-col w-full">
            <span className="font-medium flex  justify-end">
              {analytics?.presentPrecentage}%
            </span>

            <Progress
              value={analytics?.presentPrecentage}
              className="bg-emerald-500/20"
              indicatorClassName="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
