import { type ChartConfig } from "@/components/ui/chart";

export interface AttendanceChartData {
  month: string;
  hadir: number | undefined;
  sakit: number | undefined;
  alfa: number | undefined;
}

export interface AttendanceChartProps {
  config: ChartConfig;
  data: any[];
}
