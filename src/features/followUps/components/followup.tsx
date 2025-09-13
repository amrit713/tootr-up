import { Priority } from "@/components/global/priority";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Priority as FollowUpPriority,
  FollowUpStatus,
} from "@/generated/prisma";
import { FollowUpDate } from "./follow-up-date";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { date } from "better-auth";
import { cn, getDueDateLabel } from "@/lib/utils";
import { useState } from "react";
import { Edit } from "lucide-react";

interface Props {
  due_date: string;
  priority: FollowUpPriority;
  remark?: string | null;
  name: string;
  email: string;
  status: FollowUpStatus;
}

export const Followup = ({
  due_date,
  priority,
  remark,
  email,
  status,
  name,
}: Props) => {
  return (
    <Card className="shadow-none border-none bg-gray-50">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="  font-semibold">Due Date:</p>

          <FollowUpDate value={due_date} className="text-sm t" />
        </div>
        <Priority priority={priority} className=" text-sm" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className=" font-semibold">Remark:</p>
          <Button variant={"ghost"} size={"icon"}>
            <Edit />
          </Button>
        </div>

        <span
          className={cn("text-gray-600 text-sm", !remark && "text-gray-400 ")}
        >
          {remark ? remark : "Not provided yet!"}
        </span>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between ">
        <div className="flex gap-4 items-center">
          <Avatar className="size-10  font-semibold uppercase ">
            <AvatarFallback className="bg-green-600/10">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <span className="text-sm font-medium  capitalize">{name}</span>
            <span className="text-xs text-gray-600">{email}</span>
          </div>
        </div>

        <Badge variant={status} className="">
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
