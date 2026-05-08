"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable/data-table";
import { Column } from "@/types/table";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    Clock,
    ChevronRight,
    X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PayrollHistory {
    id: string;
    periode: string;
    totalEarnings: number;
    totalDeductions: number;
    netSalary: number;
    status: "paid" | "approved" | "draft";
    tanggalBayar: string;
}

interface PayrollDetail {
    komponen: string;
    tipe: "earning" | "deduction";
    jumlah: number;
}

// ── Hardcoded Data ─────────────────────────────────────────────────────────────

const payrollHistoryData: PayrollHistory[] = [
    { id: "PR-001", periode: "April 2026", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "paid", tanggalBayar: "30 April 2026" },
    { id: "PR-002", periode: "Maret 2026", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "paid", tanggalBayar: "31 Maret 2026" },
    { id: "PR-003", periode: "Februari 2026", totalEarnings: 6_550_000, totalDeductions: 150_000, netSalary: 6_400_000, status: "paid", tanggalBayar: "28 Februari 2026" },
    { id: "PR-004", periode: "Januari 2026", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "paid", tanggalBayar: "31 Januari 2026" },
    { id: "PR-005", periode: "Desember 2025", totalEarnings: 7_750_000, totalDeductions: 150_000, netSalary: 7_600_000, status: "paid", tanggalBayar: "31 Desember 2025" },
    { id: "PR-006", periode: "November 2025", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "paid", tanggalBayar: "30 November 2025" },
]

// Detail dummy per payroll — dipakai saat user klik lihat detail
const payrollDetailMap: Record<string, PayrollDetail[]> = {
    "PR-001": [
        { komponen: "Gaji Pokok", tipe: "earning", jumlah: 5_000_000 },
        { komponen: "Tunjangan Transport", tipe: "earning", jumlah: 750_000 },
        { komponen: "Tunjangan Mengajar", tipe: "earning", jumlah: 500_000 },
        { komponen: "Tunjangan Makan", tipe: "earning", jumlah: 300_000 },
        { komponen: "Bonus Kehadiran", tipe: "earning", jumlah: 200_000 },
        { komponen: "BPJS Kesehatan", tipe: "deduction", jumlah: 50_000 },
        { komponen: "BPJS Ketenagakerjaan", tipe: "deduction", jumlah: 100_000 },
    ],
    "PR-005": [
        { komponen: "Gaji Pokok", tipe: "earning", jumlah: 5_000_000 },
        { komponen: "Tunjangan Transport", tipe: "earning", jumlah: 750_000 },
        { komponen: "Tunjangan Mengajar", tipe: "earning", jumlah: 500_000 },
        { komponen: "Tunjangan Makan", tipe: "earning", jumlah: 300_000 },
        { komponen: "THR", tipe: "earning", jumlah: 1_000_000 },
        { komponen: "Bonus Akhir Tahun", tipe: "earning", jumlah: 200_000 },
        { komponen: "BPJS Kesehatan", tipe: "deduction", jumlah: 50_000 },
        { komponen: "BPJS Ketenagakerjaan", tipe: "deduction", jumlah: 100_000 },
    ],
}

// Default detail kalau id tidak ada di map
const defaultDetail: PayrollDetail[] = [
    { komponen: "Gaji Pokok", tipe: "earning", jumlah: 5_000_000 },
    { komponen: "Tunjangan Transport", tipe: "earning", jumlah: 750_000 },
    { komponen: "Tunjangan Mengajar", tipe: "earning", jumlah: 500_000 },
    { komponen: "Tunjangan Makan", tipe: "earning", jumlah: 300_000 },
    { komponen: "BPJS Kesehatan", tipe: "deduction", jumlah: 50_000 },
    { komponen: "BPJS Ketenagakerjaan", tipe: "deduction", jumlah: 100_000 },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", minimumFractionDigits: 0
    }).format(value)

const totalAllTime = payrollHistoryData.reduce((acc, p) => acc + p.netSalary, 0)
const avgSalary = totalAllTime / payrollHistoryData.length

function StatusBadge({ status }: { status: PayrollHistory["status"] }) {
    if (status === "paid") return (
        <Badge className="bg-emerald-100 text-emerald-700 border-0">
            <CheckCircle2 className="size-3 mr-1" /> Dibayar
        </Badge>
    )
    if (status === "approved") return (
        <Badge className="bg-blue-100 text-blue-700 border-0">
            <CheckCircle2 className="size-3 mr-1" /> Disetujui
        </Badge>
    )
    return (
        <Badge className="bg-amber-100 text-amber-700 border-0">
            <Clock className="size-3 mr-1" /> Draft
        </Badge>
    )
}

// ── Columns ───────────────────────────────────────────────────────────────────

