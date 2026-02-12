"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Gunakan useParams untuk client component

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UpdateTeacherForm } from "@/components/UpdateTeacherForm/update-teacher-form";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { getTeacherById } from "@/lib/service/admin/teacher/getTeacherById";
import { UpdateTeacherDataRequest } from "@/types/request";
import { Spinner } from "@/components/ui/spinner"; // Pastikan punya komponen ini atau ganti div biasa

export default function UpdateTeacherPage() {
    const [teacherData, setTeacherData] = useState<UpdateTeacherDataRequest | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useParams mengembalikan object langsung, tidak perlu di-await di Next.js 14 ke bawah (tapi aman di 15)
    const params = useParams();

    useEffect(() => {
        async function getCurrentData() {
            const id = params?.teacherId as string;

            if (!id) {
                toast.error("ID tidak ditemukan");
                setIsLoading(false);
                return;
            }

            try {
                const response = await getTeacherById(id);

                if (!response.isSuccess) {
                    toast.error(response.message);
                    return;
                }

                // PERUBAHAN UTAMA DI SINI: Tambahkan [0]
                const rawData = response.data?.data?.[0];

                if (!rawData) throw new Error("Data tidak ditemukan");

                const formattedData: UpdateTeacherDataRequest = {
                    guru_id: id,
                    full_name: rawData.full_name ?? "",
                    company: rawData.company ?? "",
                    gender: rawData.gender as "female" | "male",
                    home_address: rawData.home_address ?? "",
                    job_title: rawData.job_title ?? [],
                    subject_name: rawData.subject_name ?? [],
                    date_of_birth: rawData.date_of_birth ? new Date(rawData.date_of_birth) : new Date(),
                    join_date: rawData.join_date ? new Date(rawData.join_date) : new Date(),
                };

                setTeacherData(formattedData);

            } catch (error: any) {
                console.error(error);
                toast.error("Gagal memuat data");
            } finally {
                setIsLoading(false);
            }
        }

        getCurrentData();
    }, [params]);

    // FIX UTAMA: Tampilkan Loading sebelum cek teacherData
    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner className="size-10 text-blue-600" />
            </div>
        );
    }

    // Tampilkan Error/Empty HANYA jika loading selesai & data tetap kosong
    if (!teacherData) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center gap-2 text-gray-500">
                <p className="font-semibold">Data guru tidak ditemukan.</p>
                <p className="text-sm">Pastikan ID guru di URL sudah benar.</p>
            </div>
        );
    }

    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6 items-center">
                <PageHeader />
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle className="text-4xl font-bold text-black">Edit Data Guru</CardTitle>
                        <CardDescription className="text-lg font-medium max-w-xl">
                            Perbarui informasi guru secara real-time.
                        </CardDescription>
                    </div>
                    <Separator />
                    {/* Kirim data ke form */}
                    <UpdateTeacherForm currentData={teacherData} />
                </div>
            </div>
        </section>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Update data guru",
                link: [
                    { title: "Dashboard", href: "/admin" }
                ]
            }} />
        </div>
    );
}