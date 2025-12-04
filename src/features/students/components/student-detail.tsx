import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router } from "better-auth/api";
import {
  Edit,
  EditIcon,
  MoreVertical,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function StudentDetail({
  name,
  id,
  image,
}: {
  name: string;
  image: string | null;
  id: string;
}) {
  const router = useRouter();

  return (
    <div className=" flex justify-between ">
      <div className="flex gap-4 items-center">
        <div className="relative  ">
          <Avatar className="size-24 border-green-500/50 border-2 ">
            <AvatarFallback className="bg-green-500/15 text-4xl text-green-600  font-semibold">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Button
            className=" rounded-full absolute right-0 bottom-[-6px] shadow-none "
            size={"icon"}
            variant={"secondary"}
          >
            {" "}
            <PlusIcon />
          </Button>
        </div>
        <div className="flex flex-col ">
          <p className="text-2xl capitalize font-semibold ">{name}</p>
          <p className="flex items-center text-muted-foreground gap-2 font-medium">
            <span className="size-2 rounded-full bg-green-500" /> STUDENT
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/students/${id}/edit`)}>
            <EditIcon /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem className="">
            <TrashIcon /> Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default StudentDetail;
