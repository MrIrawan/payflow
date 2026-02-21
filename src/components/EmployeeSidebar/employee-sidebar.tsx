"use client";

import Image from "next/image";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "../ui/sidebar";

import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";

import { CalendarCheck2, House, User2, Users, Wallet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

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
                            href="/employee/payroll"
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
            <Separator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex flex-row items-center gap-2 w-full h-fit">
                                    <Avatar className="w-10 h-10 rounded-md">
                                        <AvatarFallback className="rounded-md">HH</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-black">Lorem, ipsum.</p>
                                        <p className="text-xs font-medium text-muted-foreground">lorem@mail.com</p>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right"></DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}