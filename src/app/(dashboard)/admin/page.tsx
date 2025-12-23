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

import {
  DataCard,
  DataCardBody,
  DataCardFooter,
  DataCardHeader,
} from "@/components/DataCard/data-card";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, MarsIcon, Users2Icon, VenusIcon } from "lucide-react";
import { ChartHeader } from "@/components/ChartHeader/chart-header";
import { AttendanceChart } from "@/components/AttendanceChart/attendance-chart";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TeacherTable from "@/components/TeacherTable/teacher-table";

export default function AdminPage() {
  return (
    <section className="w-full p-6">
      <div className="w-full flex flex-col gap-6">
        <PageHeader />
        {/* Data card component */}
        <div className="flex flex-row justify-between items-center gap-6">
          <DataCard>
            <DataCardHeader>
              <div className="w-16 h-16 p-2.5 rounded-xl bg-blue-100 flex flex-row items-center justify-center">
                <MarsIcon className="text-blue-600 size-9" />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-blue-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
          <DataCard>
            <DataCardHeader>
              <div className="w-16 h-16 p-2.5 rounded-xl bg-pink-100 flex flex-row items-center justify-center">
                <VenusIcon className="text-pink-600 size-9" />
              </div>
              <div className="flex flex-col gap-0 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-pink-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
          <DataCard>
            <DataCardHeader>
              <div className="w-16 h-16 p-2.5 rounded-xl bg-yellow-100 flex flex-row items-center justify-center">
                <Users2Icon className="text-yellow-600 size-9" />
              </div>
              <div className="flex flex-col gap-0 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-yellow-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
        </div>
        {/* attendance graph */}
        <Card className="shadow-none">
          <ChartHeader />
          <AttendanceChart
            config={chartConfig}
            data={staticAttendanceChartData}
          />
        </Card>
        {/* employee table component */}
        <Card className="w-full min-h-[500px] py-6 px-3">
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