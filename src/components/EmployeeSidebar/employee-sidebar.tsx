"use client";

import { useState, useEffect } from "react";
import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";
import { GetEmployeeProfileData } from "@/types/response";

import Image from "next/image";
import Link from "next/link";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg"

import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";

import { CalendarCheck2, House, LogOut, UserCircleIcon, Users, Wallet, WalletIcon } from "lucide-react";

export function EmployeeSidebar() {
    const [employeeProfile, setEmployeeProfile] = useState<GetEmployeeProfileData | undefined>(undefined);

    useEffect(() => {
        async function fetchEmployeeProfile() {
            try {
                const response = await getEmployeeProfile();

                setEmployeeProfile(response.data.data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
            }
        };

        fetchEmployeeProfile();
    }, []);
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
                    {employeeProfile === undefined ? (
                        <Skeleton className="w-full h-[55px] bg-gray-300" />
                    ) : (
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="flex flex-row items-center gap-2 w-full h-fit">
                                        <Avatar className="w-10 h-10 rounded-md">
                                            <AvatarFallback className={`rounded-md text-white font-medium ${employeeProfile.gender === "male" ? "bg-blue-600" : "bg-pink-600"}`}>{employeeProfile.full_name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-black">{employeeProfile.full_name}</p>
                                            <p className="text-xs font-medium text-muted-foreground">{employeeProfile.email_address}</p>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" className="min-w-[250px] flex flex-col justify-between h-fit">
                                    <div className="w-full flex flex-row items-center gap-2 p-2">
                                        <Avatar className="w-10 h-10 rounded-md">
                                            <AvatarFallback className={`rounded-md text-white font-medium ${employeeProfile.gender === "male" ? "bg-blue-600" : "bg-pink-600"}`}>{employeeProfile.full_name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="w-full flex flex-col">
                                            <p className="text-sm font-medium text-black">{employeeProfile.full_name}</p>
                                            <p className="text-xs font-medium text-muted-foreground">{employeeProfile.email_address}</p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="w-full flex flex-col gap-0">
                                        <Link href={"/employee/me"}>
                                            <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                                                <UserCircleIcon />
                                                <p className="text-sm font-medium">Profile Anda</p>
                                            </Button>
                                        </Link>
                                        <Link href={"/employee/payroll"}>
                                            <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                                                <WalletIcon />
                                                <p className="text-sm font-medium">Penggajian Anda</p>
                                            </Button>
                                        </Link>
                                    </div>
                                    <Separator />
                                    <div className="w-full p-2">
                                        <Button className="w-full flex flex-row items-center bg-destructive hover:bg-red-700">
                                            <LogOut />
                                            <p className="text-sm">Keluar dari akun anda</p>
                                        </Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}