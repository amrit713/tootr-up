"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useCreateTime } from "../api/use-create-time";
import { ButtonLoader } from "@/components/global/button-loader";

export default function HourSelect({
  branchProgramId,
}: {
  branchProgramId: string;
}) {
  const [startHour, setStartHour] = useState<string | null>(null);
  const [endHour, setEndHour] = useState<string | null>(null);

  const { mutate: createTime, isPending } = useCreateTime();

  // Generate hours from 9 AM to 6 PM
  const hours = Array.from({ length: 10 }, (_, i) => {
    const h24 = i + 9; // 9 → 18
    const suffix = h24 < 12 ? "AM" : "PM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12; // Convert 24h → 12h format
    return `${h12.toString().padStart(2, "0")}:00 ${suffix}`;
  });

  const onClickHandler = () => {
    createTime(
      {
        json: {
          branchProgramId,
          startTime: startHour ?? "",
          endTime: endHour ?? "",
        },
      },
      {
        onSuccess: () => {
          setStartHour(null);
          setEndHour(null);
        },
      }
    );
  };
  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={(value) => setStartHour(value)}>
        <SelectTrigger className="shadow-none font-space font-semibold">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h} className="font-space font-semibold">
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      -
      <Select onValueChange={(value) => setEndHour(value)}>
        <SelectTrigger className="shadow-none font-space font-semibold">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h} className="font-space font-semibold">
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {startHour && endHour && (
        <Button
          className=" shadow-none"
          variant={"outline"}
          onClick={onClickHandler}
          disabled={isPending}
        >
          <ButtonLoader
            isLoading={isPending}
            loadingText="Adding"
            label="Add"
          />
        </Button>
      )}
    </div>
  );
}
