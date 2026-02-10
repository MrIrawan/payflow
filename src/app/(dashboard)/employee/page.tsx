"use client";

import { useState, useEffect } from "react";
import { GuruDashboardResponse } from "@/types/response";
import { getUserProfile } from "@/lib/service/user/profile/getUserProfile";

import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { EmployeeAttendanceGraph } from "@/components/EmployeeAttendanceGraph/employee-attendance-graph";

import { EmployeeDataCard } from "@/components/EmployeeDataCard/employee-data-card"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircleIcon } from "lucide-react";

export default function EmployeePage() {
    const [data, setData] = useState<GuruDashboardResponse>();

    useEffect(() => {
        async function getProfile() {
            const response = await getUserProfile();

            if (!response?.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data profile." description={response?.message} />)
                return;
            }

            toast.custom(() => <Toaster variant="success" title={`selamat datang!`} description={`Selamat datang di PayFlow, ${response.data?.data.profile.full_name}! lihat apa yang terjadi di penggajian mu hari ini`} />);
            setData(response.data)
            console.log(response.data?.data)
        }

        getProfile();
    }, []);

    return (
        <>
            <section className="w-full p-6">
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <PageHeader />
                        <Separator />
                    </div>
                    <div className="flex flex-col gap-2 py-3">
                        <h2 className="text-4xl text-black font-bold capitalize">👋 selamat datang, {data?.data.profile.full_name || "user"}.</h2>
                        <h3 className="text-lg font-medium text-muted-foreground">lihat apa yang terjadi dalam penggajian anda hari ini.</h3>
                    </div>
                    <EmployeeDataCard employeeSummary={data?.data} />
                    <EmployeeAttendanceGraph attendanceChartData={data?.data.attendanceChart} />
                    <div className="w-full flex flex-row gap-6">
                        <Card className="w-[800px] shadow-none h-[500px] flex flex-col justify-between gap-3 p-4">
                            {/* card header */}
                            <CardHeader className="p-0">
                                <CardTitle>Riwayat Slip Gaji</CardTitle>
                                <CardDescription>Riwayat slip gaji yang anda terima berdasarkan data</CardDescription>
                            </CardHeader>
                            <Separator />
                            <div className="w-full h-full"></div>
                            <Separator />
                            <CardFooter className="w-full h-[50px] flex flex-row justify-center items-center gap-2.5">
                                <ArrowRightCircleIcon className="text-blue-800" />
                                <p className="text-base font-medium text-blue-800">Lihat selengkapnya</p>
                            </CardFooter>
                        </Card>
                        <Card className="w-full shadow-none h-[500px] flex flex-col justify-between gap-3 p-4">
                            {/* card header */}
                            <CardHeader className="p-0">
                                <CardTitle>Riwayat Absensi</CardTitle>
                                <CardDescription>Riwayat absensi milik anda berdasarkan data</CardDescription>
                            </CardHeader>
                            <Separator />
                            <div className="w-full h-full"></div>
                            <Separator />
                            <CardFooter className="w-full h-[50px] flex flex-row justify-center items-center gap-2.5">
                                <ArrowRightCircleIcon className="text-blue-800" />
                                <p className="text-base font-medium text-blue-800">Lihat selengkapnya</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{ page: "Dashboard" }} />
        </div>
    )
}