"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";
import { GetEmployeeProfileData } from "@/types/response";
import { logOutEmployee } from "@/lib/services/employee/auth/logOutEmployee";

import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { Spinner } from "../ui/spinner";

import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";

import { CalendarCheck2, ChevronsUpDown, HandCoins, HomeIcon, House, LogOut, ReceiptText, UserCircleIcon, Users, Wallet, WalletIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { EmployeeProfileDropDown } from "../EmployeeProfileDropDown/employee-profile-dropdown";

export function EmployeeLeftSidebar() {
    const [employeeProfile, setEmployeeProfile] = useState<GetEmployeeProfileData | undefined>(undefined);
    const params = useParams();

    const companyId = Number(params.companyId);

    useEffect(() => {
        async function fetchEmployeeProfile() {
            const response = await getEmployeeProfile(companyId);

            if (response.success === false) {
                console.error("gagal mengambil data profile pegawai:", response.message);
                return;
            }

            if (response.data !== null) {
                setEmployeeProfile(response.data);
            }
        };

        fetchEmployeeProfile();
    }, [companyId]);

    return (
        <Sidebar className="p-4">
            <SidebarHeader className="p-0 mb-4">
                <Card className="w-full h-fit rounded-md shadow-none border-none flex flex-row justify-start items-center gap-2 p-2 hover:bg-glass-secondary/5 duration-300 transition-colors">
                    <Avatar className="rounded-sm w-9 h-9">
                        <AvatarFallback className="rounded-sm">AV</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex flex-col">
                        <CardTitle className="text-sm font-semibold">PayFlow</CardTitle>
                        <CardDescription className="text-xs font-mono">Payroll Web App</CardDescription>
                    </div>
                    <ChevronsUpDown />
                </Card>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="h-full p-0">
                    {/* Sidebar items go here */}
                    <SidebarMenu className="gap-2">
                        <SidebarNavigationLink
                            href={`/employee/${companyId}`}
                            label="dashboard"
                            Icon={House}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href={`/employee/${companyId}/me`}
                            label="Profile anda"
                            Icon={Users}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href={`/employee/${companyId}/attendance`}
                            label="estimasi gaji"
                            Icon={HandCoins}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href={`/employee/${companyId}/attendance`}
                            label="riwayat penggajian"
                            Icon={ReceiptText}
                            activeBg
                        />
                        <SidebarNavigationLink
                            href={`/employee/${companyId}/attendance`}
                            label="absensi mandiri"
                            Icon={CalendarCheck2}
                            activeBg
                        />
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-0">
                {employeeProfile === undefined ? (
                    <Skeleton className="w-full h-[55px] bg-gray-300" />
                ) : (
                    <EmployeeProfileDropDown employeeProfile={employeeProfile} companyId={companyId} />
                )}
            </SidebarFooter>
        </Sidebar>
    )
}

function LogOutAlertDialog() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const employeeLogOut = async () => {
        setIsLoading(true);

        try {
            const response = await logOutEmployee();

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal melakukan logout" description={`${response.data.message || "kami gagal dalam memproses logout pada akun anda."}`} />);
                return;
            }

            toast.custom(() => <Toaster variant="success" title="anda berhasil keluar dari akun" description="silahkan masuk kembali ke akun anda." />);
            router.push("/signIn");
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {/* alert trigger */}
                <Button className="w-full flex flex-row items-center bg-destructive hover:bg-red-700">
                    <LogOut />
                    <p className="text-sm">Keluar dari akun anda</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Keluar dari akun anda?</AlertDialogTitle>
                    <AlertDialogDescription className="font-medium">
                        apakah anda yakin ingin keluar dari akun anda? ini akan membuat anda masuk ulang kedalam akun anda.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" className="w-full">
                        <p className="text-sm font-medium">Cancel</p>
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive" className="w-full" onClick={employeeLogOut}>
                        {isLoading ? (<Spinner className="size-3.5 text-white" />) : (<p className="text-sm font-medium">Logout</p>)}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}