"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { AttendanceChartProps } from "@/types/chart";

export function AttendanceChart({ config, data }: AttendanceChartProps) {
  return (
    <ChartContainer config={config} className="h-[500px] w-full">
      <BarChart accessibilityLayer data={data}>
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
        <Bar dataKey="hadir" fill="var(--color-hadir)" radius={4} />
        <Bar dataKey="sakit" fill="var(--color-sakit)" radius={4} />
        <Bar dataKey="alfa" fill="var(--color-alfa)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
