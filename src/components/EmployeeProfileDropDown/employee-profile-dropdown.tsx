import Link from "next/link";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { CalendarCheck2, ChevronsUpDown, HomeIcon, ReceiptText, UserCircleIcon, WalletIcon } from "lucide-react";
import { GetEmployeeProfileData } from "@/types/response";

export function EmployeeProfileDropDown({ employeeProfile, companyId }: { employeeProfile: GetEmployeeProfileData, companyId: number }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Card className="w-full h-fit rounded-md shadow-none border-none flex flex-row justify-start items-center gap-2 p-2 hover:bg-glass-secondary/5 duration-300 transition-colors">
                    <Avatar className="rounded-sm w-9 h-9">
                        <AvatarFallback className="rounded-sm bg-glass-tertiary text-glass-surface">{employeeProfile.full_name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex flex-col">
                        <CardTitle className="text-sm font-semibold">{employeeProfile.full_name}</CardTitle>
                        <CardDescription className="text-xs font-mono">{employeeProfile.email}</CardDescription>
                    </div>
                    <ChevronsUpDown />
                </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="min-w-[250px] flex flex-col justify-between h-fit">
                <div className="w-full flex flex-row items-center gap-2 p-2">
                    <Avatar className="w-10 h-10 rounded-md">
                        <AvatarFallback className={`rounded-md text-white font-medium ${employeeProfile.gender === "male" ? "bg-blue-600" : "bg-pink-600"}`}>{employeeProfile.full_name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex flex-col">
                        <p className="text-sm font-medium text-black">{employeeProfile.full_name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{employeeProfile.email}</p>
                    </div>
                </div>
                <Separator />
                <div className="w-full flex flex-col gap-0 py-1">
                    <Link href={`/employee/${companyId}`}>
                        <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                            <HomeIcon />
                            <p className="text-sm font-medium">Dashboard</p>
                        </Button>
                    </Link>
                    <Link href={`/employee/${companyId}/me`}>
                        <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                            <UserCircleIcon />
                            <p className="text-sm font-medium">Profile Anda</p>
                        </Button>
                    </Link>
                    <Link href={`/employee/${companyId}/payroll/live`}>
                        <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                            <WalletIcon />
                            <p className="text-sm font-medium">Estimasi Gaji</p>
                        </Button>
                    </Link>
                    <Link href={`/employee/${companyId}/payroll/history`}>
                        <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                            <ReceiptText />
                            <p className="text-sm font-medium">Riwayat Gaji</p>
                        </Button>
                    </Link>
                    <Link href={`/employee/${companyId}/attendance`}>
                        <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                            <CalendarCheck2 />
                            <p className="text-sm font-medium">Absensi Mandiri</p>
                        </Button>
                    </Link>
                </div>
                <Separator />
                <div className="w-full p-2">
                    {/* <LogOutAlertDialog /> */}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}