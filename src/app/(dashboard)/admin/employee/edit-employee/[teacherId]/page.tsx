"use client";

import { useState, useEffect } from "react";
import { getEmployeeById } from "@/lib/services/admin/employee/getEmployeeById";

import { useParams } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { EditEmployeeRequest } from "@/types/request";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { EditEmployeeDataForm } from "@/components/EditEmployeeDataForm/edit-employee-data-form";
import { Skeleton } from "@/components/ui/skeleton";


export default function AdminEditTeacherFormPage() {
    const [currentData, setCurrentData] = useState<EditEmployeeRequest | undefined>(undefined);
    const paramsId = useParams();
    const employeeId = String(paramsId?.teacherId);


    useEffect(() => {
        async function fetchEmployeeData() {

            try {
                const response = await getEmployeeById(employeeId);

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="gagal mengambil data pegawai" description={`${response.data.message || "kami gagal mengambil data pegawai."}`} />);
                    console.log(response)
                    return;
                }

                const data: EditEmployeeRequest = {
                    ...response.data.data,
                    date_of_birth: response.data.data.date_of_birth ? new Date(response.data.data.date_of_birth) : new Date()
                }

                setCurrentData(data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />);
                console.error(error);
            }
        }

        fetchEmployeeData();
    }, []);

    console.log(currentData)

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">
            <PageHeader />
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Edit <span className="text-blue-600">Data Pegawai</span>
                </h1>
                <p className="text-muted-foreground font-medium mt-1">
                    Isi formulir di bawah ini untuk mengedit data pegawai.
                </p>
            </div>
            {/* form here */}
            {currentData === undefined ? (
                <div className="w-full flex flex-col gap-6">
                    <Skeleton className="w-full h-[310px] bg-gray-300" />
                    <div className="w-full flex flex-row gap-6">
                        <Skeleton className="w-[390px] h-[512px] bg-gray-300" />
                        <div className="flex flex-col gap-6">
                            <Skeleton className="w-[851px] h-[181px] bg-gray-300" />
                            <Skeleton className="w-[851px] h-[260px] bg-gray-300" />
                        </div>
                    </div>
                </div>
            ) : (
                <EditEmployeeDataForm currentData={currentData} employeeId={employeeId} />
            )}
        </div>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Edit Employee",
                link: [
                    { title: "Dashboard", href: "/admin" },
                    { title: "Employee", href: "/admin" }
                ]
            }} />
        </div>
    )
}