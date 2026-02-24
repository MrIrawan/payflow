"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  UserCheck,
  BarChart3,
  Clock,
  Receipt,
  Download
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Separator } from "@/components/ui/separator";

// --- DUMMY DATA ---
// Nanti diganti dengan data dari API service buatanmu
const LIVE_ATTENDANCE = [
  { id: 1, name: "Farrel Irawan", time: "06:45 WIB", status: "Hadir", role: "Guru RPL" },
  { id: 2, name: "Azizah", time: "06:52 WIB", status: "Hadir", role: "Kaprok MPLB" },
  { id: 3, name: "Dimas Aryanto", time: "07:05 WIB", status: "Terlambat", role: "Guru" },
  { id: 4, name: "Budi Santoso", time: "-", status: "Izin", role: "Tata Usaha" },
];

const RECENT_PAYSLIPS = [
  { id: "PAY-001", period: "Januari 2026", total_sent: 45, date: "25 Jan 2026", status: "Selesai" },
  { id: "PAY-002", period: "Desember 2025", total_sent: 45, date: "25 Des 2025", status: "Selesai" },
  { id: "PAY-003", period: "November 2025", total_sent: 44, date: "25 Nov 2025", status: "Selesai" },
];

export default function AdminDashboardPage() {
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
            <div className="text-4xl font-bold">45</div>
            <p className="text-xs text-blue-200">Pegawai terdaftar di sistem</p>
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
            <div className="text-3xl font-bold text-gray-900">20</div>
            <p className="text-xs text-muted-foreground">44.4% dari total</p>
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
            <div className="text-3xl font-bold text-gray-900">25</div>
            <p className="text-xs text-muted-foreground">55.6% dari total</p>
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
            <div className="text-3xl font-bold text-gray-900">42<span className="text-lg text-muted-foreground font-normal">/45</span></div>
            <p className="text-xs text-green-600 font-medium">93.3% Tingkat Kehadiran</p>
          </CardContent>
        </Card>
      </div>

      {/* =========================================
          3. CHART SECTION
      ========================================= */}
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
          <CardHeader className="bg-white p-0">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <Clock className="size-5 text-blue-600" />
              Live Absensi Hari Ini
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead>Nama Pegawai</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LIVE_ATTENDANCE.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{row.name}</div>
                      <div className="text-xs text-muted-foreground">{row.role}</div>
                    </TableCell>
                    <TableCell className="text-sm">{row.time}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Hadir" ? "default" : row.status === "Terlambat" ? "destructive" : "secondary"}
                        className={row.status === "Hadir" ? "bg-green-100 text-green-700 hover:bg-green-200 shadow-none" : ""}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* TABEL KANAN: Histori Slip Gaji */}
        <Card className="w-3/4 shadow-sm border-gray-200 flex flex-col gap-5 p-5">
          <CardHeader className="bg-white flex flex-row items-center justify-between p-0">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <Receipt className="size-5 text-blue-600" />
              Histori Slip Gaji Terkirim
            </CardTitle>
            <Button variant="link" className="text-blue-600 h-auto p-0">Lihat Semua</Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead>Periode</TableHead>
                  <TableHead className="text-center">Terkirim</TableHead>
                  <TableHead>Tanggal Generate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_PAYSLIPS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-gray-900">{row.period}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {row.total_sent} Pegawai
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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