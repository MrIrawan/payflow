"use client";

import Image from "next/image";
import EmptyStateAttendanceChart from "../../../public/images/empty-state-attendance-chart.svg";

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
import { Card, CardDescription, CardTitle } from "../ui/card";
import { ChartHeader } from "../ChartHeader/chart-header";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function attendanceToChart() {
      setIsLoading(true);
      try {
        const response = await getAllAttendanceChart();

        if (!response?.isSuccess) {
          toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data grafik absensi" description={response?.message} />)
          return;
        }

        setAttendanceChart(response.data?.data.data);
      } catch (error) {
        toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data grafik absensi" description={`${error || "gagal mendapatkan data grafik absensi, ada sesuatu yang salah."}`} />)
      } finally {
        setIsLoading(false);
      }
    }

    attendanceToChart();
  }, [])

  const isDataEmpty = attendanceChart?.every(item =>
    item.present === 0 &&
    item.absent === 0 &&
    item.onLeave === 0
  );

  console.log(isDataEmpty)

  return (
    <Card className="min-h-[500px] w-full">
      <ChartHeader />
      {isLoading ? (
        <div className="w-full h-[500px] flex flex-row justify-center items-center">
          <Spinner className="size-10" />
        </div>
      ) : (
        <>
          {isDataEmpty ? (
            <div className="h-[500px] w-full flex flex-row justify-center items-center">
              <div className="w-fit h-fit flex flex-col gap-3 items-center">
                <Image
                  src={EmptyStateAttendanceChart}
                  alt="empty state attendance chart image"
                />
                <div className="flex flex-col gap-1 items-center">
                  <CardTitle className="text-xl">belum ada grafik absensi saat ini.</CardTitle>
                  <CardDescription className="text-base font-medium max-w-md text-center">silahkan ajukan absensi mandiri kepada guru, atau tambah absensi <Link href={"/admin/attendance"} className="hover:underline">di sini.</Link></CardDescription>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </>
      )}
    </Card>
  );
}
