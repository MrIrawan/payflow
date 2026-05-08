"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    CalendarDays,
    Clock,
    CheckCircle2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PayrollComponent {
    komponen: string;
    tipe: "earning" | "deduction";
    keterangan: string;
    jumlah: number;
}

// ── Hardcoded Data ─────────────────────────────────────────────────────────────

const CURRENT_MONTH = "Mei 2026";

const earningComponents: PayrollComponent[] = [
    { komponen: "Gaji Pokok", tipe: "earning", keterangan: "Gaji dasar bulan berjalan", jumlah: 5_000_000 },
    { komponen: "Tunjangan Transport", tipe: "earning", keterangan: "Transport harian ke kantor", jumlah: 750_000 },
    { komponen: "Tunjangan Mengajar", tipe: "earning", keterangan: "10% dari gaji pokok", jumlah: 500_000 },
    { komponen: "Tunjangan Makan", tipe: "earning", keterangan: "Uang makan harian", jumlah: 300_000 },
    { komponen: "Bonus Kehadiran", tipe: "earning", keterangan: "Bonus hadir penuh bulan ini", jumlah: 200_000 },
]

const deductionComponents: PayrollComponent[] = [
    { komponen: "BPJS Kesehatan", tipe: "deduction", keterangan: "1% dari gaji pokok", jumlah: 50_000 },
    { komponen: "BPJS Ketenagakerjaan", tipe: "deduction", keterangan: "2% dari gaji pokok", jumlah: 100_000 },
    { komponen: "Potongan Terlambat", tipe: "deduction", keterangan: "0 keterlambatan", jumlah: 0 },
    { komponen: "Potongan Tidak Hadir", tipe: "deduction", keterangan: "0 hari tidak hadir", jumlah: 0 },
]

const totalEarnings = earningComponents.reduce((acc, c) => acc + c.jumlah, 0)
const totalDeductions = deductionComponents.reduce((acc, c) => acc + c.jumlah, 0)
const netSalary = totalEarnings - totalDeductions

const attendanceSummary = {
    hariKerja: 22,
    hadir: 22,
    tidakHadir: 0,
    terlambat: 0,
    status: "Hadir Penuh",
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value)

// ── Columns ───────────────────────────────────────────────────────────────────

const earningColumns: Column<PayrollComponent>[] = [
    { accessor: "komponen", header: "Komponen" },
    { accessor: "keterangan", header: "Keterangan" },
    {
        accessor: "jumlah",
        header: "Jumlah",
        cell: (value) => (
            <span className="font-semibold text-emerald-600">
                {formatRupiah(value)}
            </span>
        )
    },
]

const deductionColumns: Column<PayrollComponent>[] = [
    { accessor: "komponen", header: "Komponen" },
    { accessor: "keterangan", header: "Keterangan" },
    {
        accessor: "jumlah",
        header: "Jumlah",
        cell: (value) => (
            <span className={`font-semibold ${value > 0 ? "text-red-500" : "text-gray-400"}`}>
                {value > 0 ? `- ${formatRupiah(value)}` : "Rp 0"}
            </span>
        )
    },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LivePayrollPage() {
    return (
        <div className="flex flex-col gap-6 p-6 w-full">

            {/* Header */}
            <PageHeader />

            {/* Page Title */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Kalkulator Gaji</h1>
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 font-medium">
                        <Clock className="size-3 mr-1" />
                        {CURRENT_MONTH}
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-700 border-0 font-medium">
                        Draft
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    Estimasi gaji Anda bulan berjalan. Nilai final ditentukan setelah disetujui admin.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Total Penghasilan */}
                <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-emerald-700 font-medium">
                                Total Penghasilan
                            </CardDescription>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <TrendingUp className="size-4 text-emerald-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-emerald-700">
                            {formatRupiah(totalEarnings)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {earningComponents.length} komponen penghasilan
                        </p>
                    </CardContent>
                </Card>

                {/* Total Potongan */}
                <Card className="border-red-100 bg-gradient-to-br from-red-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-red-700 font-medium">
                                Total Potongan
                            </CardDescription>
                            <div className="p-2 bg-red-100 rounded-lg">
                                <TrendingDown className="size-4 text-red-500" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-500">
                            - {formatRupiah(totalDeductions)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {deductionComponents.filter(d => d.jumlah > 0).length} potongan aktif
                        </p>
                    </CardContent>
                </Card>

                {/* Gaji Bersih */}
                <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-blue-700 font-medium">
                                Estimasi Gaji Bersih
                            </CardDescription>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Wallet className="size-4 text-blue-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-700">
                            {formatRupiah(netSalary)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Setelah semua potongan
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance Summary */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-muted-foreground" />
                        <CardTitle className="text-base">Ringkasan Kehadiran {CURRENT_MONTH}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: "Hari Kerja", value: attendanceSummary.hariKerja, color: "text-gray-700" },
                            { label: "Hadir", value: attendanceSummary.hadir, color: "text-emerald-600" },
                            { label: "Tidak Hadir", value: attendanceSummary.tidakHadir, color: "text-red-500" },
                            { label: "Terlambat", value: attendanceSummary.terlambat, color: "text-amber-600" },
                            { label: "Status", value: attendanceSummary.status, color: "text-blue-600" },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-1">
                                <p className="text-xs text-muted-foreground">{item.label}</p>
                                <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Earning Table */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-emerald-600" />
                    <h2 className="text-base font-semibold text-gray-800">Komponen Penghasilan</h2>
                </div>
                <DataTable columns={earningColumns} data={earningComponents} />
            </div>

            {/* Deduction Table */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <TrendingDown className="size-4 text-red-500" />
                    <h2 className="text-base font-semibold text-gray-800">Komponen Potongan</h2>
                </div>
                <DataTable columns={deductionColumns} data={deductionComponents} />
            </div>

            {/* Net Salary Footer */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
                <CardContent className="py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-blue-100 text-sm font-medium">
                                Estimasi Gaji Bersih — {CURRENT_MONTH}
                            </p>
                            <p className="text-3xl font-bold">
                                {formatRupiah(netSalary)}
                            </p>
                            <p className="text-blue-200 text-xs">
                                * Nilai ini adalah estimasi dan dapat berubah setelah disetujui oleh admin
                            </p>
                        </div>
                        <div className="p-4 bg-white/10 rounded-2xl">
                            <Wallet className="size-8 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

function PageHeader() {
    const params = useParams();
    const companyId = params.companyId;

    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Estimasi Gaji",
                link: [
                    { title: "Dashboard", href: `/employee/${companyId}` },
                    { title: "Penggajian", href: `/employee/${companyId}/payroll/live` }
                ]
            }} />
        </div>
    )
}