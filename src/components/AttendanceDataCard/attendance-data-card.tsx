"use client";

import { useState, useEffect } from "react";
import { getAllAttendance } from "@/lib/service/getAllAtendance";

import { CardDescription, CardTitle } from "../ui/card";
import {
    DataCard,
    DataCardBody,
    DataCardFooter,
    DataCardHeader
} from "../DataCard/data-card";
import {
    CheckCircleIcon,
    ClipboardPasteIcon,
    FrownIcon
} from "lucide-react";
import { Spinner } from "../ui/spinner";

export function AttendanceDataCard() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [presentCount, setPresentCount] = useState<number>(0);
    const [absentCount, setAbsentCount] = useState<number>(0);
    const [onLeaveCount, setOnLeaveCount] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);
        async function getAttendanceCount() {
            try {
                const result = await getAllAttendance();
                // // const currentAttendance = result.data.filter((attendance) => {
                // //     const currentAttendance = new Date(attendance.attendance_date).toLocaleDateString("id-ID");
                // //     const currentDate = new Date().toLocaleDateString("id-ID");

                // //     if (currentAttendance === currentDate) {
                // //         return attendance;
                // //     };
                // // });

                setPresentCount(result.data?.data.filter((attendance) => attendance.attendance_status === "present").length || 0)
                setAbsentCount(result.data?.data.filter((attendance) => attendance.attendance_status === "absent").length || 0)
                setOnLeaveCount(result.data?.data.filter((attendance) => attendance.attendance_status === "on leave").length || 0)
            } catch (error) {
                console.error("get attendance count error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getAttendanceCount();
    }, [])

    return (
        <>
            {/* <present> attendance data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-green-100 flex flex-row items-center justify-center">
                        <CheckCircleIcon className="text-green-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">Present Today</CardTitle>
                        <CardDescription className="font-medium">
                            Menunjukkan guru yang hadir hari ini.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : presentCount}</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">{isLoading ? (<Spinner className="size-4" />) : `${onLeaveCount + absentCount} Guru Tersisa`}</p>
                </DataCardFooter>
            </DataCard>
            {/* <on leave> attendance data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-indigo-100 flex flex-row items-center justify-center">
                        <ClipboardPasteIcon className="text-indigo-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">On Leave</CardTitle>
                        <CardDescription className="font-medium">
                            Menunjukkan guru yang sedang cuti hari ini.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : onLeaveCount}</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">Approved leave</p>
                </DataCardFooter>
            </DataCard>
            {/* <absent> data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-red-100 flex flex-row items-center justify-center">
                        <FrownIcon className="text-red-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">Absent</CardTitle>
                        <CardDescription className="font-medium">
                            Menunjukkan guru yang tidak hadir hari ini.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : absentCount}</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">Tanpa informasi</p>
                </DataCardFooter>
            </DataCard>
        </>
    )
}