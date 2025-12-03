"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { Button } from "../ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

const pathnameMap = {
  leads: {
    title: "Leads",
    description: "View all of your leads here",
  },
  students: {
    title: "Students",
    description: "View all of your students here",
  },

  settings: {
    title: "Settings",
    description: "View and edit the settings",
  },
};
const defaultMap = {
  title: "Home",
  description: "Monitor all of your leads and follow up here",
};

export const Navbar = () => {
  const pathname = usePathname();

  const pathnameParts = pathname.split("/");

  const pathnameKey = pathnameParts[1] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className=" h-[5rem] flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button asChild variant={"ghost"} size={"icon"}>
          <SidebarTrigger size={"lg"} />
        </Button>
        <div className="flex flex-col ">
          <p className="text-lg font-semibold ">{title}</p>
          <span className="text-neutral-500 text-sm">{description}</span>
        </div>
      </div>
      <div className="flex gap-4 ">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
