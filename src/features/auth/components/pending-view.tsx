import { ButtonLoader } from "@/components/global/button-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HourglassIcon } from "lucide-react";

export const PendingView = () => {
  return (
    <div className="">
      <Card className="max-w-md">
        <CardContent className="flex items-center justify-center gap-4 flex-col">
          <div className=" text-primary dark:text-purple-400 shadow rounded-full p-4 ">
            <HourglassIcon className="size-10  " />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold font-space mb-4">
              Account Pending Verification
            </h1>
            <p className="text-muted-foreground text-center">
              Your account is currently pending approval by the admin. You will
              receive a notification once your account has been verified.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
