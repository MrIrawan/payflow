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
    Users, Wallet, TrendingUp, TrendingDown,
    CheckCircle2, Clock, ChevronRight,
    Plus, Send, X, Edit2, Banknote,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type RunStatus = "draft" | "approved" | "paid"

interface PayrollRun {
    id: string
    periode: string
    totalKaryawan: number
    totalDisbursement: number
    status: RunStatus
    createdAt: string
}

interface PayrollItem {
    employeeId: string
    nama: string
    jabatan: string
    totalEarnings: number
    totalDeductions: number
    netSalary: number
    status: "draft" | "approved"
}

// ── Hardcoded Data ─────────────────────────────────────────────────────────────

const payrollRuns: PayrollRun[] = [
    { id: "RUN-001", periode: "Mei 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, status: "draft", createdAt: "01 Mei 2026" },
    { id: "RUN-002", periode: "April 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, status: "paid", createdAt: "01 April 2026" },
    { id: "RUN-003", periode: "Maret 2026", totalKaryawan: 12, totalDisbursement: 79_200_000, status: "paid", createdAt: "01 Maret 2026" },
    { id: "RUN-004", periode: "Februari 2026", totalKaryawan: 11, totalDisbursement: 72_600_000, status: "paid", createdAt: "01 Februari 2026" },
]

const payrollItems: PayrollItem[] = [
    { employeeId: "EMP-001", nama: "Akbar Akmal", jabatan: "Guru Matematika", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "draft" },
    { employeeId: "EMP-002", nama: "Siti Aminah", jabatan: "Guru Bahasa Indo", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, status: "draft" },
    { employeeId: "EMP-003", nama: "Budi Santoso", jabatan: "Guru IPA", totalEarnings: 6_500_000, totalDeductions: 150_000, netSalary: 6_350_000, status: "approved" },
    { employeeId: "EMP-004", nama: "Dewi Kusuma", jabatan: "Guru Bahasa Ing", totalEarnings: 6_750_000, totalDeductions: 150_000, netSalary: 6_600_000, status: "approved" },
    { employeeId: "EMP-005", nama: "Andi Wijaya", jabatan: "Guru PKN", totalEarnings: 6_000_000, totalDeductions: 150_000, netSalary: 5_850_000, status: "draft" },
    { employeeId: "EMP-006", nama: "Rina Hartati", jabatan: "Guru Sejarah", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, status: "draft" },
    { employeeId: "EMP-007", nama: "Joko Susilo", jabatan: "Guru Informatika", totalEarnings: 7_000_000, totalDeductions: 150_000, netSalary: 6_850_000, status: "approved" },
    { employeeId: "EMP-008", nama: "Maya Sari", jabatan: "Guru SBK", totalEarnings: 6_000_000, totalDeductions: 150_000, netSalary: 5_850_000, status: "draft" },
    { employeeId: "EMP-009", nama: "Hendra Wijaya", jabatan: "Guru PJOK", totalEarnings: 6_250_000, totalDeductions: 150_000, netSalary: 6_100_000, status: "draft" },
    { employeeId: "EMP-010", nama: "Fitri Handayani", jabatan: "Guru Ekonomi", totalEarnings: 6_500_000, totalDeductions: 150_000, netSalary: 6_350_000, status: "draft" },
    { employeeId: "EMP-011", nama: "Rizky Pratama", jabatan: "Tata Usaha", totalEarnings: 5_500_000, totalDeductions: 150_000, netSalary: 5_350_000, status: "draft" },
    { employeeId: "EMP-012", nama: "Lestari Dewi", jabatan: "Bendahara", totalEarnings: 5_750_000, totalDeductions: 150_000, netSalary: 5_600_000, status: "draft" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRupiah = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v)

const totalNet = payrollItems.reduce((a, i) => a + i.netSalary, 0)
const approvedCount = payrollItems.filter(i => i.status === "approved").length
const draftCount = payrollItems.filter(i => i.status === "draft").length

function RunStatusBadge({ status }: { status: RunStatus }) {
    if (status === "paid") return <Badge className="bg-emerald-100 text-emerald-700 border-0"><CheckCircle2 className="size-3 mr-1" />Dibayar</Badge>
    if (status === "approved") return <Badge className="bg-blue-100 text-blue-700 border-0"><CheckCircle2 className="size-3 mr-1" />Disetujui</Badge>
    return <Badge className="bg-amber-100 text-amber-700 border-0"><Clock className="size-3 mr-1" />Draft</Badge>
}

function ItemStatusBadge({ status }: { status: "draft" | "approved" }) {
    if (status === "approved") return <Badge className="bg-blue-100 text-blue-700 border-0"><CheckCircle2 className="size-3 mr-1" />Approved</Badge>
    return <Badge className="bg-amber-100 text-amber-700 border-0"><Clock className="size-3 mr-1" />Draft</Badge>
}

// ── Columns ───────────────────────────────────────────────────────────────────

const runColumns: Column<PayrollRun>[] = [
    { accessor: "periode", header: "Periode" },
    {
        accessor: "totalKaryawan", header: "Karyawan",
        cell: (v) => <span className="font-medium">{v} orang</span>
    },
    {
        accessor: "totalDisbursement", header: "Total Disbursement",
        cell: (v) => <span className="font-semibold text-blue-700">{formatRupiah(v)}</span>
    },
    {
        accessor: "status", header: "Status",
        cell: (v) => <RunStatusBadge status={v} />
    },
    { accessor: "createdAt", header: "Dibuat" },
]

const itemColumns: Column<PayrollItem>[] = [
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
    {
        accessor: "status", header: "Status",
        cell: (v) => <ItemStatusBadge status={v} />
    },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ManagePayrollPage() {
    const [activeRun, setActiveRun] = useState<PayrollRun>(payrollRuns[0])
    const [items, setItems] = useState<PayrollItem[]>(payrollItems)
    const [showConfirm, setShowConfirm] = useState<"approve" | "paid" | null>(null)

    // Approve semua item yang masih draft
    const handleApproveAll = () => {
        setItems(prev => prev.map(i => ({ ...i, status: "approved" as const })))
        setShowConfirm(null)
    }

    // Mark run sebagai paid
    const handleMarkPaid = () => {
        setActiveRun(prev => ({ ...prev, status: "paid" }))
        setShowConfirm(null)
    }

    const currentApproved = items.filter(i => i.status === "approved").length
    const allApproved = currentApproved === items.length

    return (
        <div className="flex flex-col gap-6 p-6 w-full">

            {/* Header */}
            <div className="h-fit w-full flex flex-row items-center gap-3">
                <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
                <DashboardBreadcrumb data={{ page: "Kelola Penggajian" }} />
            </div>

            {/* Page Title */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Penggajian</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola periode penggajian, review slip gaji, dan proses pembayaran.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus className="size-4" />
                    Buat Periode Baru
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Karyawan", value: `${items.length} orang`, icon: Users, color: "blue" },
                    { label: "Total Disbursement", value: formatRupiah(totalNet), icon: Banknote, color: "emerald" },
                    { label: "Sudah Disetujui", value: `${currentApproved} karyawan`, icon: CheckCircle2, color: "green" },
                    { label: "Belum Disetujui", value: `${items.length - currentApproved} karyawan`, icon: Clock, color: "amber" },
                ].map((card) => (
                    <Card key={card.label} className={`border-${card.color}-100 bg-gradient-to-br from-${card.color}-50 to-white`}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className={`text-${card.color}-700 font-medium text-xs`}>
                                    {card.label}
                                </CardDescription>
                                <div className={`p-1.5 bg-${card.color}-100 rounded-lg`}>
                                    <card.icon className={`size-3.5 text-${card.color}-600`} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className={`text-lg font-bold text-${card.color}-700`}>{card.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* Run List */}
                <div className="xl:w-[400px] flex flex-col gap-3 shrink-0">
                    <h2 className="text-base font-semibold text-gray-800">Semua Periode</h2>
                    <div className="flex flex-col gap-2">
                        {payrollRuns.map((run) => (
                            <button
                                key={run.id}
                                onClick={() => setActiveRun(run)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${activeRun.id === run.id
                                        ? "border-blue-300 bg-blue-50 shadow-sm"
                                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-sm text-gray-900">{run.periode}</p>
                                    <RunStatusBadge status={run.status} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">{run.totalKaryawan} karyawan</p>
                                    <p className="text-sm font-bold text-blue-700">{formatRupiah(run.totalDisbursement)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Run Detail */}
                <div className="flex-1 flex flex-col gap-4">

                    {/* Run Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-base font-semibold text-gray-800">
                                Periode — {activeRun.periode}
                            </h2>
                            <RunStatusBadge status={activeRun.status} />
                        </div>

                        {/* Action buttons berdasarkan status */}
                        {activeRun.status === "draft" && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
                                    disabled={!allApproved}
                                    onClick={() => setShowConfirm("approve")}
                                >
                                    <CheckCircle2 className="size-4" />
                                    Approve Semua
                                </Button>
                                <Button
                                    size="sm"
                                    className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={!allApproved}
                                    onClick={() => setShowConfirm("paid")}
                                >
                                    <Send className="size-4" />
                                    Proses Pembayaran
                                </Button>
                            </div>
                        )}

                        {activeRun.status === "approved" && (
                            <Button
                                size="sm"
                                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => setShowConfirm("paid")}
                            >
                                <Send className="size-4" />
                                Proses Pembayaran
                            </Button>
                        )}

                        {activeRun.status === "paid" && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-0 px-3 py-1.5">
                                <CheckCircle2 className="size-3 mr-1" />
                                Pembayaran Selesai
                            </Badge>
                        )}
                    </div>

                    {/* Progress bar approve */}
                    {activeRun.status === "draft" && (
                        <Card className="border-amber-100 bg-amber-50/50">
                            <CardContent className="py-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-medium text-amber-700">
                                        Progress Persetujuan
                                    </p>
                                    <p className="text-xs font-bold text-amber-700">
                                        {currentApproved}/{items.length} disetujui
                                    </p>
                                </div>
                                <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                        style={{ width: `${(currentApproved / items.length) * 100}%` }}
                                    />
                                </div>
                                {!allApproved && (
                                    <p className="text-xs text-amber-600 mt-1.5">
                                        Semua karyawan harus disetujui sebelum proses pembayaran
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Items Table */}
                    <DataTable
                        columns={itemColumns}
                        data={items}
                        renderRowAction={(row) => (
                            activeRun.status === "draft" && row.status === "draft" ? (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
                                    onClick={() => setItems(prev =>
                                        prev.map(i => i.employeeId === row.employeeId
                                            ? { ...i, status: "approved" as const }
                                            : i
                                        )
                                    )}
                                >
                                    <CheckCircle2 className="size-3 mr-1" />
                                    Setujui
                                </Button>
                            ) : (
                                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                                    <CheckCircle2 className="size-3 mr-1" />
                                    Approved
                                </Badge>
                            )
                        )}
                    />
                </div>
            </div>

            {/* Confirm Dialog — Approve All */}
            {showConfirm === "approve" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <Card className="w-[400px] shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-base">Setujui Semua Slip Gaji?</CardTitle>
                            <CardDescription>
                                Semua {items.length} slip gaji periode {activeRun.periode} akan disetujui.
                                Tindakan ini tidak dapat dibatalkan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(null)}>
                                Batal
                            </Button>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleApproveAll}>
                                <CheckCircle2 className="size-4 mr-1" /> Ya, Setujui Semua
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Confirm Dialog — Mark Paid */}
            {showConfirm === "paid" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <Card className="w-[400px] shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-base">Proses Pembayaran?</CardTitle>
                            <CardDescription>
                                Total disbursement periode {activeRun.periode} adalah{" "}
                                <span className="font-bold text-blue-700">{formatRupiah(totalNet)}</span>.
                                Pastikan pembayaran sudah dilakukan sebelum konfirmasi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(null)}>
                                Batal
                            </Button>
                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleMarkPaid}>
                                <Send className="size-4 mr-1" /> Konfirmasi Pembayaran
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}