import { type ChartConfig } from "@/components/ui/chart";

export interface AttendanceChartData {
  month: string;
  present: number | undefined;
  onLeave: number | undefined;
  absent: number | undefined;
}

export interface AttendanceChartProps {
  config: ChartConfig;
  // Ganti any[] dengan union type yang cover semua kemungkinan data chart
  data: AttendanceChartData[] | RawAttendanceData[];
}

export interface RawAttendanceData {
  month: string;
  present: number;
  late: number;
  absent: number;
  permit: number;
}