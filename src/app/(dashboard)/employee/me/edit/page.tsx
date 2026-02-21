"use client";

import { useState, useEffect } from "react";
import { EditEmployeeProfileRequest } from "@/types/request";
import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";

import EditEmployeeProfileForm from "@/components/EditEmployeeProfileForm/edit-employee-profile-form";

import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { UserCircle, Building, Save, X } from "lucide-react";

export default function EditProfile() {
    const [currentData, setCurrentData] = useState<EditEmployeeProfileRequest | undefined>(undefined);

    useEffect(() => {
        async function fetchCurrentData() {
            const response = await getEmployeeProfile();

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal mengambil data profil" description={`${response.data.message || "kami gagal mengambil data profil kamu saat ini."}`} />)
                return;
            }

            const employeeProfile: EditEmployeeProfileRequest = {
                ...response.data.data,
                date_of_birth: response.data.data.date_of_birth ? new Date(response.data.data.date_of_birth) : new Date(),
                join_date: response.data.data.join_date ? new Date(response.data.data.join_date) : new Date(),
            }

            setCurrentData(employeeProfile);
        }

        fetchCurrentData();
    }, []);

    return (
        <div className="w-full flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Edit Profil Saya
                </h2>
                <p className="text-muted-foreground font-medium">
                    Perbarui informasi pribadi dan detail kepegawaian Anda di sini.
                </p>
            </div>
            {/* form component */}
            {currentData === undefined ? (
                <div className="w-full flex flex-col gap-6">
                    <Card className="shadow-none flex flex-col gap-4">
                        <CardHeader className="bg-white">
                            <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                                <UserCircle className="size-6" />
                                Informasi Pribadi
                            </CardTitle>
                            <CardDescription>Data identitas dasar dan kontak.</CardDescription>
                        </CardHeader>
                        <CardContent className="w-full flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Lengkap</Label>
                                <Skeleton className="w-full h-9 bg-gray-300" />
                            </div>
                            <div className="w-full flex flex-row items-start justify-between gap-3">
                                <div className="w-full flex flex-col gap-2">
                                    <Label>Tanggal Lahir</Label>
                                    <Skeleton className="w-full h-9 bg-gray-300" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Skeleton className="w-full h-9 bg-gray-300" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Alamat Rumah</Label>
                                <Skeleton className="w-full h-16 bg-gray-300" />
                            </div>
                        </CardContent>
                    </Card>
                    {/* work information section */}
                    <Card className="shadow-none flex flex-col gap-4">
                        <CardHeader className="bg-white">
                            <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                                <Building className="size-6" />
                                Informasi Pekerjaan
                            </CardTitle>
                            <CardDescription>Data informasi pekerjaan dan mata pelajaran.</CardDescription>
                        </CardHeader>
                        <CardContent className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Perusahaan</Label>
                                <Skeleton className="w-full h-9 bg-gray-300" />
                            </div>
                            <div className="w-full flex flex-row items-start justify-between gap-3">
                                {/* job title checkbox */}
                                <div className="w-full flex flex-col gap-3">
                                    <Label>Jabatan dan Posisi</Label>
                                    <Separator />
                                    <Skeleton className="w-full h-[300px] bg-gray-300" />
                                </div>
                                {/* subject name checkbox */}
                                <div className="w-full flex flex-col gap-3">
                                    <Label>Mata Pelajaran</Label>
                                    <Separator />
                                    <Skeleton className="w-full h-[300px] bg-gray-300" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <EditEmployeeProfileForm currentData={currentData} />
            )}
        </div>
    );
};