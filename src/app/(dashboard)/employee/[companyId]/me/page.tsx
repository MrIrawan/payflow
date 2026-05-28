'use client';

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import React from 'react';
import Link from 'next/link';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Briefcase,
    Building2,
    GraduationCap,
} from 'lucide-react';
import { GenderBadge } from '@/components/GenderBadge/gender-badge';
import { InfoBadge, jobBadgeMap, subjectBadgeMap } from '@/components/InfoBadge/info-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { GetEmployeeProfileData } from "@/types/response";
import { formatDate } from "@/utils/formatDate";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";

export default function UserProfile() {
    const [employeeProfile, setEmployeeProfile] = useState<GetEmployeeProfileData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();

    const companyId = Number(params.companyId);

    useEffect(() => {
        async function fetchEmployeeProfile() {
            setIsLoading(true);

            const response = await getEmployeeProfile(companyId);

            if (response.success === false) {
                toast.custom(() => <Toaster variant="error" title="kami tidak bisa mengambil data profil" description={`${response.message || "maaf, mungkin anda belum mendaftar atau belum masuk."}`} />)
                setIsLoading(false);
                return;
            }

            if (response.data !== null) {
                setEmployeeProfile(response.data);
                setIsLoading(false);
            }
        };

        fetchEmployeeProfile();
    }, []);

    return (
        // user profile page.
        <div className="w-full flex flex-col gap-5 p-6">
            <PageHeader />

            {/* Page title */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
                    <p className="text-sm text-gray-500">Informasi data pribadi dan kepegawaian Anda</p>
                </div>
            </div>

            {/* main content — responsive grid */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-stretch">

                {/* ── LEFT: Profile summary card ── */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full">
                        {/* Avatar banner */}
                        <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600" />
                        <div className="px-4 pb-4 -mt-8 flex flex-col items-center gap-3">
                            {/* Avatar */}
                            {isLoading ? (
                                <Skeleton className="w-16 h-16 rounded-full ring-4 ring-white bg-gray-300" />
                            ) : (
                                <Avatar className="w-16 h-16 rounded-full ring-4 ring-white">
                                    <AvatarFallback
                                        className={`text-xl font-bold text-white ${
                                            /* dummy: "Budi Santoso" → male → blue */
                                            "male" === "male"
                                                ? "bg-blue-500"
                                                : "bg-pink-500"
                                        }`}
                                    >
                                        {/* dummy fallback initials */}
                                        BS
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            {/* Name & job title */}
                            <div className="flex flex-col items-center gap-1.5 text-center">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="w-36 h-5 bg-gray-300 rounded" />
                                        <Skeleton className="w-24 h-4 bg-gray-200 rounded" />
                                    </>
                                ) : (
                                    <>
                                        <p className="text-base font-bold text-gray-900">Budi Santoso</p>
                                        {/* dummy job_title: null state */}
                                        <p className="text-xs text-gray-400 italic">belum ada deskripsi pekerjaan.</p>
                                    </>
                                )}
                            </div>

                            <Separator />

                            {/* Quick info rows */}
                            <div className="w-full flex flex-col gap-3">
                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        {isLoading ? (
                                            <Skeleton className="w-32 h-4 bg-gray-200 rounded" />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-800 truncate">budi.santoso@gmail.com</span>
                                        )}
                                        <span className="text-xs text-gray-400">Email</span>
                                    </div>
                                </div>

                                {/* Join date */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        {isLoading ? (
                                            <Skeleton className="w-24 h-4 bg-gray-200 rounded" />
                                        ) : (
                                            /* dummy join_date: null state */
                                            <span className="text-sm text-gray-400 italic">belum ada tanggal bergabung.</span>
                                        )}
                                        <span className="text-xs text-gray-400">Bergabung Sejak</span>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        {isLoading ? (
                                            <Skeleton className="w-16 h-4 bg-gray-200 rounded" />
                                        ) : (
                                            <GenderBadge placeholder="male" size="sm" />
                                        )}
                                        <span className="text-xs text-gray-400">Jenis Kelamin</span>
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        {isLoading ? (
                                            <Skeleton className="w-28 h-4 bg-gray-200 rounded" />
                                        ) : (
                                            /* dummy address: null state */
                                            <span className="text-sm text-gray-400 italic">belum ada alamat.</span>
                                        )}
                                        <span className="text-xs text-gray-400">Alamat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Detail cards ── */}
                <div className="flex flex-col gap-4">

                    {/* Personal info card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Card header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Informasi Pribadi</p>
                                <p className="text-xs text-gray-400">Data pribadi dan identitas</p>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {/* Nama Lengkap */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Nama Lengkap</Label>
                                {isLoading ? (
                                    <Skeleton className="w-32 h-5 bg-gray-200 rounded" />
                                ) : (
                                    <p className="text-base font-semibold text-gray-900">Budi Santoso</p>
                                )}
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Jenis Kelamin</Label>
                                {isLoading ? (
                                    <Skeleton className="w-20 h-5 bg-gray-200 rounded" />
                                ) : (
                                    <GenderBadge placeholder="male" size="sm" />
                                )}
                            </div>

                            {/* Tanggal Lahir */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Tanggal Lahir</Label>
                                {isLoading ? (
                                    <Skeleton className="w-28 h-5 bg-gray-200 rounded" />
                                ) : (
                                    /* dummy date_of_birth: null state */
                                    <p className="text-base text-gray-400 italic">belum ada tanggal lahir.</p>
                                )}
                            </div>

                            {/* Alamat Email */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Alamat Email</Label>
                                {isLoading ? (
                                    <Skeleton className="w-40 h-5 bg-gray-200 rounded" />
                                ) : (
                                    <p className="text-base font-semibold text-gray-900">budi.santoso@gmail.com</p>
                                )}
                            </div>

                            {/* Alamat Rumah — full width */}
                            <div className="flex flex-col gap-1 sm:col-span-2">
                                <Label className="text-sm text-gray-400">Alamat Rumah</Label>
                                {isLoading ? (
                                    <Skeleton className="w-full h-8 bg-gray-200 rounded" />
                                ) : (
                                    /* dummy address: null state */
                                    <div className="flex items-start gap-1.5">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                        <p className="text-base text-gray-400 italic">belum ada alamat.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Work info card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Card header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                <Briefcase className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Informasi Pekerjaan</p>
                                <p className="text-xs text-gray-400">Data kepegawaian dan jabatan</p>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {/* Nama Perusahaan */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Nama Perusahaan</Label>
                                {isLoading ? (
                                    <Skeleton className="w-32 h-5 bg-gray-200 rounded" />
                                ) : (
                                    <div className="flex items-center gap-1.5">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        <p className="text-base font-semibold text-gray-900">SMK Nusantara</p>
                                    </div>
                                )}
                            </div>

                            {/* Tanggal Bergabung */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Tanggal Bergabung</Label>
                                {isLoading ? (
                                    <Skeleton className="w-28 h-5 bg-gray-200 rounded" />
                                ) : (
                                    /* dummy join_date: null state */
                                    <p className="text-base text-gray-400 italic">belum ada tanggal bergabung.</p>
                                )}
                            </div>

                            {/* Jabatan */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">Jabatan dan Posisi</Label>
                                {isLoading ? (
                                    <Skeleton className="w-24 h-5 bg-gray-200 rounded" />
                                ) : (
                                    /* dummy job_title: null state */
                                    <p className="text-base text-gray-400 italic">belum ada deskripsi pekerjaan.</p>
                                )}
                            </div>

                            {/* ID Karyawan */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm text-gray-400">ID Karyawan</Label>
                                {isLoading ? (
                                    <Skeleton className="w-28 h-5 bg-gray-200 rounded" />
                                ) : (
                                    /* dummy employee_id */
                                    <p className="text-base font-mono font-semibold text-gray-900 tracking-wide">EMP-001</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // user profile page end.
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Your Profile",
                link: [
                    { title: "Dashboard", href: "/employee" }
                ]
            }} />
        </div>
    )
}