"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { Button } from "../ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

const pathnameMap = {
  leads: {
    title: "Leads",
    description: "View all of your leads here",
  },
  students: {
    title: "Leads",
    description: "View all of your leads here",
  },

  settings: {
    title: "Settings",
    description: "View all of your project here",
  },
};
const defaultMap = {
  title: "Home",
  description: "Monitor all of your leads and follow up here",
};

export const Navbar = () => {
  return (
    <nav className=" h-[5rem] flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button asChild variant={"ghost"} size={"icon"}>
          <SidebarTrigger size={"lg"} />
        </Button>
        <div className="flex flex-col ">
          <p className="text-lg font-bold ">Dashboard</p>
          <span className="text-neutral-500 text-sm">
            Monitor all of your leads and follow up here
          </span>
        </div>
      </div>
      <div className="flex gap-4 ">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
