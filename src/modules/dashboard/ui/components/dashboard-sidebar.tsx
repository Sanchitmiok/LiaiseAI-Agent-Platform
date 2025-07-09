"use client";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import DashBoardUserButtion from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";

const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];
const secondSection = [{ icon: StarIcon, label: "Upgrade", href: "/upgrade" }];

function Dashboardsidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader
        className="text-sidebar-accent-foreground"
        onClick={() => router.push("/")}
      >
        <Link href="" className="flex items-center gap-2 px-2 pt-2">
          <Image alt="Icon" src="/logo.svg" height={36} width={36} />
          <p className="text-2xl font-bold">LiaiseAI</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-50" />
      </div>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  // cn is use for dynamic css
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href &&
                      "bg-linear-to-r/oklch border-[#5D6B68]"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <div className="px-4 py-2">
          <Separator className="opacity-50 " />
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  // cn is use for dynamic css
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href &&
                      "bg-linear-to-r/oklch border-[#5D6B68]"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <DashboardTrial />
        <DashBoardUserButtion />
      </SidebarFooter>
    </Sidebar>
  );
}

export default Dashboardsidebar;