const historyColumns: Column<PayrollHistory>[] = [
    { accessor: "periode", header: "Periode" },
    {
        accessor: "totalEarnings",
        header: "Penghasilan",
        cell: (value) => (
            <span className="text-emerald-600 font-semibold">{formatRupiah(value)}</span>
        )
    },
    {
        accessor: "totalDeductions",
        header: "Potongan",
        cell: (value) => (
            <span className="text-red-500 font-semibold">- {formatRupiah(value)}</span>
        )
    },
    {
        accessor: "netSalary",
        header: "Gaji Bersih",
        cell: (value) => (
            <span className="text-blue-700 font-bold">{formatRupiah(value)}</span>
        )
    },
    {
        accessor: "status",
        header: "Status",
        cell: (value) => <StatusBadge status={value} />
    },
    { accessor: "tanggalBayar", header: "Tanggal Bayar" },
]

const detailColumns: Column<PayrollDetail>[] = [
    { accessor: "komponen", header: "Komponen" },
    {
        accessor: "tipe",
        header: "Tipe",
        cell: (value) => value === "earning"
            ? <Badge className="bg-emerald-100 text-emerald-700 border-0">Penghasilan</Badge>
            : <Badge className="bg-red-100 text-red-600 border-0">Potongan</Badge>
    },
    {
        accessor: "jumlah",
        header: "Jumlah",
        cell: (value, row) => (
            <span className={`font-semibold ${row.tipe === "earning" ? "text-emerald-600" : "text-red-500"}`}>
                {row.tipe === "deduction" ? "- " : ""}{formatRupiah(value)}
            </span>
        )
    },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PayrollHistoryPage() {
    const [selectedPayroll, setSelectedPayroll] = useState<PayrollHistory | null>(null)

    const details = selectedPayroll
        ? (payrollDetailMap[selectedPayroll.id] ?? defaultDetail)
        : []

    const detailEarnings = details.filter(d => d.tipe === "earning").reduce((a, d) => a + d.jumlah, 0)
    const detailDeductions = details.filter(d => d.tipe === "deduction").reduce((a, d) => a + d.jumlah, 0)

    return (
        <div className="flex flex-col gap-6 p-6 w-full">

            {/* Header */}
            <PageHeader />

            {/* Page Title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-gray-900">Riwayat Gaji</h1>
                <p className="text-sm text-muted-foreground">
                    Seluruh riwayat penggajian Anda. Klik baris untuk melihat detail slip gaji.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-blue-700 font-medium">Total Diterima</CardDescription>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Wallet className="size-4 text-blue-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-700">{0}</p>
                        <p className="text-xs text-muted-foreground mt-1">Sepanjang waktu</p>
                    </CardContent>
                </Card>

                <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-emerald-700 font-medium">Rata-rata Gaji</CardDescription>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <TrendingUp className="size-4 text-emerald-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-emerald-700">{0}</p>
                        <p className="text-xs text-muted-foreground mt-1">Per bulan</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-100">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="font-medium">Total Periode</CardDescription>
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <CheckCircle2 className="size-4 text-gray-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-700">{0}</p>
                        <p className="text-xs text-muted-foreground mt-1">Slip gaji tersedia</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="flex flex-col xl:flex-row gap-6">

                {/* History Table */}
                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-base font-semibold text-gray-800">Semua Periode</h2>
                    <DataTable
                        columns={historyColumns}
                        data={[]}
                        renderRowAction={(row) => (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => setSelectedPayroll(row)}
                            >
                                Detail <ChevronRight className="size-3 ml-1" />
                            </Button>
                        )}
                    />
                </div>

                {/* Detail Panel */}
                {selectedPayroll && (
                    <div className="xl:w-[380px] flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-800">
                                Detail — {selectedPayroll.periode}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPayroll(null)}
                            >
                                <X className="size-4" />
                            </Button>
                        </div>

                        {/* Net salary highlight */}
                        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
                            <CardContent className="py-4">
                                <p className="text-blue-100 text-xs font-medium mb-1">Gaji Bersih</p>
                                <p className="text-2xl font-bold">{formatRupiah(selectedPayroll.netSalary)}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="text-blue-200 text-xs">
                                        <TrendingUp className="size-3 inline mr-1" />
                                        {formatRupiah(detailEarnings)}
                                    </p>
                                    <p className="text-blue-200 text-xs">
                                        <TrendingDown className="size-3 inline mr-1" />
                                        - {formatRupiah(detailDeductions)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detail breakdown */}
                        <DataTable columns={detailColumns} data={details} />

                        {/* Meta info */}
                        <div className="flex flex-col gap-2 p-4 rounded-xl border bg-gray-50">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <StatusBadge status={selectedPayroll.status} />
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tanggal Bayar</span>
                                <span className="font-medium">{selectedPayroll.tanggalBayar}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">ID Payroll</span>
                                <span className="font-mono text-xs text-muted-foreground">{selectedPayroll.id}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
                page: "Riwayat Gaji",
                link: [
                    { title: "Dashboard", href: `/employee/${companyId}` },
                    { title: "Penggajian", href: `/employee/${companyId}/payroll/history` }
                ]
            }} />
        </div>
    )
}