"use client";

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
          <AttendanceChart />
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