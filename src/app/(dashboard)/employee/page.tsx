"use client";

import { useState, useEffect } from "react";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { EmployeeAttendanceGraph } from "@/components/EmployeeAttendanceGraph/employee-attendance-graph"
import { EmployeeDataCard } from "@/components/EmployeeDataCard/employee-data-card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getUserProfile } from "@/lib/service/user/profile/getUserProfile";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

export default function EmployeePage() {
    const [data, setData] = useState();

    useEffect(() => {
        async function getProfile() {
            const response = await getUserProfile();

            if (!response?.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data profile." description={response?.message} />)
                console.log(response)
                return;
            }

            toast.custom(() => <Toaster variant="success" title={`selamat datang!`} description={response.message} />);
            console.log(response);
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
                        <h2 className="text-4xl text-black font-bold capitalize">👋 selamat datang, farrel Irawan.</h2>
                        <h3 className="text-lg font-medium text-muted-foreground">lihat apa yang terjadi dalam penggajian anda hari ini.</h3>
                    </div>
                    <EmployeeDataCard />
                    <EmployeeAttendanceGraph />
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