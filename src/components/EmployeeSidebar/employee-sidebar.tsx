"use client";

import Image from "next/image";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu
} from "../ui/sidebar";

import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";

import { CalendarCheck2, Users, Wallet } from "lucide-react";

export function EmployeeSidebar() {
    return (
        <Sidebar className="px-2.5">
            <SidebarHeader className="p-4">
                <Image src={LogoWithTitle} alt="payflow-logo" width={200} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="h-full">
                    {/* Sidebar items go here */}
                    <SidebarMenu className="gap-4">
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
                                    href: "/admin/teacher/add"
                                },
                                {
                                    label: "edit data guru",
                                    href: "/admin/teacher/edit"
                                }
                            ]}
                        />
                        <SidebarNavigationLink
                            href="/admin/payroll"
                            label="penggajian"
                            Icon={Wallet}
                            activeBg
                        />
                        <CollabsipleSidebarNavigation
                            label="Absensi"
                            Icon={CalendarCheck2}
                            sub={[
                                {
                                    label: "lihat data absensi",
                                    href: "/admin/attendance"
                                },
                                {
                                    label: "tambah data absensi",
                                    href: "/admin/attendance/add"
                                },
                                {
                                    label: "edit data absensi",
                                    href: "/admin/attendance/edit"
                                }
                            ]}
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
    )
}