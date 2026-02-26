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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { History, CalendarDays, Download, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";

// DUMMY DATA (Nanti kita ganti waktu integrasi backend)
const DUMMY_HISTORY = [
    { payroll_id: "1", teacher_name: "Budi Santoso", total_hadir: 22, total_salary: 1540000, period_month: 1, period_year: 2026 },
    { payroll_id: "2", teacher_name: "Siti Aminah", total_hadir: 20, total_salary: 1400000, period_month: 1, period_year: 2026 },
];

export default function AdminPayrollHistoryPage() {
    const currentYear = new Date().getFullYear();

    // State untuk filter
    const [selectedMonth, setSelectedMonth] = useState<string>("1");
    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
    };

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('id-ID', { month: 'long' });
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">
            <PageHeader />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Riwayat <span className="text-blue-600">Penggajian</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Arsip data slip gaji pegawai yang sudah diterbitkan.
                    </p>
                </div>

                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-all">
                    <Download className="size-4" />
                    Export Data Bulan Ini
                </Button>
            </div>

            <Card className="flex flex-col w-full shadow-sm border-gray-200 p-4">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between p-0 gap-4">
                    <div className="flex items-center gap-2">
                        <History className="size-5 text-blue-600" />
                        <CardTitle className="text-lg text-gray-800">Filter Arsip</CardTitle>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Pilih Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>{getMonthName(i + 1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-full sm:w-[120px]">
                                <SelectValue placeholder="Pilih Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={currentYear.toString()}>{currentYear}</SelectItem>
                                <SelectItem value={(currentYear - 1).toString()}>{currentYear - 1}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col p-0">

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
                page: "Payroll History",
                link: [
                    { title: "Dashboard", href: "/admin" },
                    { title: "Payroll", href: "/admin" }
                ]
            }} />
        </div>
    )
}