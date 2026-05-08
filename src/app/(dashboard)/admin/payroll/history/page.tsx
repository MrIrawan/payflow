"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import {
    Wallet, TrendingUp, Users, CheckCircle2,
    ChevronRight, X, Banknote, Calendar,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PayrollHistoryRun {
    id: string
    periode: string
    totalKaryawan: number
    totalDisbursement: number
    approvedBy: string
    tanggalBayar: string
}

interface HistoryItem {
    nama: string
    jabatan: string
    totalEarnings: number
    totalDeductions: number
    netSalary: number
    tanggalBayar: string
}

// ── Hardcoded Data ─────────────────────────────────────────────────────────────

const historyRuns: PayrollHistoryRun[] = [
    { id: "RUN-002", periode: "April 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, approvedBy: "Admin PayFlow", tanggalBayar: "30 April 2026" },
    { id: "RUN-003", periode: "Maret 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, approvedBy: "Admin PayFlow", tanggalBayar: "31 Maret 2026" },
    { id: "RUN-004", periode: "Februari 2026", totalKaryawan: 11, totalDisbursement: 72_600_000, approvedBy: "Admin PayFlow", tanggalBayar: "28 Februari 2026" },
    { id: "RUN-005", periode: "Januari 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, approvedBy: "Admin PayFlow", tanggalBayar: "31 Januari 2026" },
    { id: "RUN-006", periode: "Desember 2025", totalKaryawan: 12, totalDisbursement: 91_200_000, approvedBy: "Admin PayFlow", tanggalBayar: "31 Desember 2025" },
]

const historyItemsMap: Record<string, HistoryItem[]> = {
    "RUN-002": [
        { nama: "Akbar Akmal", jabatan: "Guru Matematika", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, tanggalBayar: "30 April 2026" },
        { nama: "Siti Aminah", jabatan: "Guru Bahasa Indo", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, tanggalBayar: "30 April 2026" },
        { nama: "Budi Santoso", jabatan: "Guru IPA", totalEarnings: 6_500_000, totalDeductions: 150_000, netSalary: 6_350_000, tanggalBayar: "30 April 2026" },
        { nama: "Dewi Kusuma", jabatan: "Guru Bahasa Ing", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, tanggalBayar: "30 April 2026" },
        { nama: "Andi Wijaya", jabatan: "Guru PKN", totalEarnings: 6_000_000, totalDeductions: 150_000, netSalary: 5_850_000, tanggalBayar: "30 April 2026" },
        { nama: "Rina Hartati", jabatan: "Guru Sejarah", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, tanggalBayar: "30 April 2026" },
        { nama: "Joko Susilo", jabatan: "Guru Informatika", totalEarnings: 7_000_000, totalDeductions: 150_000, netSalary: 6_850_000, tanggalBayar: "30 April 2026" },
        { nama: "Maya Sari", jabatan: "Guru SBK", totalEarnings: 6_000_000, totalDeductions: 150_000, netSalary: 5_850_000, tanggalBayar: "30 April 2026" },
        { nama: "Hendra Wijaya", jabatan: "Guru PJOK", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, tanggalBayar: "30 April 2026" },
        { nama: "Fitri Handayani", jabatan: "Guru Ekonomi", totalEarnings: 6_500_000, totalDeductions: 150_000, netSalary: 6_350_000, tanggalBayar: "30 April 2026" },
        { nama: "Rizky Pratama", jabatan: "Tata Usaha", totalEarnings: 5_500_000, totalDeductions: 150_000, netSalary: 5_350_000, tanggalBayar: "30 April 2026" },
        { nama: "Lestari Dewi", jabatan: "Bendahara", totalEarnings: 5_750_000, totalDeductions: 150_000, netSalary: 5_600_000, tanggalBayar: "30 April 2026" },
    ],
}

// Default items untuk run lain
const defaultItems: HistoryItem[] = [
    { nama: "Akbar Akmal", jabatan: "Guru Matematika", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, tanggalBayar: "-" },
    { nama: "Siti Aminah", jabatan: "Guru Bahasa Indo", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, tanggalBayar: "-" },
    { nama: "Budi Santoso", jabatan: "Guru IPA", totalEarnings: 6_500_000, totalDeductions: 150_000, netSalary: 6_350_000, tanggalBayar: "-" },
    { nama: "Joko Susilo", jabatan: "Guru Informatika", totalEarnings: 7_000_000, totalDeductions: 150_000, netSalary: 6_850_000, tanggalBayar: "-" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRupiah = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v)

const totalAllTime = historyRuns.reduce((a, r) => a + r.totalDisbursement, 0)
const avgMonthly = totalAllTime / historyRuns.length

// ── Columns ───────────────────────────────────────────────────────────────────

const runColumns: Column<PayrollHistoryRun>[] = [
    { accessor: "periode", header: "Periode" },
    {
        accessor: "totalKaryawan", header: "Karyawan",
        cell: (v) => <span className="font-medium">{v} orang</span>
    },
    {
        accessor: "totalDisbursement", header: "Total Dibayar",
        cell: (v) => <span className="font-bold text-blue-700">{formatRupiah(v)}</span>
    },
    { accessor: "approvedBy", header: "Disetujui Oleh" },
    { accessor: "tanggalBayar", header: "Tanggal Bayar" },
]

const itemColumns: Column<HistoryItem>[] = [
    { accessor: "nama", header: "Nama Karyawan" },
    { accessor: "jabatan", header: "Jabatan" },
    {
        accessor: "totalEarnings", header: "Penghasilan",
        cell: (v) => <span className="text-emerald-600 font-semibold">{formatRupiah(v)}</span>
    },
    {
        accessor: "totalDeductions", header: "Potongan",
        cell: (v) => <span className="text-red-500 font-semibold">- {formatRupiah(v)}</span>
    },
    {
        accessor: "netSalary", header: "Gaji Bersih",
        cell: (v) => <span className="text-blue-700 font-bold">{formatRupiah(v)}</span>
    },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PayrollHistoryAdminPage() {
    const [selectedRun, setSelectedRun] = useState<PayrollHistoryRun | null>(null)

    const items = selectedRun
        ? (historyItemsMap[selectedRun.id] ?? defaultItems)
        : []

    return (
        <div className="flex flex-col gap-6 p-6 w-full">

            {/* Header */}
            <div className="h-fit w-full flex flex-row items-center gap-3">
                <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
                <DashboardBreadcrumb data={{ page: "Riwayat Penggajian" }} />
            </div>

            {/* Page Title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-gray-900">Riwayat Penggajian</h1>
                <p className="text-sm text-muted-foreground">
                    Seluruh histori penggajian yang telah diproses. Klik periode untuk lihat detail.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-blue-700 font-medium">Total Dibayar</CardDescription>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Banknote className="size-4 text-blue-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-700">{formatRupiah(totalAllTime)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Sepanjang waktu</p>
                    </CardContent>
                </Card>

                <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-emerald-700 font-medium">Rata-rata / Bulan</CardDescription>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <TrendingUp className="size-4 text-emerald-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-emerald-700">{formatRupiah(avgMonthly)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Per periode</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-100">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="font-medium">Total Periode</CardDescription>
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Calendar className="size-4 text-gray-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-700">{historyRuns.length}</p>
                        <p className="text-xs text-muted-foreground mt-1">Periode selesai</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="flex flex-col xl:flex-row gap-6">

                {/* Run Table */}
                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-base font-semibold text-gray-800">Semua Periode</h2>
                    <DataTable
                        columns={runColumns}
                        data={historyRuns}
                        renderRowAction={(row) => (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => setSelectedRun(row)}
                            >
                                Detail <ChevronRight className="size-3 ml-1" />
                            </Button>
                        )}
                    />
                </div>

                {/* Detail Panel */}
                {selectedRun && (
                    <div className="xl:w-[420px] flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-800">
                                Detail — {selectedRun.periode}
                            </h2>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedRun(null)}>
                                <X className="size-4" />
                            </Button>
                        </div>

                        {/* Run summary */}
                        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
                            <CardContent className="py-4">
                                <p className="text-blue-100 text-xs font-medium mb-1">Total Disbursement</p>
                                <p className="text-2xl font-bold">{formatRupiah(selectedRun.totalDisbursement)}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-blue-200 text-xs">
                                        <Users className="size-3 inline mr-1" />
                                        {selectedRun.totalKaryawan} karyawan
                                    </p>
                                    <p className="text-blue-200 text-xs">
                                        <CheckCircle2 className="size-3 inline mr-1" />
                                        {selectedRun.approvedBy}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Items table */}
                        <DataTable columns={itemColumns} data={items} />

                        {/* Meta */}
                        <div className="flex flex-col gap-2 p-4 rounded-xl border bg-gray-50">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Periode</span>
                                <span className="font-medium">{selectedRun.periode}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tanggal Bayar</span>
                                <span className="font-medium">{selectedRun.tanggalBayar}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Disetujui Oleh</span>
                                <span className="font-medium">{selectedRun.approvedBy}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">ID Run</span>
                                <span className="font-mono text-xs text-muted-foreground">{selectedRun.id}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}