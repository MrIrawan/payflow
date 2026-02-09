"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { type ChartConfig } from "../ui/chart";
import { AttendanceChartProps } from "@/types/chart";
import { useEffect, useState } from "react";
import { getAllAttendanceChart } from "@/lib/service/admin/attendance/getAllAttendanceChart";
import { GetAllAttendanceChartData } from "@/types/response";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

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
} satisfies ChartConfig;

export function AttendanceChart() {
  const [attendanceChart, setAttendanceChart] = useState<GetAllAttendanceChartData[] | undefined>(undefined);

  useEffect(() => {
    async function attendanceToChart() {
      try {
        const response = await getAllAttendanceChart();

        if (!response?.isSuccess) {
          toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data grafik absensi" description={response?.message} />)
          return;
        }

        setAttendanceChart(response.data?.data.data);
      } catch (error) {
        toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data grafik absensi" description={`${error || "gagal mendapatkan data grafik absensi, ada sesuatu yang salah."}`} />)
      }
    }

    attendanceToChart();
  }, [])

  console.log(attendanceChart)

  return (
    <ChartContainer config={chartConfig} className="h-[500px] w-full">
      <BarChart accessibilityLayer data={attendanceChart}>
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
  );
}
