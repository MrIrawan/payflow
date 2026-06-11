'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AttendanceBadge } from '@/components/AttendaceBadge/attendance-badge';
import { EmployeeDataCard } from '@/components/EmployeeDataCard/employee-data-card';
import { EmployeeAttendanceGraph } from '@/components/EmployeeAttendanceGraph/employee-attendance-graph';
import { GetEmployeeInfoData } from '@/types/response';
import { DataTable } from '@/components/DataTable/data-table';
import { Column } from '@/types/table';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb/dashboard-breadcrumb';
import { getEmployeeInfo } from '@/lib/services/employee/info/getEmployeeInfo';
import { toast } from 'sonner';
import { Toaster } from '@/components/Toaster/toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { setActiveCompany } from '@/utils/activeCompany';
import { AttendanceChartItem } from '@/types/types';
import { Attendance } from '@/types/base';

const attendanceSummaryData: AttendanceChartItem[] = [
    { month: "Januari", present: 20, late: 2, absent: 1, permit: 1 },
    { month: "Februari", present: 18, late: 3, absent: 2, permit: 1 },
    { month: "Maret", present: 22, late: 1, absent: 0, permit: 1 },
    { month: "April", present: 21, late: 1, absent: 1, permit: 1 },
    { month: "Mei", present: 19, late: 2, absent: 2, permit: 1 },
    { month: "Juni", present: 23, late: 0, absent: 0, permit: 1 },
    { month: "Juli", present: 20, late: 2, absent: 1, permit: 1 },
    { month: "Agustus", present: 17, late: 3, absent: 3, permit: 1 },
    { month: "September", present: 21, late: 1, absent: 1, permit: 1 },
    { month: "Oktober", present: 22, late: 0, absent: 1, permit: 1 },
    { month: "November", present: 20, late: 2, absent: 1, permit: 1 },
    { month: "Desember", present: 18, late: 1, absent: 2, permit: 3 },
]

const dummyAttendanceHistory: Attendance[] = [
    {
        attendance_id: "att-001-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-01T08:00:00Z",
        attendance_date: "2026-06-01",
        checkin_time: "08:02",
        checkout_time: "16:05",
        status: "present",
    },
    {
        attendance_id: "att-002-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-02T08:00:00Z",
        attendance_date: "2026-06-02",
        checkin_time: "08:35",
        checkout_time: "16:00",
        status: "late",
    },
    {
        attendance_id: "att-003-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-03T08:00:00Z",
        attendance_date: "2026-06-03",
        checkin_time: null,
        checkout_time: null,
        status: "absent",
    },
    {
        attendance_id: "att-004-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-04T08:00:00Z",
        attendance_date: "2026-06-04",
        checkin_time: "08:00",
        checkout_time: "16:10",
        status: "present",
    },
    {
        attendance_id: "att-005-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-05T08:00:00Z",
        attendance_date: "2026-06-05",
        checkin_time: null,
        checkout_time: null,
        status: "permit",
    },
    {
        attendance_id: "att-006-abcd-efgh",
        company_id: 1,
        employee_id: "emp-001-wxyz",
        created_at: "2026-06-06T08:00:00Z",
        attendance_date: "2026-06-06",
        checkin_time: "07:55",
        checkout_time: "16:00",
        status: "present",
    },
]

const attendanceHistoryColumn: Column<Attendance>[] = [
    {
        accessor: "attendance_date",
        header: "Tanggal",
        cell: (value) => {
            const date = new Date(String(value));
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        },
    },
    {
        accessor: "checkin_time",
        header: "Jam Masuk",
        cell: (value) => (value ? String(value) : "-"),
    },
    {
        accessor: "checkout_time",
        header: "Jam Keluar",
        cell: (value) => (value ? String(value) : "-"),
    },
    {
        accessor: "status",
        header: "Status",
        cell: (value) => <AttendanceBadge placeholder={String(value)} />,
    },
]

export default function UserDashboard() {
    const params = useParams()
    const router = useRouter()

    const companyId = Number(params.companyId)

    const [employeeInfo, setEmployeeInfo] = useState<GetEmployeeInfoData | undefined>(undefined)

    useEffect(() => {
        if (!companyId || isNaN(companyId)) {
            router.replace("/lobby")
            return
        }

        setActiveCompany(companyId)

        async function fetchEmployeeInfo() {
            const response = await getEmployeeInfo(companyId)

            if (response.success === false) {
                toast.custom(() => (
                    <Toaster
                        variant="error"
                        title="gagal mengambil info dashboard pegawai"
                        description={response.message || "gagal mengambil data info dashboard pegawai."}
                    />
                ))
                return
            }

            if (response.data !== null) {
                setEmployeeInfo(response.data)
            }
        }

        fetchEmployeeInfo()

    }, [companyId])

    console.log(employeeInfo)

    return (
        <div className="flex flex-col gap-4 p-5 w-full bg-white min-h-screen">

            {/* ── Section 1: Page Header ── */}
            <PageHeader />

            {/* ── Section 2: Welcome Section ── */}
            <WelcomeSection employeeInfo={employeeInfo} />

            {/* ── Section 2: Data Cards ── */}
            <EmployeeDataCard
                presentCount={Number(employeeInfo?.attendance?.length)}
                payslipsCount={5}
                salary={6550000}
            />

            {/* ── Section 3: Chart Absensi ── */}
            <div className="rounded-xl border border-blue-100 overflow-hidden">
                <EmployeeAttendanceGraph attendanceChartData={attendanceSummaryData} />
            </div>

            {/* ── Section 4: Tabel Riwayat Absensi ── */}
            <Card className="w-full flex flex-col gap-3 p-4 border border-blue-100 shadow-sm rounded-xl bg-white">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <CardTitle className="text-blue-900 text-base font-semibold">
                            Riwayat Absensi
                        </CardTitle>
                        <CardDescription className="text-blue-400 text-sm">
                            Riwayat absensi Anda bulan ini
                        </CardDescription>
                    </div>
                    <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {dummyAttendanceHistory.length} Catatan
                    </span>
                </div>
                <DataTable
                    columns={attendanceHistoryColumn}
                    data={employeeInfo?.attendance || []}
                    wrapper={false}
                />
            </Card>

        </div>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3 border-b border-blue-100 pb-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" />
            <DashboardBreadcrumb data={{ page: "Dashboard" }} />
        </div>
    )
}

function WelcomeSection({ employeeInfo }: { employeeInfo: GetEmployeeInfoData | undefined }) {
    const todayFormatted = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Employee Dashboard
            </span>
            {employeeInfo === undefined ? (
                <>
                    <Skeleton className="w-[320px] h-[32px] bg-blue-100 rounded-lg" />
                    <Skeleton className="w-[440px] h-[20px] bg-blue-100 rounded-lg mt-1" />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-blue-900">
                        Selamat Datang, {employeeInfo.profile.full_name}! 👋
                    </h1>
                    <p className="text-sm text-blue-500">
                        {todayFormatted}
                        {" • "}
                        Berikut ringkasan data penggajian dan absensi Anda
                    </p>
                </>
            )}
        </div>
    )
}