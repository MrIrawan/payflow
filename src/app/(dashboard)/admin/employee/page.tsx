"use client";

import { useState, useEffect } from "react";
import { GetAllEmployeesData } from "@/types/response";
import { getAllEmployees } from "@/lib/services/admin/employee/getAllEmployees";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Users,
    Plus,
    Filter,
    UserCheck,
    GraduationCap,
    Briefcase
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { InfoBadge, jobBadgeMap, subjectBadgeMap } from "@/components/InfoBadge/info-badge";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";

const employeesTableColumn: Column<GetAllEmployeesData>[] = [
    { accessor: "full_name", header: "Nama Pegawai" },
    { accessor: "email_address", header: "Alamat Email" },
    { accessor: "company", header: "Perusahaan" },
    { accessor: "gender", header: "Jenis Kelamin", cell: (value) => <GenderBadge placeholder={value} /> },
    {
        accessor: "date_of_birth", header: "Tanggal Lahir", cell: (value) => new Date(value).toLocaleDateString("id-ID", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    },
    {
        accessor: "job_title", header: "Jabatan", cell: (value: string[]) => value ? (
            <div className="w-[200px] flex flex-row gap-1.5 flex-wrap">
                {value.map((job, index) => (
                    <InfoBadge key={index} label={job} className={jobBadgeMap[job].className} icon={jobBadgeMap[job].icon} />
                ))}
            </div>
        ) : "-"
    },
    {
        accessor: "subject_name", header: "Mata Pelajaran", cell: (value: string[]) => value ? (
            <div className="w-[250px] flex flex-row gap-1.5 flex-wrap">
                {value.map((sub, index) => (
                    <InfoBadge key={index} label={sub} className={subjectBadgeMap[sub].className} icon={subjectBadgeMap[sub].icon} />
                ))}
            </div>
        ) : "-"
    }
]

export default function AdminTeacherDataPage() {
    const [employeesData, setEmployeesData] = useState<GetAllEmployeesData[] | undefined>(undefined);

    const isTeacher = employeesData?.filter(teacher => teacher.job_title?.includes("Guru")).length || 0;
    const isStaff = employeesData?.map((teacher) => teacher.job_title?.length === 2);
    console.log(isStaff)

    useEffect(() => {
        async function fetchAllEmployees() {
            try {
                const response = await getAllEmployees();

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="gagal mengambil semua data pegawai" description={`${response.data.message || "kami gagal mengambil semua data pegawai."}`} />);
                    console.log(response)
                    return;
                }

                setEmployeesData(response.data.data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />);
                console.error(error);
            }
        }

        fetchAllEmployees();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50">
            <PageHeader />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Data <span className="text-blue-600">Pegawai</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Kelola informasi profil, jabatan, dan kredensial seluruh guru & staff.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 transition-all">
                    <Plus className="size-4" />
                    Tambah Pegawai Baru
                </Button>
            </div>
            <div className="flex flex-row item-center justify-between gap-4 w-full">
                {/* Card 1 */}
                <Card className="w-full border-l-4 border-l-blue-600 shadow-sm flex flex-col justify-between p-4 h-[160px]">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Total Pegawai</CardTitle>
                        <Users className="size-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-1">
                        {employeesData === undefined ? (
                            <>
                                <Skeleton className="w-[40px] h-[36px] bg-gray-300" />
                                <Skeleton className="w-[161px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{employeesData.length}</div>
                                <p className="text-sm font-medium text-muted-foreground">Seluruh guru & staff aktif</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <Card className="w-full border-l-4 border-l-green-500 shadow-sm flex flex-col justify-between p-4 h-[160px]">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Guru Pengajar</CardTitle>
                        <GraduationCap className="size-5 text-green-500" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-1">
                        {employeesData === undefined ? (
                            <>
                                <Skeleton className="w-[40px] h-[36px] bg-gray-300" />
                                <Skeleton className="w-[161px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{isTeacher}</div>
                                <p className="text-sm font-medium text-muted-foreground">Memiliki jam pelajaran</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="w-full border-l-4 border-l-amber-500 shadow-sm flex flex-col justify-between p-4 h-[160px]">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Staff & Manajemen</CardTitle>
                        <Briefcase className="size-5 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-1">
                        {employeesData === undefined ? (
                            <>
                                <Skeleton className="w-[40px] h-[36px] bg-gray-300" />
                                <Skeleton className="w-[161px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">13</div>
                                <p className="text-sm font-medium text-muted-foreground">TU, Kepsek, Kaprok, dll</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Card 4 */}
                <Card className="w-full border-l-4 border-l-indigo-500 shadow-sm flex flex-col justify-between p-4 h-[160px]">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Terverifikasi</CardTitle>
                        <UserCheck className="size-5 text-indigo-500" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-1">
                        {employeesData === undefined ? (
                            <>
                                <Skeleton className="w-[40px] h-[36px] bg-gray-300" />
                                <Skeleton className="w-[161px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{employeesData.length}</div>
                                <p className="text-sm font-medium text-muted-foreground">Akun PayFlow aktif</p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Card className="w-full shadow-sm border-gray-200 flex flex-col gap-6 p-4">
                <CardHeader className="w-full p-0 bg-white flex flex-col gap-6">
                    <div className="flex flex-col gap-0">
                        <CardTitle className="text-xl text-gray-800 font-semibold">Daftar Pegawai</CardTitle>
                        <CardDescription>Daftar lengkap pegawai beserta role dan statusnya.</CardDescription>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Search Bar */}
                        <div className="w-full md:max-w-sm">
                            <Input
                                placeholder="Cari nama pegawai atau email..."
                                className="focus-visible:ring-blue-600 w-full"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-4 w-2/5">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                <Filter className="size-4" /> Filter:
                            </div>
                            <Select defaultValue="semua">
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Jabatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">Semua Jabatan</SelectItem>
                                    <SelectItem value="guru">Guru</SelectItem>
                                    <SelectItem value="kaprok">Kepala Program</SelectItem>
                                    <SelectItem value="tu">Tata Usaha</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="semua">
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">Semua Gender</SelectItem>
                                    <SelectItem value="male">Laki-laki</SelectItem>
                                    <SelectItem value="female">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable columns={employeesTableColumn} data={employeesData || []} wrapper={false} />
                </CardContent>
            </Card>
        </div>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Data Pegawai",
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