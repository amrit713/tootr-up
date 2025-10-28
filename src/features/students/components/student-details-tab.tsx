import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarCheck2,
  CreditCard,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Info } from "./info";
import { StudentDetailType } from "@/types";
import { IndividualAttendance } from "@/features/attendances/components/individual-attendance";
import { IndividualPayment } from "./individual-payment";

interface StudentDetailTabProps {
  student: StudentDetailType;
}

export const StudentDetailTab = ({ student }: StudentDetailTabProps) => {
  return (
    <div className="">
      <Tabs defaultValue="info">
        <TabsList className="bg-background rounded-none border-b p-0 md:gap-4 w-full font-space hover:!font-bold text-lg ">
          <TabsTrigger
            value="info"
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none data-[state=active]:!font-bold hover:!font-bold "
          >
            {" "}
            <User /> Info
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none data-[state=active]:!font-bold hover:!font-bold"
          >
            <CalendarCheck2 /> Attedance
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none data-[state=active]:!font-bold hover:!font-bold"
          >
            <CreditCard /> Payments
          </TabsTrigger>

          <TabsTrigger
            value="overview"
            className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none data-[state=active]:!font-bold hover:!font-bold"
          >
            <LayoutDashboard /> Overview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="">
          <Info student={student} />
        </TabsContent>
        <TabsContent value="attendance" className="">
          <IndividualAttendance
            studentEnrollments={student.StudentEnrollment}
          />
        </TabsContent>

        <TabsContent value="payments" className="">
          <IndividualPayment payments={student.Payment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
