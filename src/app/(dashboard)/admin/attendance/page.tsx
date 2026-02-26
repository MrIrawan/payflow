"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    CalendarDays,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";

import { AttendanceTable } from "@/components/AttendanceTable/attendance-table";
import { useEffect, useState } from "react";
import { GetAllAttendances } from "@/types/response";
import { getAllAttendances } from "@/lib/services/admin/attendance/getAllAttendance";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAttendancePage() {
    const [attendanceData, setAttendanceData] = useState<GetAllAttendances[] | undefined>(undefined);
    const currentDate = new Date();

    // by month variable
    const currentMonthAttendances = attendanceData?.filter(attendance => new Date(attendance.attendance_date).toLocaleDateString("id-ID", { month: "long" }) === currentDate.toLocaleDateString("id-ID", { month: "long" }))
    const presentCount = currentMonthAttendances?.filter(attendance => attendance.attendance_status === "present").length || 0;
    const absentCount = currentMonthAttendances?.filter(attendance => attendance.attendance_status === "absent").length || 0;
    const onLeaveCount = currentMonthAttendances?.filter(attendance => attendance.attendance_status === "on leave").length || 0;

    // by day variable
    const currentDayAttendances = attendanceData?.filter(attendance => new Date(attendance.attendance_date).toLocaleDateString("id-ID", { day: "numeric", month: "long" }) === currentDate.toLocaleDateString("id-ID", { day: "numeric", month: "long" }))

    useEffect(() => {
        async function fetchAllAttendances() {
            try {
                const response = await getAllAttendances();

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data absensi" description="kami gagal dalam mengambil data absensi." />)
                    return;
                }

                setAttendanceData(response.data.data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
            }
        }

        fetchAllAttendances();
    }, []);
    return (
        <div className="flex flex-col w-full gap-6 p-6 bg-white">
            <PageHeader />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Data <span className="text-blue-600">Absensi</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Pantau kehadiran, keterlambatan, dan riwayat absen seluruh pegawai.
                    </p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 transition-all">
                    <Download className="size-4" />
                    Export Rekap Absensi
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Card className="w-full p-4 h-[200px] flex flex-col justify-between border-l-4 border-l-green-600 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Hadir Bulan Ini</CardTitle>
                        <CheckCircle2 className="size-5 text-green-600" />
                    </CardHeader>
                    <CardContent className="flex flex-col p-0 gap-1">
                        {attendanceData === undefined ? (
                            <>
                                <Skeleton className="w-[112px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[150px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{presentCount} <span className="text-base font-normal text-muted-foreground capitalize">Pegawai</span></div>
                                <p className="text-sm text-green-600 font-medium">
                                    +2 dari hari kemarin
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card className="w-full p-4 h-[200px] flex flex-col justify-between border-l-4 border-l-indigo-600 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sedang Izin / Sakit Bulan Ini</CardTitle>
                        <Clock className="size-5 text-indigo-600" />
                    </CardHeader>
                    <CardContent className="flex flex-col p-0 gap-1">
                        {attendanceData === undefined ? (
                            <>
                                <Skeleton className="w-[112px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[150px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{onLeaveCount} <span className="text-base font-normal text-muted-foreground capitalize">Pegawai</span></div>
                                <p className="text-sm font-medium text-indigo-600">
                                    Surat keterangan terlampir
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card className="w-full p-4 h-[200px] flex flex-col justify-between border-l-4 border-l-red-600 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between p-0 gap-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Alpa Bulan Ini</CardTitle>
                        <XCircle className="size-5 text-red-600" />
                    </CardHeader>
                    <CardContent className="flex flex-col p-0 gap-1">
                        {attendanceData === undefined ? (
                            <>
                                <Skeleton className="w-[112px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[150px] h-[20px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{absentCount} <span className="text-base font-normal text-muted-foreground capitalize">Pegawai</span></div>
                                <p className="text-sm text-red-600 font-medium">
                                    Tanpa keterangan hari ini
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col w-full shadow-sm border-gray-200 gap-6 p-4">
                <CardHeader className="flex flex-col gap-1 p-0">
                    <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                        <CalendarDays className="size-5 text-blue-600" />
                        Log Absensi Harian
                    </CardTitle>
                    <CardDescription>Detail waktu clock-in dan clock-out pegawai secara real-time hari ini.</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <AttendanceTable attendanceData={currentDayAttendances || []} />
                </CardContent>
            </Card>

            <Card className="flex flex-col w-full shadow-sm border-gray-200 gap-6 p-4">
                <CardHeader className="flex flex-col gap-1 p-0">
                    <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                        <CalendarDays className="size-5 text-blue-600" />
                        Log Absensi Bulanan
                    </CardTitle>
                    <CardDescription>Detail waktu clock-in dan clock-out pegawai secara real-time bulan ini.</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <AttendanceTable attendanceData={currentMonthAttendances || []} />
                </CardContent>
            </Card>

            <Card className="flex flex-col w-full shadow-sm border-gray-200 gap-6 p-4">
                <CardHeader className="flex flex-col gap-1 p-0">
                    <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                        <CalendarDays className="size-5 text-blue-600" />
                        Semua Log Absensi
                    </CardTitle>
                    <CardDescription>Semua Detail waktu clock-in dan clock-out pegawai secara real-time.</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <AttendanceTable attendanceData={attendanceData || []} />
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
                    { title: "Dashboard", href: "/admin" }
                ]
            }} />
        </div>
    )
}