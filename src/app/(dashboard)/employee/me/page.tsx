'use client';

import { useState, useEffect } from "react";

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
import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { GetEmployeeProfileData } from "@/types/response";

export default function UserProfile() {
    const [employeeProfile, setEmployeeProfile] = useState<GetEmployeeProfileData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchEmployeeProfile() {
            setIsLoading(true);

            try {
                const response = await getEmployeeProfile();

                if (response.data.success === false) {
                    toast.custom(() => <Toaster variant="error" title="kami tidak bisa mengambil data profil" description={`${response.data.message || "maaf, mungkin anda belum mendaftar atau belum masuk."}`} />)
                }

                setEmployeeProfile(response.data.data)
            } catch (error) {
                toast.custom(() => <Toaster variant="error" title="maaf kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployeeProfile();
    }, []);

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
                                {employeeProfile === undefined ? (
                                    <Skeleton className="w-32 h-32 rounded-full bg-gray-300" />
                                ) : (
                                    <Avatar className='w-32 h-32 rounded-full flex items-center justify-center'>
                                        <AvatarFallback className={`${employeeProfile.gender === "male" ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-gradient-to-br from-pink-500 to-pink-600"} text-3xl font-bold text-white`}>{employeeProfile.full_name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                )}

                                <div className='flex flex-col gap-1 items-center'>
                                    {employeeProfile === undefined ? (
                                        <>
                                            <Skeleton className="w-[200px] bg-gray-300 h-[25px]" />
                                            <Skeleton className="w-[300px] h-[70px] bg-gray-300" />
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-gray-900">{employeeProfile.full_name}</h2>
                                            {employeeProfile.job_title ? (
                                                <div className='w-56 flex flex-row items-center justify-center flex-wrap gap-1'>
                                                    <InfoBadge label='Guru' className={jobBadgeMap['Guru'].className} icon={jobBadgeMap['Guru'].icon} />
                                                    <InfoBadge label='Kesiswaan' className={jobBadgeMap['Kesiswaan'].className} icon={jobBadgeMap['Kesiswaan'].icon} />
                                                    <InfoBadge label='Matematika' className={subjectBadgeMap['Matematika'].className} icon={subjectBadgeMap['Matematika'].icon} />
                                                </div>
                                            ) : (
                                                <div className='w-56 flex flex-row items-center justify-center flex-wrap gap-1'>
                                                    <p className="text-sm font-medium">Belum ada deskripsi pekerjaan.</p>
                                                </div>
                                            )}
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
                                        {employeeProfile === undefined ? (
                                            <>
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-gray-500 text-xs">Email</p>
                                                <p className="font-medium text-gray-900">{employeeProfile.email_address}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {employeeProfile === undefined ? (
                                            <>
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                                <Skeleton className="w-[100px] h-[15px] bg-gray-300" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-gray-500 text-xs">Bergabung Sejak</p>
                                                <p className="font-medium text-gray-900">{employeeProfile.join_date ? employeeProfile.join_date : "belum ada deskripsi tanggal bergabung"}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
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
                                        {employeeProfile === undefined ? (
                                            <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                        ) : (
                                            <p className="text-base font-semibold text-gray-900">{employeeProfile?.full_name}</p>
                                        )}
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Jenis Kelamin
                                        </Label>
                                        {employeeProfile === undefined ? (
                                            <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                        ) : (
                                            <GenderBadge placeholder={employeeProfile?.gender as "male" | "female"} size='sm' />
                                        )}
                                    </div>
                                </div>

                                <div className='w-[60%] grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Tanggal Lahir
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <p className="text-base font-semibold text-gray-900">{employeeProfile?.date_of_birth}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Alamat Email
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <p className="text-base font-semibold text-gray-900">{employeeProfile?.email_address}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <Label className='text-sm font-medium text-gray-500'>
                                        Alamat Rumah
                                    </Label>
                                    <div className="w-full flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                        {employeeProfile === undefined ? (
                                            <Skeleton className="w-[80%] h-[35px] bg-gray-300" />
                                        ) : (
                                            <p className="text-base font-semibold text-gray-900">
                                                {employeeProfile?.home_address ? employeeProfile.home_address : "belum ada deskripsi alamat rumah."}
                                            </p>
                                        )}
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
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <p className="text-base font-semibold text-gray-900">{employeeProfile?.company}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Jabatan dan Posisi
                                        </Label>
                                        <>
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <>
                                                    {employeeProfile?.job_title ? (
                                                        <div className='flex flex-row gap-1 flex-wrap'>
                                                            <InfoBadge label='Guru' className={jobBadgeMap['Guru'].className} icon={jobBadgeMap['Guru'].icon} />
                                                            <InfoBadge label='Kesiswaan' className={jobBadgeMap['Kesiswaan'].className} icon={jobBadgeMap['Kesiswaan'].icon} />
                                                            <InfoBadge label='Kaprok RPL' className={jobBadgeMap['Kaprok RPL'].className} icon={jobBadgeMap['Kaprok RPL'].icon} />
                                                        </div>
                                                    ) : (
                                                        <p className="text-base font-semibold text-gray-900">belum ada deskripsi jabatan dan posisi</p>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>

                                <div className='w-full grid grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Mata Pelajaran
                                        </Label>
                                        <div className="flex items-start gap-2">
                                            <GraduationCap className="text-gray-400 shrink-0 size-5" />
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <>
                                                    {employeeProfile?.subject_name ? (
                                                        <div className='flex flex-row gap-1 items-center justify-start flex-wrap w-5/6'>
                                                            <InfoBadge label='Informatika' className={subjectBadgeMap['Informatika'].className} icon={subjectBadgeMap['Informatika'].icon} />
                                                            <InfoBadge label='DDPK RPL' className={subjectBadgeMap['DDPK RPL'].className} icon={subjectBadgeMap['DDPK RPL'].icon} />
                                                            <InfoBadge label='KK1 RPL' className={subjectBadgeMap['KK1 RPL'].className} icon={subjectBadgeMap['KK1 RPL'].icon} />
                                                            <InfoBadge label='KK2 RPL' className={subjectBadgeMap['KK2 RPL'].className} icon={subjectBadgeMap['KK2 RPL'].icon} />
                                                        </div>
                                                    ) : (
                                                        <p className="text-base font-semibold text-gray-900">belum ada deskripsi mata pelajaran</p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='text-sm font-medium text-gray-500'>
                                            Tanggal Bergabung
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {employeeProfile === undefined ? (
                                                <Skeleton className="w-[80%] h-[20px] bg-gray-300" />
                                            ) : (
                                                <p className="text-base font-semibold text-gray-900">{employeeProfile.join_date ? employeeProfile.join_date : "belum ada deskripsi tanggal bergabung"}</p>
                                            )}
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