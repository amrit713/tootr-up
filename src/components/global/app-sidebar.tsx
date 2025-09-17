"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_MENU_ITEM } from "@/constants";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

export const AppSidebar = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16  flex justify-center">
        <SidebarMenuButton className="hover:bg-inherit hover:text-inherit min-w-8">
          <Logo />

          <h1 className="font-space font-bold text-xl">TootrUp</h1>
        </SidebarMenuButton>
      </SidebarHeader>
      <Separator />
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {SIDEBAR_MENU_ITEM.map((item) => {
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className={cn(
                      " hover:bg-white transition rounded font-medium hover:text-black dark:hover:bg-gray-800 dark:hover:text-white  text-neutral-500  ",
                      path === item.href &&
                        "text-black bg-white dark:bg-gray-800 dark:text-white"
                    )}
                    onClick={() => router.push(`/${item.href}`)}
                  >
                    <div className={cn("flex flex-items-center gap-2 ")}>
                      <item.icon
                        className={cn(
                          "size-5 text-neutral-500  ",
                          path === item.href && "text-black dark:text-white "
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
};
