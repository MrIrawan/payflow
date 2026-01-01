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

const tableColumn: TableColumn<GetAllAttendance>[] = [
    { header: "Teacher Name", accessor: "teacher_name" },
    { header: "Attendance Date", accessor: "attendance_date" },
    { header: "Check-in Time", accessor: "checkin_time" },
    { header: "Check-out Time", accessor: "checkout_time" },
    { header: "Attendance Status", accessor: "attendance_status", cell: (value) => <AttendanceBadge placeholder={value} variant={value} /> },
]

export function AttendanceTable() {
    const [todayAttendance, setTodayAttendance] = useState<GetAllAttendance[]>([]);

    useEffect(() => {
        async function getTodayAttendance() {
            const result = await getAllAttendance();
            const todayAttendance = result.data.filter((attendance) => {
                const currentDate = new Date().toLocaleDateString("id-ID");
                const currentAttendance = new Date(attendance.attendance_date).toLocaleDateString("id-ID");

                if (currentAttendance === currentDate) {
                    return attendance;
                }
            })

            setTodayAttendance(todayAttendance);
        }

        getTodayAttendance();
    }, [])

    // console.log(todayAttendance);
    return (
        <div className="w-full flex flex-col gap-6 p-3">
            <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                <div className="flex flex-row gap-2.5 items-end">
                    <div className="flex flex-col gap-2.5">
                        <Label className="font-semibold">search teacher attendance</Label>
                        <Input
                            type="text"
                            placeholder="teacher neame here..."
                            className="min-w-[300px]"
                        />
                    </div>
                    <GenderOptionsButton />
                </div>
            </Card>
            <DataTable
                columns={tableColumn}
                data={todayAttendance}
            />
        </div>
    )
}