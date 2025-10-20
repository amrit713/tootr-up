import { StudentDetailType } from "@/types";
import { Information } from "./information";
import { format } from "date-fns";
import { Divide, GraduationCap, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InfoProps {
  student: StudentDetailType;
}
export const Info = ({ student }: InfoProps) => {
  return (
    <div className="py-4 flex flex-col md:flex-row gap-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="uppercase font-semibold font-space flex gap-2 items-center">
          <GraduationCap /> Student Information
        </h1>

        <div className="flex flex-col gap-2">
          <Information label="name" title={student.name} />
          <Information label="school name" title={student.schoolName} />
          <Information label="grade" title={student.grade} />

          <Information label="gender" title={student.gender.toLowerCase()} />
          <Information
            label="join date"
            title={format(student.enrolledDate, " yyy MMM dd")}
          />
          <Information label="age" title={`${student.age}`} />
          <Information label="branch" title={student.Branch.name} />

          <div className="flex flex-col font-space">
            <p className="uppercase text-muted-foreground text-xs">
              Enrolled Programs
            </p>
            <div className="flex flex-col gap-.5">
              {student.StudentEnrollment.map((enrolled) => (
                <div key={enrolled.id}>
                  <Badge className="bg-emerald-500/20 dark:bg-emerald-500/60 dark:text-white rounded text-black capitalize">
                    {enrolled.branchProgram.program.name}:
                    <span className="text-gray-800 dark:text-gray-200">
                      {enrolled.timeTable.startTime}-
                      {enrolled.timeTable.endTime}
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="uppercase font-semibold font-space flex gap-2 items-center">
          <UserRound /> Parent Information
        </h1>

        <div className="flex flex-col gap-2">
          <Information label="parent name" title={student.parentName} />
          <Information label="primary number" title={student.number} />
          <Information
            label="secondary number"
            title={student.secondaryNumber}
          />

          <Information label="email" title={student.email ?? "Not provided"} />
          <Information label="address" title={student.address} />
        </div>
      </div>
    </div>
  );
};
