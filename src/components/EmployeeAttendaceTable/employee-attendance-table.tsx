"use client";

import { useState } from "react";

import { Card, CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

import { DataTable } from "../DataTable/data-table";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";

import { Column } from "@/types/table";
import { GetAllAttendance } from "@/types/response";

const employeeAttendanceColumn: Column<GetAllAttendance>[] = [
    { accessor: "attendance_date", header: "Tanggal Absensi" },
    { accessor: "checkin_time", header: "Jam Masuk" },
    { accessor: "checkout_time", header: "Jam Keluar" },
    { accessor: "teacher_name", header: "Nama Guru" },
    { accessor: "attendance_status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={value} /> },
];

export function EmployeeAttendanceTable({ slice = 0 }: { slice?: number }) {
    const [attendanceData, setAttendanceData] = useState<GetAllAttendance[]>();
    let tableColumn = employeeAttendanceColumn;

    if (slice < 0) {
        tableColumn.slice(0, slice);
    }
    return (
        <Card className='h-full w-full flex flex-col gap-3 p-4'>
            <div className='w-full flex flex-col gap-1'>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Total hasil absensi anda bulan ini.</CardDescription>
            </div>
            <Separator />
            <div className='w-full h-full'>
                <DataTable columns={tableColumn} data={attendanceData || []} wrapper={false} />
            </div>
        </Card>
    )
}