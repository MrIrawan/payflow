"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    TrendingUp,
    CalendarCheck,
    CarFront,
    Info
} from "lucide-react";

// DUMMY DATA STATIS USER
const DUMMY_LIVE_DATA = {
    teacher_name: "Farrel",
    period_month: "Februari 2026",
    total_hadir: 15,
    teaching_salary: 375000,
    transport_salary: 675000,
    total_salary: 1050000,
};

export default function UserLivePayrollPage() {
    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">

            {/* HEADLINE */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Gaji <span className="text-blue-600">Berjalan</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Estimasi gaji Anda bulan {DUMMY_LIVE_DATA.period_month} berdasarkan kehadiran saat ini.
                </p>
            </div>

            {/* INFO BANNER */}
            <div className="flex flex-row items-start sm:items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 shadow-sm">
                <Info className="size-5 shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-sm font-medium leading-relaxed">
                    Semangat, {DUMMY_LIVE_DATA.teacher_name}! Angka di bawah ini akan terus bertambah setiap kali Anda melakukan absensi (Clock-In). Gaji final akan disahkan oleh Admin pada akhir bulan.
                </p>
            </div>

            {/* BIG DISPLAY: TOTAL GAJI SEMENTARA */}
            <Card className="flex flex-col border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                    <Wallet className="size-64" />
                </div>
                <CardHeader className="flex flex-col pb-2 relative z-10">
                    <CardTitle className="text-blue-100 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="size-4" /> Estimasi Total Gaji Bersih
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col relative z-10">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">
                        {formatRupiah(DUMMY_LIVE_DATA.total_salary)}
                    </div>
                    <p className="text-blue-200 text-sm mt-3 font-medium">
                        *Belum termasuk potongan atau bonus jika ada.
                    </p>
                </CardContent>
            </Card>

            {/* BREAKDOWN CARDS */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Card className="flex-1 shadow-sm border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Total Kehadiran Valid</CardTitle>
                        <CalendarCheck className="size-5 text-green-500" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <div className="text-2xl font-bold text-gray-900">{DUMMY_LIVE_DATA.total_hadir} Hari</div>
                        <p className="text-xs text-muted-foreground mt-1">Status: Hadir (Present)</p>
                    </CardContent>
                </Card>

                <Card className="flex-1 shadow-sm border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Gaji Mengajar</CardTitle>
                        <Wallet className="size-5 text-blue-500" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <div className="text-2xl font-bold text-gray-900">{formatRupiah(DUMMY_LIVE_DATA.teaching_salary)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Rp 25.000 / kehadiran</p>
                    </CardContent>
                </Card>

                <Card className="flex-1 shadow-sm border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Tunjangan Transport</CardTitle>
                        <CarFront className="size-5 text-amber-500" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <div className="text-2xl font-bold text-gray-900">{formatRupiah(DUMMY_LIVE_DATA.transport_salary)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Rp 45.000 / kehadiran</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}