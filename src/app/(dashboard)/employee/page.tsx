'use client';

import React from 'react';
import {
    Calendar,
    ChevronRight,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AttendanceBadge } from '@/components/AttendaceBadge/attendance-badge';
import { EmployeeDataCard } from '@/components/EmployeeDataCard/employee-data-card';
import { EmployeeAttendanceGraph } from '@/components/EmployeeAttendanceGraph/employee-attendance-graph';
import { AttendanceChartItem, GetAllAttendance } from '@/types/response';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/DataTable/data-table';
import { Column } from '@/types/table';
import { EmployeeAttendanceTable } from '@/components/EmployeeAttendaceTable/employee-attendance-table';

// Sample data
const attendanceSummaryData: AttendanceChartItem[] = [
    { month: "Januari", present: 20, onLeave: 2, absent: 1 },
    { month: "Februari", present: 18, onLeave: 3, absent: 2 },
    { month: "Maret", present: 22, onLeave: 1, absent: 0 },
    { month: "April", present: 21, onLeave: 1, absent: 1 },
    { month: "Mei", present: 19, onLeave: 2, absent: 2 },
    { month: "Juni", present: 23, onLeave: 0, absent: 0 },
];

const attendanceHistoryColumn: Column<GetAllAttendance>[] = [
    { accessor: "attendance_date", header: "Tanggal Absensi" },
    { accessor: "checkin_time", header: "Jam Masuk" },
    { accessor: "checkout_time", header: "Jam Keluar" },
    { accessor: "teacher_name", header: "Nama Guru" },
    { accessor: "attendance_status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={value} /> },
];

const attendanceHistoryData: GetAllAttendance[] = [
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
    { attendance_date: "12 Februari 2026", checkin_time: "10:00", checkout_time: "17:00", attendance_id: "", teacher_name: "Syaiful", attendance_status: "present", created_at: "", teacher_id: "" },
];

const payslipHistory = [
    { month: 'Februari 2024', amount: 'Rp 4.500.000', date: '01 Feb 2024', status: 'Dibayar' },
    { month: 'Januari 2024', amount: 'Rp 4.500.000', date: '01 Jan 2024', status: 'Dibayar' },
    { month: 'Desember 2023', amount: 'Rp 4.500.000', date: '01 Des 2023', status: 'Dibayar' },
];

export default function UserDashboard() {
    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            {/* Welcome Section */}
            <div className="flex flex-col gap-0.5">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Selamat Datang, Ahmad! 👋
                </h1>
                <p className="text-gray-600">
                    Berikut adalah ringkasan data penggajian dan absensi Anda
                </p>
            </div>

            {/* Data Cards */}
            <EmployeeDataCard />

            {/* attendance summary chart */}
            <EmployeeAttendanceGraph attendanceChartData={attendanceSummaryData} />

            {/* attendance and payslips tables */}
            <Card className='w-full flex flex-row gap-5 min-h-[500px] p-0 shadow-none ring-0 border-none bg-transparent'>
                <EmployeeAttendanceTable />
                <Card className='h-full w-5/6 flex flex-col gap-3 p-4'>
                    <div className='w-full flex flex-col gap-1'>
                        <CardTitle>Payslips History</CardTitle>
                        <CardDescription>Total hasil menerima slip gaji anda tahun ini.</CardDescription>
                    </div>
                    <Separator />
                    <div className='w-full h-full'>
                        {/* <DataTable columns={attendanceHistoryColumn} data={ } /> */}
                    </div>
                </Card>
            </Card>
        </div>
    );
}