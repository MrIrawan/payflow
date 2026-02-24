"use client";

import { useState, useEffect } from "react";
import { GetAdminInfoData, GetPayrollHistoryData } from "@/types/response";
import { getAdminInfo } from "@/lib/services/admin/info/getAdminInfo";
import { calculatePercentage } from "@/utils/calculatePercentage";

import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { DataTable } from "@/components/DataTable/data-table";

import {
  Users,
  UserCircle,
  UserCheck,
  BarChart3,
  Clock,
  Receipt,
  Download
} from "lucide-react";
import { Column } from "@/types/table";
import { Attendance } from "@/types/base";
import { AttendanceBadge } from "@/components/AttendaceBadge/attendance-badge";

const attendanceTableColumns: Column<Attendance>[] = [
  { accessor: "teacher_name", header: "Nama Guru" },
  {
    accessor: "attendance_date", header: "Tanggal Absensi", cell: (value) => new Date(value).toLocaleDateString("id-ID", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  },
  { accessor: "checkin_time", header: "Jam Masuk Kantor" },
  { accessor: "checkout_time", header: "Jam Keluar Kantor" },
  { accessor: "attendance_status", header: "Status Absensi", cell: (value) => <AttendanceBadge placeholder={value} /> }
];

const payrollHistoryTableColumns: Column<GetPayrollHistoryData>[] = [
  { accessor: "teacher_name", header: "Nama Guru" },
  { accessor: "total_hadir", header: "Total Hadir" },
  { accessor: "total_weekly_hours", header: "Total Jam Ajar" },
  { accessor: "total_salary", header: "Gaji Akhir" }
];

export default function AdminDashboardPage() {
  const [adminInfo, setAdminInfo] = useState<GetAdminInfoData | undefined>(undefined);

  // employees count variable
  const maleEmployeesCount = adminInfo?.teachers.filter(teacher => teacher.gender === "male").length || 0;
  const femaleEmployeesCount = adminInfo?.teachers.filter(teacher => teacher.gender === "female").length || 0;
  const totalEmployees = adminInfo?.teachers.length || 0;

  // attendance count variable
  const currentDate = new Date().toLocaleDateString("id-ID");
  const presentCount = adminInfo?.attendances.filter(attendance => new Date(attendance.attendance_date).toLocaleDateString("id-ID") === currentDate).length || 0;

  useEffect(() => {
    async function fetchAdminInfo() {
      try {
        const response = await getAdminInfo();

        if (response.data.success === false) {
          toast.custom(() => <Toaster variant="error" title="gagal mengambil info dashboard admin" description={`${response.data.message || "gagal mengambil data info dashboard admin."}`} />);
          console.log(response)
          return;
        }

        setAdminInfo(response.data.data);
      } catch (error) {
        toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />);
        console.error(error);
      }
    }

    fetchAdminInfo();
  }, []);

  return (
    // MAIN CONTAINER: Flex Column, Full Width, dengan padding
    <div className="flex flex-col w-full min-h-screen gap-6 p-6 bg-gray-50/50">
      <PageHeader />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Ringkasan data pegawai, absensi harian, dan status penggajian.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2">
          <Download className="size-4" />
          Export Laporan Bulan Ini
        </Button>
      </div>
      {/* admin data card */}
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Card 1: Total Keseluruhan (Primary Color) */}
        <Card className="w-full flex flex-col justify-between border-0 shadow-md bg-blue-600 text-white p-4 h-[180px]">
          <CardHeader className="p-0 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-blue-100">
              Total Pegawai Aktif
            </CardTitle>
            <Users className="size-5 text-blue-200" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1 p-0">
            {adminInfo === undefined ? (
              <>
                <Skeleton className="w-[50px] h-[45px] bg-blue-300" />
                <Skeleton className="w-[165px] h-[16px] bg-blue-300" />
              </>
            ) : (
              <>
                <div className="text-4xl font-bold">{totalEmployees}</div>
                <p className="text-sm font-medium text-blue-200">Pegawai terdaftar di sistem</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Card 2: Laki-laki */}
        <Card className="w-full flex flex-col justify-between shadow-sm border-gray-200 p-4 h-[180px]">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Guru Laki-Laki
            </CardTitle>
            <UserCircle className="size-5 text-blue-500" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1 p-0">
            {adminInfo === undefined ? (
              <>
                <Skeleton className="w-[50px] h-[45px] bg-gray-300" />
                <Skeleton className="w-[165px] h-[16px] bg-gray-300" />
              </>
            ) : (
              <>
                <div className="text-4xl font-bold text-gray-900">{maleEmployeesCount}</div>
                <p className="text-sm font-medium text-muted-foreground">{calculatePercentage(maleEmployeesCount, totalEmployees)}% dari total</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Card 3: Perempuan */}
        <Card className="w-full flex flex-col justify-between shadow-sm border-gray-200 p-4 h-[180px]">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Guru Perempuan
            </CardTitle>
            <UserCircle className="size-5 text-pink-500" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1 p-0">
            {adminInfo === undefined ? (
              <>
                <Skeleton className="w-[50px] h-[45px] bg-gray-300" />
                <Skeleton className="w-[165px] h-[16px] bg-gray-300" />
              </>
            ) : (
              <>
                <div className="text-4xl font-bold text-gray-900">{femaleEmployeesCount}</div>
                <p className="text-sm font-medium text-muted-foreground">{calculatePercentage(femaleEmployeesCount, totalEmployees)}% dari total</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Card 4: Kehadiran Hari Ini (Idea Baru) */}
        <Card className="w-full flex flex-col justify-between shadow-sm border-gray-200 border-b-4 border-b-green-500 p-4 h-[180px]">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Hadir Hari Ini
            </CardTitle>
            <UserCheck className="size-5 text-green-500" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1 p-0">
            {adminInfo === undefined ? (
              <>
                <Skeleton className="w-[50px] h-[45px] bg-gray-300" />
                <Skeleton className="w-[165px] h-[16px] bg-gray-300" />
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900">{presentCount}<span className="text-lg text-muted-foreground font-normal">/{totalEmployees}</span></div>
                <p className="text-xs text-green-600 font-medium">{calculatePercentage(presentCount, totalEmployees)}% Tingkat Kehadiran</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      {/* chart area */}
      <Card className="w-full shadow-sm border-gray-200 p-5">
        <CardHeader className="bg-white p-0">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
            <BarChart3 className="size-5 text-blue-600" />
            Statistik Kehadiran Bulanan
          </CardTitle>
          <CardDescription>Tren absensi seluruh pegawai selama bulan berjalan.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center min-h-[300px] bg-gray-50/30">
          {/* Tempatkan Komponen Recharts / Chart.js kamu di sini nanti */}
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <BarChart3 className="size-10 opacity-20" />
            <span>Area Render Chart Absensi</span>
          </div>
        </CardContent>
      </Card>
      {/* table section */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Live Absensi */}
        <Card className="w-full shadow-sm border-gray-200 flex flex-col gap-5 p-5">
          <CardHeader className="bg-white p-0 gap-0">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <Clock className="size-5 text-blue-600" />
              Live Absensi Hari Ini
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {/* data table here */}
            <DataTable columns={attendanceTableColumns} data={adminInfo?.attendances || []} wrapper={false} />
          </CardContent>
        </Card>

        {/* TABEL KANAN: Histori Slip Gaji */}
        <Card className="w-3/4 shadow-sm border-gray-200 flex flex-col gap-5 p-5">
          <CardHeader className="bg-white flex flex-row items-center justify-between p-0">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <Receipt className="size-5 text-blue-600" />
              Histori Slip Gaji
            </CardTitle>
            <Button variant="link" className="text-blue-600 h-auto p-0">Lihat Semua</Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {/* data table here */}
            <DataTable columns={payrollHistoryTableColumns} data={[]} wrapper={false} />
          </CardContent>
        </Card>

      </div>
    </div>
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