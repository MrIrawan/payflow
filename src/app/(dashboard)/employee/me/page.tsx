"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/service/user/profile/getUserProfile";
import { DashboardData } from "@/types/response";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";

export default function EmployeePage() {
    const [data, setData] = useState<DashboardData | undefined>(undefined);

    useEffect(() => {
        async function fetchUserProfile() {
            const response = await getUserProfile();

            if (!response.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal mendapatkan profile kamu." description={response.message} />);
                return;
            }

            setData(response.data?.data);
        }

        fetchUserProfile();
    }, []);

    return (
        <>
            <section className="w-full p-6">
                <div className="w-full flex flex-col gap-6">
                    {/* page header here */}
                    <div className="flex flex-col gap-3">
                        <PageHeader />
                        <Separator />
                    </div>
                    {/* content area */}
                    <Card className="w-full h-[300px] shadow-none flex flex-col items-center gap-3">
                        <Avatar className={`w-32 h-32 ${data?.profile.gender ? (data?.profile.gender === "male" ? "ring-blue-600" : "ring-pink-600") : "ring-gray-600"} ring-[2px]`}>
                            <AvatarFallback className={`${data?.profile.gender ? (data?.profile.gender === "male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600") : "bg-gray-50 text-gray-600"} text-4xl font-semibold uppercase`}>
                                {data?.profile.full_name.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-4xl font-semibold text-black capitalize">{data?.profile.full_name || "User Full Name"}</h2>
                        <span className="w-fit flex flex-row gap-3">
                            <span className="w-fit h-fit px-3 py-1 rounded-xl bg-blue-50 ring-blue-600 ring-1">
                                <p className="text-xs font-medium text-blue-600">hanjayy</p>
                            </span>
                            <span className="w-fit h-fit px-3 py-1 rounded-xl bg-blue-50 ring-blue-600 ring-1">
                                <p className="text-xs font-medium text-blue-600">hanjayy</p>
                            </span>
                        </span>
                        <span className="w-fit flex flex-row gap-3">
                            <span className="w-fit h-fit px-3 py-1 rounded-xl bg-blue-50 ring-blue-600 ring-1">
                                <p className="text-xs font-medium text-blue-600">hanjayy</p>
                            </span>
                            <span className="w-fit h-fit px-3 py-1 rounded-xl bg-blue-50 ring-blue-600 ring-1">
                                <p className="text-xs font-medium text-blue-600">hanjayy</p>
                            </span>
                            <span className="w-fit h-fit px-3 py-1 rounded-xl bg-blue-50 ring-blue-600 ring-1">
                                <p className="text-xs font-medium text-blue-600">hanjayy</p>
                            </span>
                        </span>
                    </Card>
                    <div className="w-full flex flex-row gap-6">
                        <Card className="w-full min-h-[300px] shadow-none flex flex-col gap-2.5 p-3">
                            <h2 className="text-xl font-semibold text-black">Detail Profile</h2>
                            <Separator />
                            <div className="w-full h-full">
                                <ul className="w-full flex flex-col gap-3">
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Nama Lengkap</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.full_name || "Tidak diketahui"}</p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Tanggal Lahir</h3>
                                        <p className="text-lg font-semibold text-black">
                                            {new Date(data?.profile.date_of_birth || "").toLocaleDateString("id-ID", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            }) || "Tidak diketahui"}
                                        </p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Jenis Kelamin</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.gender ? (data.profile.gender === "male" ? (<GenderBadge placeholder={"male"} size="sm" />) : (<GenderBadge placeholder={"female"} size="sm" />)) : "Tidak diketahui"}</p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Alamat Rumah</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.home_address || "Tidak diketahui"}</p>
                                    </li>
                                </ul>
                            </div>
                        </Card>
                        <Card className="w-full min-h-[300px] shadow-none flex flex-col gap-2.5 p-3">
                            <h2 className="text-xl font-semibold text-black">Detail Pekerjaan</h2>
                            <Separator />
                            <div className="w-full h-full">
                                <ul className="w-full flex flex-col gap-3">
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Nama Jabatan</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.job_title || "Tidak diketahui"}</p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Nama Perusahaan</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.company}</p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Mata Pelajaran</h3>
                                        <p className="text-lg font-semibold text-black">{data?.profile.subject_name || "Tidak diketahui"}</p>
                                    </li>
                                    <li className="flex flex-col gap-0">
                                        <h3 className="text-sm font-semibold text-muted-foreground">Tanggal Bergabung</h3>
                                        <p className="text-lg font-semibold text-black">
                                            {data?.profile.join_date.split("T")[0] || "Tidak diketahui"}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                    <Card className="w-full h-[130px] shadow-none bg-blue-50 ring-blue-600 ring-2 flex flex-col justify-between p-3">
                        <h2 className="text-2xl font-bold text-black">Quick Overview</h2>
                        <div className="w-full grid grid-cols-4 gap-3">
                            <div className="flex flex-col gap-0">
                                <h3 className="text-base font-medium text-muted-foreground">Nama Perusahaan</h3>
                                <p className="text-black text-lg font-semibold">{data?.profile.company || "Tidak diketahui"}</p>
                            </div>
                            <div className="flex flex-col gap-0">
                                <h3 className="text-base font-medium text-muted-foreground">Alamat Email</h3>
                                <p className="text-black text-lg font-semibold">{data?.profile.email_address || "Tidak diketahui"}</p>
                            </div>
                            <div className="flex flex-col gap-0">
                                <h3 className="text-base font-medium text-muted-foreground">Tanggal Bergabung</h3>
                                <p className="text-black text-lg font-semibold">{data?.profile.join_date.split("T")[0] || "Tidak diketahui"}</p>
                            </div>
                            <div className="flex flex-col gap-0">
                                <h3 className="text-base font-medium text-muted-foreground">Nama Jabatan</h3>
                                <p className="text-black text-lg font-semibold">{data?.profile.job_title || "Tidak diketahui"}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Your Profile",
                link: [
                    {
                        title: "Dashboard",
                        href: "/employee"
                    }
                ]
            }} />
        </div>
    )
}