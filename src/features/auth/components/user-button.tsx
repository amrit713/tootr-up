"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "../api/use-logout";
import { useCurrentUser } from "../api/use-current-user";
import {
  CircleUserRound,
  Headphones,
  Loader2,
  LogOut,
  Settings,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";

export const UserButton = () => {
  const { mutate: logout } = useLogout();
  const { user, isLoading } = useCurrentUser();

  const [drop, setDrop] = useState(false);
  const [LogoutDialog, confirmLogout] = useConfirm(
    "Logout",
    "Are you sure you want to logout"
  );

  const handleLogout = async () => {
    const ok = await confirmLogout();
    setDrop(false);
    if (!ok) return;

    logout();
  };

  if (isLoading) {
    <div className="size-10  flex items-center justify-center bg-primary/10 border-neutral-400 rounded-full">
      <Loader2 className="size-4 animate-spin text-muted-foreground" />
    </div>;
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <LogoutDialog />
      <DropdownMenu open={drop} onOpenChange={() => setDrop(false)}>
        <DropdownMenuTrigger
          className="outline-none relative cursor-pointer"
          onClick={() => setDrop(true)}
        >
          <Avatar className="size-9 hover:opacity-75 transition border border-netural-400  ">
            <AvatarFallback className="bg-primary/10 font-bold text-primary flex items-center justify-center  ">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="w-60"
          sideOffset={10}
        >
          <div className="flex  items-center  gap-2 px-2.5 py-4   ">
            <Avatar className="size-[52px] transition border border-netural-400 ">
              <AvatarFallback className="bg-primary/10 font-medium text-primary flex text-xl items-center justify-center">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>

            <div className=" flex flex-col ">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white capitalize">
                {name || "User"}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {email}
              </p>
            </div>
          </div>
          <Separator className="my-1" />
          <DropdownMenuItem className="py-2 text-neutral-900 dark:text-white  flex items-center gap-2 text-sm">
            <CircleUserRound className="size-4 text-neutral-500 dark:text-neutral-400 " />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 text-neutral-900 dark:text-white  flex items-center gap-2 text-sm">
            <Headphones className="text-neutral-500 dark:text-neutral-400 size-4" />
            Help Center
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 text-neutral-900 dark:text-white  flex items-center gap-2 text-sm">
            <Settings className="text-neutral-500 dark:text-neutral-400 size-4" />
            Account Settings
          </DropdownMenuItem>

          <Separator className="my-1" />

          <DropdownMenuItem
            className="py-2 text-rose-600 dark:text-rose-400  flex items-center gap-2 text-sm font-semibold"
            onClick={handleLogout}
          >
            <LogOut className="text-rose-500 dark:text-rose-400 size-4 " />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
