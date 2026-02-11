"use client";

import Image from "next/image";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "../ui/sidebar";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";
import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { CalendarCheck2, House, Users, Wallet } from "lucide-react";

export function AdminSidebar() {
  return (
    <Sidebar className="px-2.5">
      <SidebarHeader className="p-4">
        <Image src={LogoWithTitle} alt="payflow-logo" width={200} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-full">
          {/* Sidebar items go here */}
          <SidebarMenu className="gap-4">
            <SidebarNavigationLink
              href="/admin"
              label="dashboard"
              Icon={House}
              activeBg
            />
            <CollabsipleSidebarNavigation
              label="data guru"
              Icon={Users}
              sub={[
                {
                  label: "lihat data guru",
                  href: "/admin/teacher"
                },
                {
                  label: "tambah data guru",
                  href: "/admin/teacher/add-teacher"
                },
              ]}
            />
            <SidebarNavigationLink
              href="/admin/payroll"
              label="penggajian"
              Icon={Wallet}
              activeBg
            />
            <SidebarNavigationLink
              href="/admin/attendance"
              label="absensi"
              Icon={CalendarCheck2}
              activeBg
            />
            <SidebarNavigationLink
              href="/admin/report"
              label="laporan"
              Icon={Wallet}
              activeBg
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
