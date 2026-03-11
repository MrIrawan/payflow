'use client';

import { useState, useEffect } from 'react';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AttendanceBadge } from '@/components/AttendaceBadge/attendance-badge';
import { EmployeeDataCard } from '@/components/EmployeeDataCard/employee-data-card';
import { EmployeeAttendanceGraph } from '@/components/EmployeeAttendanceGraph/employee-attendance-graph';
import { GetAllAttendances, GetEmployeeInfoData } from '@/types/response';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/DataTable/data-table';
import { Column } from '@/types/table';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb/dashboard-breadcrumb';
import { getEmployeeInfo } from '@/lib/services/employee/info/getEmployeeInfo';
import { toast } from 'sonner';
import { Toaster } from '@/components/Toaster/toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { PayrollHistory } from '@/types/base';

// Sample data
const attendanceSummaryData = [
    { month: "Januari", present: 20, onLeave: 2, absent: 1 },
    { month: "Februari", present: 18, onLeave: 3, absent: 2 },
    { month: "Maret", present: 22, onLeave: 1, absent: 0 },
    { month: "April", present: 21, onLeave: 1, absent: 1 },
    { month: "Mei", present: 19, onLeave: 2, absent: 2 },
    { month: "Juni", present: 23, onLeave: 0, absent: 0 },
];

const attendanceHistoryColumn: Column<GetAllAttendances>[] = [
    { accessor: "teacher_name", header: "Nama Guru" },
    { accessor: "attendance_date", header: "Tanggal Absensi" },
    { accessor: "checkin_time", header: "Jam Masuk" },
    { accessor: "checkout_time", header: "Jam Keluar" },
    { accessor: "attendance_status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={value} /> },
];

const payrollHistoryColumn: Column<PayrollHistory>[] = [
    { accessor: "teacher_name", header: "Nama Guru" },
    { accessor: "period_month", header: "Periode Bulan" },
    { accessor: "period_year", header: "Periode Tahun" },
    { accessor: "teaching_salary", header: "Gaji Mengajar" },
    { accessor: "transport_salary", header: "Gaji Transport" },
    { accessor: "total_salary", header: "Total Gaji" },
];

export default function UserDashboard() {
    const [employeeInfo, setEmployeeInfo] = useState<GetEmployeeInfoData | undefined>(undefined);

    const currentDate = new Date();
    const presentCount = employeeInfo?.attendance.filter(attendance => attendance.attendance_status === "present").length || 0;
    const payslipsCount = employeeInfo?.payslips.length

    const currentMonthAttendance = employeeInfo?.attendance.filter(attendance => new Date(attendance.attendance_date).toLocaleDateString("id-ID", { month: "long" }) === currentDate.toLocaleDateString("id-ID", { month: "long" }));
    const totalSalary = Number(employeeInfo?.payslips.map((payslip) => payslip.total_salary));

    useEffect(() => {
        async function fetchEmployeeInfo() {
            try {
                const response = await getEmployeeInfo();

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="gagal mengambil info dashboard pegawai" description={`${response.data.message || "gagal mengambil data info dashboard pegawai."}`} />);
                    console.log(response)
                    return;
                }

                setEmployeeInfo(response.data.data);
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />);
                console.error(error);
            }
        }

        fetchEmployeeInfo();
    }, []);

    console.log(employeeInfo);
    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            <PageHeader />
            {/* Welcome Section */}
            <div className="flex flex-col gap-0.5">
                {employeeInfo === undefined ? (
                    <>
                        <Skeleton className='w-[441px] h-[35px] bg-gray-300 mb-2' />
                        <Skeleton className='w-[488px] h-[23px] bg-gray-300' />
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Selamat Datang, {employeeInfo.profile.full_name}! 👋
                        </h1>
                        <p className="text-gray-600">
                            Berikut adalah ringkasan data penggajian dan absensi Anda
                        </p>
                    </>
                )}
            </div>

            {/* Data Cards */}
            <EmployeeDataCard presentCount={presentCount} payslipsCount={payslipsCount ? payslipsCount : 0} salary={totalSalary} />

            {/* attendance and payslips tables */}
            <Card className='w-full flex flex-row gap-5 min-h-[500px] p-0 shadow-none ring-0 border-none bg-transparent'>
                <Card className='h-full w-full flex flex-col gap-3 p-4'>
                    <div className='w-full flex flex-col gap-1'>
                        <CardTitle>Attendance History</CardTitle>
                        <CardDescription>Riwayat Absensi anda bulan ini</CardDescription>
                    </div>
                    <div className='w-full h-full'>
                        <DataTable columns={attendanceHistoryColumn} data={currentMonthAttendance || []} wrapper={false} />
                    </div>
                </Card>
                <Card className='h-full w-5/6 flex flex-col gap-3 p-4'>
                    <div className='w-full flex flex-col gap-1'>
                        <CardTitle>Payslips History</CardTitle>
                        <CardDescription>Total hasil menerima slip gaji anda tahun ini.</CardDescription>
                    </div>
                    <div className='w-full h-full'>
                        <DataTable columns={payrollHistoryColumn} data={employeeInfo?.payslips || []} wrapper={false} />
                    </div>
                </Card>
            </Card>
        </div>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Dashboard"
            }} />
        </div>
    )
}