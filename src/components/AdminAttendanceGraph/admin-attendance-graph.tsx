"use client";

import { useState } from "react";

import { RawAttendanceData } from "@/types/chart";

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { BarChart3 } from "lucide-react";

const chartConfig = {
    present: {
        label: "Present",
        color: "#22c55e",
    },
    late: {
        label: "Late",
        color: "#eab308",
    },
    absent: {
        label: "Absent",
        color: "#ef4444",
    },
    permit: {
        label: "Permit",
        color: "#6366f1",
    }
} satisfies ChartConfig;

export function AdminAttendanceGraph({ data }: { data: RawAttendanceData[] }) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());

    return (
        <Card className="w-full shadow-sm border-gray-200 p-5 flex flex-col gap-3">
            <CardHeader className="bg-white p-0 flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0 w-full">
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <BarChart3 className="size-5 text-blue-600" />
                        Statistik Kehadiran Bulanan
                    </CardTitle>
                    <CardDescription>Tren absensi seluruh pegawai selama tahun {selectedYear}.</CardDescription>
                </div>

                {/* <div className="w-[250px]">
                    <SelectGroupComponent
                        label="Tahun Ajaran"
                        htmlFor="tahun_ajaran"
                        placeholder="Pilih Tahun"
                        items={yearOptions}
                        value={selectedYear}
                        onChange={(val: string) => setSelectedYear(val)}
                    />
                </div> */}
            </CardHeader>
            <Separator />
            <CardContent className="p-0 flex items-center justify-center h-[400px] bg-white pt-6">
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="present" fill="var(--color-present)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="absent" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="late" fill="var(--color-late)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="permit" fill="var(--color-permit)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}