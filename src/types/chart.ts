import { type ChartConfig } from "@/components/ui/chart";

export interface AttendanceChartData {
  month: string;
  present: number | undefined;
  onLeave: number | undefined;
  absent: number | undefined;
}

export interface AttendanceChartProps {
  config: ChartConfig;
  data: any[];
}

export interface RawAttendanceData {
  month: string;
  present: number;
  late: number;
  absent: number;
  permit: number;
}
