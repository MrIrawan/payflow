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
  attendance_date: string;
  attendance_status: "present" | "onLeave" | "absent" | "sick";
}
