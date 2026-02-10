"use client";

import { useState } from "react";
import { AttendanceChartItem } from "@/types/response";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card } from "../ui/card";
import { ChartHeader } from "../ChartHeader/chart-header";

const chartConfig = {
    present: {
        label: "Present",
        color: "#16a34a",
    },
    absent: {
        label: "Absent",
        color: "#dc2626",
    },
    onLeave: {
        label: "On Leave",
        color: "#4f46e5",
    },
} satisfies ChartConfig

export function EmployeeAttendanceGraph({ attendanceChartData }: {
    attendanceChartData: AttendanceChartItem[] | undefined;
}) {
    const [attendanceData, setAttendanceData] = useState<AttendanceChartItem[] | undefined>(attendanceChartData || undefined);

    return (
        <Card className="shadow-none">
            <ChartHeader />
            <ChartContainer config={chartConfig} className="h-[500px] w-full">
                <BarChart accessibilityLayer data={attendanceData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="present" fill="var(--color-present)" radius={4} />
                    <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
                    <Bar dataKey="onLeave" fill="var(--color-onLeave)" radius={4} />
                </BarChart>
            </ChartContainer>
        </Card>
    )
}