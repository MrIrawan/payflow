'use client';

import { useState } from "react";

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
    Edit
} from 'lucide-react';
import { GenderBadge } from '@/components/GenderBadge/gender-badge';
import { InfoBadge, jobBadgeMap, subjectBadgeMap } from '@/components/InfoBadge/info-badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { TeacherProfile } from "@/types/response";

export default function UserProfile() {
    const [employeeProfile, setEmployeeProfile] = useState<TeacherProfile | null>(null);

    return (
        <div className='w-full flex flex-col gap-6 p-6'>
            <div className="flex items-center justify-between">
                <div className='flex flex-col gap-1'>
                    <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
                    <p className="text-gray-600">Informasi lengkap tentang data pribadi dan pekerjaan Anda</p>
                </div>
                <Link href="/user/edit-profile">
                    <Button className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/30 font-medium'>
                        <Edit className="w-5 h-5" />
                        Edit Profil
                    </Button>
                </Link>
            </div>
            {/* main content */}
            <div className="w-full flex flex-row items-start gap-6">
                <div className='w-1/2 flex flex-col gap-6'>
                    {/* profile card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                        <div className="flex flex-col gap-4">
                            {/* profile avatar */}
                            <div className='w-full flex flex-col gap-4 items-center'>
                                {employeeProfile === null ? (
                                    <Skeleton className="w-32 h-32 rounded-full bg-gray-300" />
                                ) : (
                                    <Avatar className='w-32 h-32 rounded-full flex items-center justify-center'>
                                        <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-3xl font-bold text-white'>AF</AvatarFallback>
                                    </Avatar>
                                )}

                                <div className='flex flex-col gap-1 items-center'>
                                    {employeeProfile === null ? (
                                        <>
                                            <Skeleton className="w-[200px] bg-gray-300 h-[25px]" />
                                            <Skeleton className="w-[300px] h-[70px] bg-gray-300" />
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-gray-900">Ahmad Fauzi</h2>
                                            <div className='w-56 flex flex-row items-center justify-center flex-wrap gap-1'>
                                                <InfoBadge label='Guru' className={jobBadgeMap['Guru'].className} icon={jobBadgeMap['Guru'].icon} />
                                                <InfoBadge label='Kesiswaan' className={jobBadgeMap['Kesiswaan'].className} icon={jobBadgeMap['Kesiswaan'].icon} />
                                                <InfoBadge label='Matematika' className={subjectBadgeMap['Matematika'].className} icon={subjectBadgeMap['Matematika'].icon} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Separator />
                            {/* email and join date info */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {employeeProfile === null ? (
                                            <>
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-gray-500 text-xs">Email</p>
                                                <p className="font-medium text-gray-900">ahmad.fauzi@school.id</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {employeeProfile === null ? (
                                            <>
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-gray-500 text-xs">Bergabung Sejak</p>
                                                <p className="font-medium text-gray-900">01 Januari 2020</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* quick stats */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white flex flex-col gap-4">
                        <h3 className="font-semibold">Statistik Singkat</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-100">Masa Kerja</span>
                                <span className="font-bold">4 Tahun</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-100">Total Kehadiran</span>
                                <span className="font-bold">95%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-100">Slip Gaji</span>
                                <span className="font-bold">48 Slip</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* information details card */}
                <div className='w-full flex flex-col gap-6'>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Informasi Pribadi</h2>
                                    <p className="text-sm text-gray-500">Data pribadi dan identitas</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex flex-col justify-between gap-6">

                                <div className='w-[60%] grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Nama Lengkap
                                        </Label>
                                        <p className="text-base font-semibold text-gray-900">Ahmad Fauzi, S.Pd</p>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Jenis Kelamin
                                        </Label>
                                        <GenderBadge placeholder={"male"} size='sm' />
                                    </div>
                                </div>

                                <div className='w-[60%] grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Tanggal Lahir
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base font-semibold text-gray-900">15 Agustus 1990</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Alamat Email
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <p className="text-base font-semibold text-gray-900">ahmad.fauzi@school.id</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <Label className='text-sm font-medium text-gray-500'>
                                        Alamat Rumah
                                    </Label>
                                    <div className="w-full flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                        <p className="text-base font-semibold text-gray-900">
                                            Jl. Merdeka No. 123, RT 05/RW 03, Kelurahan Sukamaju,
                                            Kecamatan Cikarang Pusat, Bekasi, Jawa Barat 17530
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* work infomation card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Informasi Pekerjaan</h2>
                                    <p className="text-sm text-gray-500">Data kepegawaian dan jabatan</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex flex-col justify-between gap-6">
                                <div className='w-full grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Nama Perusahaan
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            <p className="text-base font-semibold text-gray-900">Yayasan Pendidikan Harapan Bangsa</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Jabatan dan Posisi
                                        </Label>
                                        <div className='flex flex-row gap-1 flex-wrap'>
                                            <InfoBadge label='Guru' className={jobBadgeMap['Guru'].className} icon={jobBadgeMap['Guru'].icon} />
                                            <InfoBadge label='Kesiswaan' className={jobBadgeMap['Kesiswaan'].className} icon={jobBadgeMap['Kesiswaan'].icon} />
                                            <InfoBadge label='Kaprok RPL' className={jobBadgeMap['Kaprok RPL'].className} icon={jobBadgeMap['Kaprok RPL'].icon} />
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Mata Pelajaran
                                        </Label>
                                        <div className="flex items-start gap-2">
                                            <GraduationCap className="text-gray-400 shrink-0 size-5" />
                                            <div className='flex flex-row gap-1 items-center justify-start flex-wrap w-5/6'>
                                                <InfoBadge label='Informatika' className={subjectBadgeMap['Informatika'].className} icon={subjectBadgeMap['Informatika'].icon} />
                                                <InfoBadge label='DDPK RPL' className={subjectBadgeMap['DDPK RPL'].className} icon={subjectBadgeMap['DDPK RPL'].icon} />
                                                <InfoBadge label='KK1 RPL' className={subjectBadgeMap['KK1 RPL'].className} icon={subjectBadgeMap['KK1 RPL'].icon} />
                                                <InfoBadge label='KK2 RPL' className={subjectBadgeMap['KK2 RPL'].className} icon={subjectBadgeMap['KK2 RPL'].icon} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Tanggal Bergabung
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base font-semibold text-gray-900">01 Januari 2020</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}