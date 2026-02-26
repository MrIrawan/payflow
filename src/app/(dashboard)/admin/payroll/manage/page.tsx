"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, Calculator, AlertCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";

// DUMMY DATA STATIS (Untuk keperluan UI saja)
const DUMMY_PAYROLL = [
    { teacher_id: "1", teacher_name: "Farrel (Kaprok RPL)", total_hadir: 22, teaching_salary: 550000, transport_salary: 990000, total_salary: 1540000 },
    { teacher_id: "2", teacher_name: "Azizah (Guru Produktif)", total_hadir: 20, teaching_salary: 500000, transport_salary: 900000, total_salary: 1400000 },
    { teacher_id: "3", teacher_name: "Budi Santoso (Guru OR)", total_hadir: 18, teaching_salary: 450000, transport_salary: 810000, total_salary: 1260000 },
];

export default function AdminPayrollManagePage() {
    // State murni untuk keperluan visual UI
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // Helper untuk format Rupiah
    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
    };

    // Hitung total dari dummy data
    const totalPengeluaran = DUMMY_PAYROLL.reduce((acc, curr) => acc + curr.total_salary, 0);

    // Fungsi pura-pura loading saat tombol diklik
    const handleDummyGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert("UI Test: Payroll berhasil di-generate!");
        }, 2000);
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">
            <PageHeader />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Kelola <span className="text-blue-600">Penggajian</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Kalkulasi hitungan gaji berjalan pegawai sebelum dicetak menjadi slip resmi.
                    </p>
                </div>

                <Button
                    onClick={handleDummyGenerate}
                    disabled={isGenerating || DUMMY_PAYROLL.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 h-11 px-6 transition-all"
                >
                    {isGenerating ? <Calculator className="size-5 animate-spin" /> : <CheckCircle className="size-5" />}
                    {isGenerating ? "Mengunci Data..." : "Generate & Kunci Slip Gaji"}
                </Button>
            </div>

            {/* =========================================
          2. SUMMARY CARDS
      ========================================= */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Card className="w-full h-[200px] flex flex-col justify-between border-l-4 border-l-blue-600 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-center justify-between p-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">Estimasi Pengeluaran</CardTitle>
                        <Wallet className="size-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="flex flex-col p-0">
                        <div className="text-3xl font-bold text-gray-900">{formatRupiah(totalPengeluaran)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total beban gaji bulan berjalan</p>
                    </CardContent>
                </Card>

                <Card className="w-full h-[200px] flex flex-col justify-between border-l-4 border-l-indigo-500 shadow-sm p-4">
                    <CardHeader className="flex flex-row items-center justify-between p-0">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">Status Bulan Ini</CardTitle>
                        <AlertCircle className="size-5 text-indigo-500" />
                    </CardHeader>
                    <CardContent className="flex flex-col p-0">
                        <div className="text-2xl font-bold text-indigo-600 mt-1">Belum Terkunci</div>
                        <p className="text-xs text-muted-foreground mt-1">Angka masih bisa berubah jika pegawai melakukan absensi.</p>
                    </CardContent>
                </Card>
            </div>

            {/* =========================================
          3. TABEL DATA GAJI BERJALAN
      ========================================= */}
            <Card className="flex flex-col w-full shadow-sm border-gray-200 p-4">
                <CardHeader className="flex flex-col p-0">
                    <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                        <Calculator className="size-5 text-blue-600" />
                        Tabel Hitungan Gaji Sementara
                    </CardTitle>
                    <CardDescription>Bulan: Februari 2026</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col w-full p-0">

                </CardContent>
            </Card>
        </div>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Manage Payroll",
                link: [
                    { title: "Dashboard", href: "/admin" },
                    { title: "Payroll", href: "/admin" }
                ]
            }} />
        </div>
    )
}