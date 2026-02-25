"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ArrowLeft,
    Save,
    UserCircle,
    KeyRound,
    Briefcase,
    BookOpen,
    Wallet
} from "lucide-react";
import Link from "next/link"; // Untuk tombol kembali

// --- DATA MASTER ---
const JOB_TITLES = [
    "Kepala Sekolah", "Kurikulum", "Kesiswaan", "Bendahara", "BK",
    "Kaprok RPL", "Kaprok MPLB", "DU/DI", "Tata Usaha", "Guru"
];

const SUBJECTS = [
    "PAI", "Bahasa Arab", "Bahasa Indonesia", "Bahasa Inggris", "Matematika",
    "SKI", "DDPK RPL", "PKK", "KK2 MP", "BPBK", "KK1 RPL", "KK2 RPL", "DDPK MP",
    "SBK", "PJOK", "Fiqih", "Informatika", "IPAS", "KK1 MP", "PKN",
    "Kebekerjaan", "Sejarah", "Bahasa Jepang"
];

export default function AdminTeacherFormPage() {
    // Dummy submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Simpan Data Pegawai!");
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">

            {/* =========================================
          1. HEADER & BACK BUTTON
      ========================================= */}
            <div className="flex flex-col gap-4">
                <Button variant="ghost" asChild className="w-fit pl-0 hover:bg-transparent text-gray-500 hover:text-blue-600">
                    <Link href="/admin/employee">
                        <ArrowLeft className="size-4 mr-2" />
                        Kembali ke Data Pegawai
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Tambah <span className="text-blue-600">Pegawai Baru</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">
                        Isi formulir di bawah ini untuk mendaftarkan akun dan data kepegawaian baru.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <Card className="border-t-4 border-t-amber-500 shadow-sm">
                    <CardHeader className="bg-white pb-4 border-b border-gray-100">
                        <CardTitle className="flex items-center gap-2 text-xl text-amber-600">
                            <KeyRound className="size-6" />
                            Kredensial Login
                        </CardTitle>
                        <CardDescription>Email dan password untuk akses aplikasi PayFlow.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-semibold">Alamat Email <span className="text-red-500">*</span></Label>
                            <Input id="email" type="email" placeholder="contoh@nurjamilah.sch.id" className="focus-visible:ring-amber-500" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-semibold">Password Awal <span className="text-red-500">*</span></Label>
                            <Input id="password" type="text" placeholder="Minimal 8 karakter" className="focus-visible:ring-amber-500" required />
                            <p className="text-xs text-muted-foreground">Pegawai dapat mengubah password ini nanti.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* =========================================
            SECTION 2: INFORMASI PRIBADI
        ========================================= */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm">
                    <CardHeader className="bg-white pb-4 border-b border-gray-100">
                        <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                            <UserCircle className="size-6" />
                            Informasi Pribadi
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="full_name" className="text-gray-700 font-semibold">Nama Lengkap <span className="text-red-500">*</span></Label>
                            <Input id="full_name" placeholder="Masukkan nama lengkap beserta gelar" className="focus-visible:ring-blue-600" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-gray-700 font-semibold">Jenis Kelamin</Label>
                            <Select>
                                <SelectTrigger id="gender" className="focus:ring-blue-600">
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date_of_birth" className="text-gray-700 font-semibold">Tanggal Lahir</Label>
                            <Input type="date" id="date_of_birth" className="focus-visible:ring-blue-600" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="home_address" className="text-gray-700 font-semibold">Alamat Rumah</Label>
                            <Textarea
                                id="home_address"
                                placeholder="Tuliskan alamat lengkap tempat tinggal saat ini..."
                                className="resize-none h-20 focus-visible:ring-blue-600"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* =========================================
            SECTION 3: DATA PAYROLL & JABATAN
        ========================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Kolom Kiri: Gaji Pokok & Instansi */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="shadow-sm border-gray-200 border-t-4 border-t-green-500 h-full">
                            <CardHeader className="bg-white pb-4 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                                    <Wallet className="size-5" />
                                    Data Penggajian
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="base_salary" className="text-gray-700 font-semibold">Gaji Pokok (Rp) <span className="text-red-500">*</span></Label>
                                    <Input id="base_salary" type="number" placeholder="Contoh: 3000000" className="focus-visible:ring-green-500 font-mono text-lg" required />
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Nominal ini akan menjadi basis perhitungan (Gaji Pokok ÷ Hari Kerja × Kehadiran).
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-gray-700 font-semibold">Instansi</Label>
                                    <Input id="company" defaultValue="SMK Nurjamilah" className="focus-visible:ring-blue-600 bg-gray-50" readOnly />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Kolom Kanan: Checkbox Jabatan & Mapel */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* JABATAN */}
                        <Card className="shadow-sm border-gray-200">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                                    <Briefcase className="size-5" />
                                    Jabatan & Posisi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    {JOB_TITLES.map((job) => (
                                        <div key={job} className="flex items-center space-x-2 p-1 hover:bg-white rounded transition-colors">
                                            <Checkbox id={`job-${job}`} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                                            <Label htmlFor={`job-${job}`} className="text-sm font-medium cursor-pointer text-gray-700 leading-tight">
                                                {job}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* MATA PELAJARAN */}
                        <Card className="shadow-sm border-gray-200">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                                    <BookOpen className="size-5" />
                                    Mata Pelajaran (Opsional)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    {SUBJECTS.map((subject) => (
                                        <div key={subject} className="flex items-start space-x-2 p-1 hover:bg-white rounded transition-colors">
                                            <Checkbox id={`subject-${subject}`} className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                                            <Label htmlFor={`subject-${subject}`} className="text-sm font-medium cursor-pointer text-gray-700 leading-tight">
                                                {subject}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>

                {/* =========================================
            FOOTER ACTIONS
        ========================================= */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
                    <Button variant="outline" type="button" asChild className="w-full sm:w-auto text-gray-600 hover:bg-gray-100 border-gray-300">
                        <Link href="/admin/employee">Batal</Link>
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        <Save className="size-4 mr-2" />
                        Simpan Data Pegawai
                    </Button>
                </div>

            </form>
        </div>
    );
}