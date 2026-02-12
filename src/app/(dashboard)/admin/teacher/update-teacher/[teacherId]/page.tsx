"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UpdateTeacherForm } from "@/components/UpdateTeacherForm/update-teacher-form"
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { updateTeacherData } from "@/lib/service/admin/teacher/updateTeacherData";
import { getTeacherById } from "@/lib/service/admin/teacher/getTeacherById";
import { UpdateTeacherDataRequest } from "@/types/request";
import { GetAllTeachers } from "@/types/response";

export default function UpdateTeacherPage() {
    const [teacherData, setTeacherData] = useState<GetAllTeachers>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        async function getCurrentData() {
            setIsLoading(true);
            const { teacherId } = await params;

            try {
                const response = await getTeacherById(teacherId as string);

                if (!response.isSuccess) {
                    toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data guru" description={response.message} />)
                    return;
                }

            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="gagal update data user" description={`${error || "sesuatu telah terjadi yang membuat kami tidak bisa memproses permintaan anda."}`} />)
            } finally {
                setIsLoading(false);
            }
        }

        getCurrentData();
    }, [])

    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6 items-center">
                <PageHeader />
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle className="text-4xl font-bold text-black">Tambah Data Guru</CardTitle>
                        <CardDescription className="text-lg font-medium max-w-xl">Tambah data guru baru dengan lengkap dan cepat secara real-time dengan fitur manajemen data guru.</CardDescription>
                    </div>
                    <Separator />
                    {/* <UpdateTeacherForm currentData={currentData} /> */}
                </div>
            </div>
        </section>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Update data guru",
                link: [
                    {
                        title: "Dashboard",
                        href: "/admin"
                    }
                ]
            }} />
        </div>
    )
}