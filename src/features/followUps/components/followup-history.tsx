"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLeadId } from "../../leads/hooks/use-lead-id";
import { useGetFollowUps } from "@/features/followUps/api/use-get-followups";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Followup } from "./followup";
import { useModal } from "@/hooks/use-modal-store";

export const FollowupHistory = () => {
  const leadId = useLeadId();
  const { onOpen } = useModal();

  const { data: followups } = useGetFollowUps({ leadId });

  return (
    <Card className=" shadow-none border-none p-0">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="">Follow History({followups?.total})</CardTitle>
        <CardAction>
          <Button onClick={() => onOpen("createFollowUp")}>
            New follow up
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="h-auto">
        <ScrollArea className="h-[75.5vh]">
          <div className="flex flex-col gap-4">
            {followups?.data?.map((followup) => (
              <Followup
                key={followup.id}
                due_date={followup.due_date}
                priority={followup.priority}
                remark={followup.remark}
                name={followup.user.name}
                email={followup.user.email}
                status={followup.status}
              />
            ))}
          </div>

          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
