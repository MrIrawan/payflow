"use client";

import { type ChartConfig } from "@/components/ui/chart";
import { staticAttendanceChartData } from "../../../../public/data/static-attendance-chart";

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

import TeacherTable from "@/components/TeacherTable/teacher-table";
import { Card } from "@/components/ui/card";
import { ChartHeader } from "@/components/ChartHeader/chart-header";
import { AttendanceChart } from "@/components/AttendanceChart/attendance-chart";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TeachersDataCard } from "@/components/TeachersDataCard/teachers-data-card";

export default function AdminPage() {
  return (
    <section className="w-full p-6">
      <div className="w-full flex flex-col gap-6">
        <PageHeader />
        {/* Data card component */}
        <TeachersDataCard />
        {/* attendance graph */}
        <Card className="shadow-none">
          <ChartHeader />
          <AttendanceChart
            config={chartConfig}
            data={staticAttendanceChartData}
          />
        </Card>
        {/* employee table component */}
        <Card className="w-full h-fit py-6 px-3">
          <TeacherTable />
        </Card>
      </div>
    </section>
  );
}

function PageHeader() {
  return (
    <div className="h-fit w-full flex flex-row items-center gap-3">
      <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
      <DashboardBreadcrumb data={{
        page: "Dashboard"
      }} />
    </div>
  )
}