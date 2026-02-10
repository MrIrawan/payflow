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

import { CalendarCheck2, House, Users, Wallet } from "lucide-react";

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
                        <SidebarNavigationLink
                            href="/employee"
                            label="dashboard"
                            Icon={House}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href="/employee/me"
                            label="Profile anda"
                            Icon={Users}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href="/employee/kalkulator-gaji"
                            label="kalkulator gaji"
                            Icon={Wallet}
                            activeBg
                        />
                        <CollabsipleSidebarNavigation
                            label="Absensi"
                            Icon={CalendarCheck2}
                            sub={[
                                {
                                    label: "absensi mandiri",
                                    href: "/employee/absensi-mandiri"
                                },
                                {
                                    label: "statistik absensi anda",
                                    href: "/employee/statistik-absen"
                                },
                            ]}
                        />
                        <SidebarNavigationLink
                            href="/employee/cetak-laporan-gaji"
                            label="cetak laporan gaji"
                            Icon={Wallet}
                            activeBg
                        />
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}