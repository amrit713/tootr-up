"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

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
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

export const AppSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

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
                      " hover:bg-white transition rounded font-medium hover:text-black  text-neutral-500  ",
                      pathname === item.href && "text-black bg-white"
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn("flex flex-items-center gap-2 ")}
                    >
                      <item.icon
                        className={cn(
                          "size-5 text-neutral-500  ",
                          pathname === item.href && "text-black "
                        )}
                      />
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
