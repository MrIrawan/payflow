"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getEmployeeAttendance } from "@/lib/services/employee/attendance/getEmployeeAttendance";
import { GetEmployeeAttendanceData } from "@/types/response";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    CheckCircle2,
    XCircle,
    Clock,
    CalendarDays,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import { AttendanceBadge } from "@/components/AttendaceBadge/attendance-badge";
import { StoreEmployeeAttendanceDrawer } from "@/components/StoreEmployeeAttendanceDrawer/store-employee-attendance-drawer";
import { getEmployeeInfo } from "@/lib/services/employee/info/getEmployeeInfo";

const tableColumn: Column<GetEmployeeAttendanceData>[] = [
    { accessor: "attendance_id", header: "ID Absen", cell: (value) => String(value).slice(0, 8) },
    { accessor: "attendance_date", header: "Tanggal Absensi", cell: (value) => new Date(String(value)).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) },
    { accessor: "checkin_time", header: "Jam masuk kantor" },
    { accessor: "checkout_time", header: "Jam keluar kantor" },
    { accessor: "status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={String(value)} /> }
];

export default function EmployeeAttendancePage() {
    const [currentEmployeeAttendance, setCurrentEmployeeAttendance] = useState<GetEmployeeAttendanceData[]>([]);
    const [employeeId, setEmployeeId] = useState<string>("");

    const params = useParams();
    const companyId = Number(params.companyId);

    useEffect(() => {
        async function fetchEmployeeAttendance() {
            const response = await getEmployeeAttendance();
            const employeeId = await getEmployeeInfo(companyId);

            if (employeeId.success === true && employeeId.data !== null) {
                setEmployeeId(employeeId.data.profile.employee_id);
            }

            if (response.success === false) {

                if (response.status === 404) {
                    toast.custom(() => <Toaster variant="info" title="berhasil mengambil data absensi" description="tidak ada data absensi untuk di tampilkan sekarang." />);
                    return;
                }

                toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data absensi" description="kami gagal dalam mengambil data absensi anda." />)
                return;
            }

            if (response.success === true && response.data !== null) {
                const currentAttendance = response.data.filter(attendance => {
                    const attendanceDate = new Date(attendance.attendance_date);
                    const now = new Date();

                    return attendanceDate.toDateString() === now.toDateString();
                });

                setCurrentEmployeeAttendance(currentAttendance);
            }
        }

        fetchEmployeeAttendance();
    }, []);

    const presentCount = currentEmployeeAttendance.filter(item => item.status === "present").length || 0;
    const lateCount = currentEmployeeAttendance.filter(item => item.status === "late").length || 0;
    const permitCount = currentEmployeeAttendance.filter(item => item.status === "permit").length || 0;
    const absentCount = currentEmployeeAttendance.filter(item => item.status === "absent").length || 0;

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
                    {/* <Button variant="outline" className="flex items-center gap-2 bg-white">
                        <Download className="size-4" />
                        Unduh Laporan
                    </Button> */}
                    <StoreEmployeeAttendanceDrawer employeeId={employeeId} />
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
                        {currentEmployeeAttendance === undefined ? (
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
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-red-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-red-100">
                            <XCircle className="size-5 text-red-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Tidak Hadir
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {currentEmployeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{absentCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
                                <p className="text-xs text-muted-foreground">
                                    Bulan {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                {/* absent data card */}
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-yellow-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-yellow-100">
                            <Clock className="size-5 text-yellow-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Ketelatan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {currentEmployeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{lateCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Bulan {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card className="w-full flex flex-col justify-between border-l-4 border-l-indigo-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-start justify-between p-0">
                        <span className="w-fit p-3 rounded-md bg-indigo-100">
                            <XCircle className="size-5 text-indigo-600" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Cuti
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 p-0">
                        {currentEmployeeAttendance === undefined ? (
                            <>
                                <Skeleton className="w-[70px] h-[35px] bg-gray-300" />
                                <Skeleton className="w-[120px] h-[15px] bg-gray-300" />
                            </>
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-gray-900">{permitCount} <span className="text-base font-normal text-muted-foreground">Hari</span></div>
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
                    <DataTable columns={tableColumn} data={currentEmployeeAttendance} wrapper={false} />
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