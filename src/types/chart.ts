import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  hadir: {
    label: "Hadir",
    color: "#2563eb",
  },
  sakit: {
    label: "Sakit",
    color: "#60a5fa",
  },
  alfa: {
    label: "Alfa",
    color: "#4b5563",
  },
} satisfies ChartConfig;

export interface AttendanceChartData {
  month: string;
  hadir: number | undefined;
  sakit: number | undefined;
  alfa: number | undefined;
}
