"use client";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { SIDEBAR_MENU_ITEM } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

export const AppSidebar = () => {
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
                  <SidebarMenuButton className=" hover:bg-white transition rounded font-medium hover:text-black text-neutral-500 ">
                    <Link
                      href={item.href}
                      className={cn("flex flex-items-center gap-2 ")}
                    >
                      <item.icon className="size-5 text-neutral-500" />
                      <span>{item.label}</span>
                    </Link>
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
