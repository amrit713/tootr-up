import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HourSelect from "./add-time-select";
import { useGetTimes } from "../api/use-get-times";
import { Label } from "@/components/ui/label";

export const Times = ({ branchProgramId }: { branchProgramId: string }) => {
  const { data, isLoading } = useGetTimes({ branchProgramId });

  return (
    <div className="flex flex-col gap-2 px-2">
      <p className="text-muted-foreground">Avaliable Time:</p>
      <ScrollArea className=" h-12  w-[35rem] lg:w-[45rem]">
        <div className=" gap-2 flex ">
          {data?.map((time) => (
            <Badge className=" bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-600 p-2 shadow-none rounded-none font-space font-bold">
              {time.startTime}- {time.endTime}
            </Badge>
          ))}
          {data?.length === 0 && (
            <p className=" text-neutral-400 dark:text-neutral-500">
              No time avaliable for this class
            </p>
          )}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <HourSelect branchProgramId={branchProgramId} />
    </div>
  );
};
