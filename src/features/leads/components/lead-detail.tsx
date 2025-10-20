"use client";

import { ArrowLeft, EditIcon, MoreVertical, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, snakeCaseToTitleCase } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { LeadDetailType } from "@/types";

interface Props {
  lead?: LeadDetailType;
}

export const LeadDetail = ({ lead }: Props) => {
  const { onOpen } = useModal();
  const router = useRouter();

  return (
    <Card>
      <div className="">
        <CardHeader className="flex items-center justify-between">
          <Button
            variant={"ghost"}
            className="rounded-full"
            size={"icon"}
            onClick={() => router.push("/leads")}
          >
            <ArrowLeft />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="rounded-full" size={"icon"}>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onOpen("updateLead")}>
                <EditIcon /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:text-red-600 [&>svg]:text-red-600">
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Avatar className="size-20 text-4xl  font-space text-primary font-bold  ">
              <AvatarFallback className="capitalize dark:bg-blue-600/10 dark:text-white">
                {lead?.parentName ? lead.parentName.charAt(0) : "L"}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="capialize text-xl font-semibold font-space">
                {lead?.number}
              </p>
              <p className=" text-neutral-500 text-sm">
                {lead?.email ? lead.email : "lead@gamil.com"}
              </p>
            </div>
            <Badge variant={lead?.status} className="rounded ">
              {" "}
              {lead?.status}
            </Badge>
          </div>
          <Separator />
          <div className="">
            <p className="font-space font-semibold">Created By:</p>
            <div className=" flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Avatar className="capitalize font-semibold">
                <AvatarFallback className="bg-green-600/10">
                  {lead?.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="capitalize">{lead?.user.name}</p>
            </div>
          </div>

          <Separator />
          <div className="">
            <h1 className="font-space  font-semibold">Parent Info:</h1>

            <div className="mt-4 flex   gap-6">
              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Number</p>
                <p className="text-gray-600 dark:text-gray-300 capitalize">
                  {" "}
                  {lead?.number}
                </p>
              </div>

              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Email</p>
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300 ",
                    !lead?.email && "text-gray-400 dark:text-gray-500  text-xs"
                  )}
                >
                  {" "}
                  {lead?.email ? lead.email : "not provided"}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Name</p>
                <p
                  className={cn(
                    "text-gray-600 capitalize dark:text-gray-300",
                    !lead?.parentName &&
                      "text-gray-400 dark:text-gray-500 text-xs"
                  )}
                >
                  {" "}
                  {lead?.parentName ? lead.parentName : "Not provided"}
                </p>
              </div>

              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Address</p>
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300 capitalize",
                    !lead?.address && "text-gray-400 dark:text-gray-500 text-xs"
                  )}
                >
                  {" "}
                  {lead?.address ? lead.address : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <Separator />
          <div className="">
            <h1 className="font-space font-semibold">Student Info:</h1>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Name</p>
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300 capitalize",
                    !lead?.studentName &&
                      "text-gray-400 dark:text-gray-500 text-xs"
                  )}
                >
                  {" "}
                  {lead?.studentName ? lead.studentName : "Not provided"}
                </p>
              </div>

              <div className="flex flex-col text-sm ">
                <p className=" font-medium">School Name</p>
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300 capitalize",
                    !lead?.schoolName &&
                      "text-gray-400 dark:text-gray-500 text-xs"
                  )}
                >
                  {" "}
                  {lead?.schoolName ? lead.schoolName : "not provided"}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col text-sm ">
                  <p className="tex font-medium">Age</p>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300 capitalize",
                      !lead?.age && "text-gray-400 dark:text-gray-500 text-xs"
                    )}
                  >
                    {" "}
                    {lead?.age ? lead.age : "Not provided"}
                  </p>
                </div>

                <div className="flex flex-col text-sm ">
                  <p className=" font-medium">Grade</p>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300 capitalize",
                      !lead?.grade && "text-gray-400 dark:text-gray-500 text-xs"
                    )}
                  >
                    {" "}
                    {lead?.grade ? lead.grade : "Not provided"}
                  </p>
                </div>
                <div className="flex flex-col text-sm ">
                  <p className=" font-medium">Gender</p>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300 capitalize",
                      !lead?.gender &&
                        "text-gray-400 dark:text-gray-500 text-xs"
                    )}
                  >
                    {" "}
                    {lead?.gender ? lead.gender : "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col text-sm ">
                  <p className=" font-medium">Branch</p>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300 capitalize",
                      !lead?.branch?.name &&
                        "text-gray-400 dark:text-gray-500 text-xs"
                    )}
                  >
                    {" "}
                    {lead?.branch?.name ? lead.branch.name : "Not provided"}
                  </p>
                </div>

                <div className="flex flex-col text-sm ">
                  <p className="font-medium">Source</p>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300 capitalize",
                      !lead?.source &&
                        "text-gray-400 dark:text-gray-500 text-xs"
                    )}
                  >
                    {" "}
                    {lead?.source
                      ? snakeCaseToTitleCase(lead.source)
                      : "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm ">
                <p className=" font-medium">Interested Program</p>
                <div className="flex overflow-x-auto gap-2 mt-2 ">
                  {lead?.programs.length !== 0 ? (
                    lead?.programs.map((program, idx) => (
                      <Badge
                        key={idx}
                        className="bg-green-300/20 dark:text-white text-black"
                      >
                        {program}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      Not provided
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
