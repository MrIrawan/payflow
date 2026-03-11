"use client";

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
import { Download, History, FileText } from "lucide-react";

// DUMMY DATA STATIS HISTORY USER
const DUMMY_USER_HISTORY = [
    { id: "1", period: "Januari 2026", total_hadir: 22, total_salary: 1540000, status: "Terkirim" },
    { id: "2", period: "Desember 2025", total_hadir: 20, total_salary: 1400000, status: "Terkirim" },
    { id: "3", period: "November 2025", total_hadir: 21, total_salary: 1470000, status: "Terkirim" },
];

export default function UserPayrollHistoryPage() {
    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">

            {/* HEADLINE */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Riwayat <span className="text-blue-600">Slip Gaji</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Daftar slip gaji resmi yang telah diterbitkan oleh Admin.
                </p>
            </div>

            {/* TABLE CARD */}
            <Card className="flex flex-col w-full shadow-sm border-gray-200 flex-1">
                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4 bg-white">
                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                            <History className="size-5 text-blue-600" />
                            Arsip Penggajian Anda
                        </CardTitle>
                        <CardDescription>Pilih periode untuk mengunduh rincian slip gaji (PDF).</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col p-0 flex-1">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Periode Bulan</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Total Kehadiran</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-right">Gaji Diterima</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {DUMMY_USER_HISTORY.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-gray-50/80">
                                        <TableCell className="font-medium text-gray-900">{row.period}</TableCell>
                                        <TableCell className="text-center text-sm text-gray-600">{row.total_hadir} Hari</TableCell>
                                        <TableCell className="text-right font-mono font-bold text-gray-900">{formatRupiah(row.total_salary)}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                {row.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-2 mx-auto">
                                                <Download className="size-4" /> Unduh Slip
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}