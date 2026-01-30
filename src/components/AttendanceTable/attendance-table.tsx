"use client";

import { useState, useEffect } from "react";
import { getAllAttendance } from "@/lib/service/getAllAtendance";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

import { DataTable } from "../DataTable/data-table";
import { GenderOptionsButton } from "../GenderOptionsButton/gender-options-button";
import { GetAllAttendance } from "@/types/response";
import { TableColumn } from "@/types/table";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";
import { StoreAttendanceDrawer } from "../StoreAttendanceDrawer/store-attendance-drawer";
import { AttendanceActionPopover } from "../AttendanceActionPopover/attendance-action-popover";

const tableColumn: TableColumn<GetAllAttendance>[] = [
    { header: "Nama Guru", accessor: "teacher_name" },
    { header: "Tanggal Absensi", accessor: "attendance_date", cell: (value) => new Date(value).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) },
    { header: "Waktu Check-in", accessor: "checkin_time" },
    { header: "Waktu Check-out", accessor: "checkout_time" },
    { header: "Status Absensi", accessor: "attendance_status", cell: (value) => <AttendanceBadge placeholder={value} /> },
]

export function AttendanceTable() {
    const [todayAttendance, setTodayAttendance] = useState<GetAllAttendance[] | undefined>([]);

    useEffect(() => {
        async function getTodayAttendance() {
            const result = await getAllAttendance();
            // const todayAttendance = result.data.filter((attendance) => {
            //     const currentDate = new Date().toLocaleDateString("id-ID");
            //     const currentAttendance = new Date(attendance.attendance_date).toLocaleDateString("id-ID");

            //     if (currentAttendance === currentDate) {
            //         return attendance;
            //     }
            // })

            setTodayAttendance(result.data?.data);
        }

        getTodayAttendance();
    }, [])

    // console.log(todayAttendance);
    return (
        <div className="w-full flex flex-col gap-6 p-3">
            <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                <div className="w-full flex flex-row gap-2.5 justify-between items-end">
                    <div className="flex flex-col gap-2.5">
                        <Label className="font-semibold">cari absensi guru</Label>
                        <Input
                            type="text"
                            placeholder="Cari berdasarkan nama guru..."
                            className="min-w-[300px] placeholder:font-regular placeholder:text-sm focus-visible:border-blue-600 focus-visible:ring-blue-100 focus-visible:ring-[3px]"
                        />
                    </div>
                    <StoreAttendanceDrawer />
                </div>
            </Card>
            <DataTable
                columns={tableColumn}
                data={todayAttendance || []}
                renderRowAction={(row) => (
                    <AttendanceActionPopover attendanceId={row.attendance_id} />
                )}
            />
        </div>
    )
}