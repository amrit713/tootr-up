"use client";

import { EditIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateFollowUp } from "../api/use-update-follow-up";

import { Textarea } from "@/components/ui/textarea";
import { ButtonLoader } from "@/components/global/button-loader";

interface Props {
  remark?: string | null;
  id: string;
}

export const FollowRemark = ({ remark, id }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(remark ?? undefined);

  const { mutate, isPending } = useUpdateFollowUp();

  const handleSave = () => {
    mutate(
      {
        json: {
          remark: value,
        },
        param: { followUpId: id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className=" font-semibold">Remark:</p>
        {!isEditing && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setIsEditing(!!id)}
            className="rounded-full"
          >
            <EditIcon />
          </Button>
        )}

        {isEditing && (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <XIcon />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a Remark..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className=" shadow-none bg-background"
          />
          <Button
            size={"sm"}
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            <ButtonLoader
              label="Save"
              isLoading={isPending}
              loadingText="Saving"
            />
          </Button>
        </div>
      ) : (
        <span
          className={cn(
            "text-gray-600 dark:text-gray-300 text-sm",
            !remark && "text-gray-400 dark:text-gray-500 "
          )}
        >
          {remark ? remark : "Not provided yet!"}
        </span>
      )}
    </div>
  );
};
