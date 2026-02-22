"use client";

import { useState, useEffect } from "react";
import { getEmployeeAttendance } from "@/lib/services/employee/attendance/getEmployeeAttendance";
import { GetEmployeeAttendanceData } from "@/types/response";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    XCircle,
    Clock,
    CalendarDays,
    MapPin,
    Download
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import { AttendanceBadge } from "@/components/AttendaceBadge/attendance-badge";

const tableColumn: Column<GetEmployeeAttendanceData>[] = [
    { accessor: "attendance_id", header: "ID Absen", cell: (value) => value.slice(0, 8) },
    { accessor: "teacher_name", header: "Nama Guru" },
    { accessor: "attendance_date", header: "Tanggal Absensi", cell: (value) => new Date(value).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) },
    { accessor: "checkin_time", header: "Jam masuk kantor" },
    { accessor: "checkout_time", header: "Jam keluar kantor" },
    { accessor: "attendance_status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={value} /> }
];

export default function EmployeeAttendancePage() {
    const [employeeAttendance, setEmployeeAttendance] = useState<GetEmployeeAttendanceData[]>([]);

    useEffect(() => {
        async function fetchEmployeeAttendance() {
            try {
                const response = await getEmployeeAttendance();

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data absensi" description="kami gagal dalam mengambil data absensi anda." />)
                    return;
                }

                setEmployeeAttendance(response.data.data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
            }
        }

        fetchEmployeeAttendance();
    }, []);

    const presentCount = employeeAttendance.filter(item => item.attendance_status === "present").length || 0;
    const onLeaveCount = employeeAttendance.filter(item => item.attendance_status === "on leave").length || 0;
    const absentCount = employeeAttendance.filter(item => item.attendance_status === "absent").length || 0;

    return (
        // CONTAINER UTAMA: Menggunakan flex-col dan memastikan lebar penuh
        <div className="flex flex-col w-full h-full gap-6 p-4 sm:p-6 bg-gray-50/50 min-h-screen">
            <PageHeader />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        <span className="text-blue-600">Absensi</span> Mandiri
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Absensi mandiri dan rekapitulasi kehadiran Anda untuk bulan berjalan.
                    </p>
                </div>

                {/* Tombol aksi (Opsional: untuk export atau absen manual) */}
                <div className="flex flex-row gap-2">
                    <Button variant="outline" className="flex items-center gap-2 bg-white">
                        <Download className="size-4" />
                        Unduh Laporan
                    </Button>
                    <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                        <MapPin className="size-4" />
                        Absen Sekarang
                    </Button>
                </div>
            </div>
            {/* attendance data card */}
            <div className="flex flex-col lg:flex-row w-full gap-4">
                {/* present data card */}
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-green-600 shadow-sm p-4 h-[170px]">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-green-100">
                            <CheckCircle2 className="size-5 text-green-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Hadir
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {employeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{presentCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
                                <p className="text-xs text-muted-foreground">
                                    Bulan {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                {/* on leave data card */}
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-indigo-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-indigo-100">
                            <Clock className="size-5 text-indigo-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Izin / Sakit
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {employeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{onLeaveCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
                                <p className="text-xs text-muted-foreground">
                                    Bulan {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                {/* absent data card */}
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-red-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-red-100">
                            <XCircle className="size-5 text-red-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Alpa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {employeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{absentCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Bulan {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            {/* attendance data table */}
            <Card className="flex flex-col gap-4 w-full shadow-sm border-gray-200 p-4">
                <CardHeader className="bg-white p-0 gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <CalendarDays className="size-5 text-blue-600" />
                        Riwayat Absensi Bulan Ini
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {/* data table here */}
                    <DataTable columns={tableColumn} data={employeeAttendance} wrapper={false} />
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
                page: "Attendance",
                link: [
                    { title: "Dashboard", href: "/employee" }
                ]
            }} />
        </div>
    )
}