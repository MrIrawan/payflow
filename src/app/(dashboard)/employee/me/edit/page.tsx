"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EditEmployeeProfileRequest } from "@/types/request";
import { getEmployeeProfile } from "@/lib/services/employee/profile/getEmployeeProfile";

import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { InputGroup } from "@/components/InputGroup/input-group";
import { DatePicker } from "@/components/DatePicker/date-picker";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";
import { SelectGroupComponent } from "@/components/SelectGroup/select-group";
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form";

import { UserCircle, Building, Save, X } from "lucide-react";

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

function EditEmployeeProfileForm({ currentData }: {
    currentData: EditEmployeeProfileRequest | undefined
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<EditEmployeeProfileRequest>({
        defaultValues: {
            full_name: currentData ? currentData.full_name : "anjayy",
            company: currentData?.company,
            date_of_birth: currentData?.date_of_birth,
            join_date: currentData?.join_date,
            gender: currentData?.gender,
            home_address: currentData?.home_address,
            job_title: currentData?.job_title,
            subject_name: currentData?.subject_name
        }
    });

    console.log(currentData)

    return (
        <FormComponent asWrapper={false}>
            <FormContent className="flex flex-col gap-6">
                {/* identity information section */}
                <Card className="shadow-none flex flex-col gap-4">
                    <CardHeader className="bg-white">
                        <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                            <UserCircle className="size-6" />
                            Informasi Pribadi
                        </CardTitle>
                        <CardDescription>Data identitas dasar dan kontak.</CardDescription>
                    </CardHeader>
                    <CardContent className="w-full flex flex-col gap-3">
                        <InputGroup
                            type="text"
                            label="Nama Lengkap"
                            htmlFor="full_name"
                            requiredLabel
                            {...register("full_name", {
                                required: {
                                    value: true,
                                    message: "nama lengkap wajib di isi."
                                }
                            })}
                        />
                        <div className="w-full flex flex-row items-start justify-between gap-3">
                            <Controller
                                control={control}
                                name="date_of_birth"
                                render={({ field }) => (
                                    <DatePicker
                                        label="Tanggal Lahir"
                                        htmlFor="date_of_birth"
                                        placeholder="Pilih tanggal"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "tanggal lahir wajib di isi."
                                    }
                                }}
                            />
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <SelectGroupComponent
                                        label="Jenis Kelamin"
                                        htmlFor="gender"
                                        placeholder="Pilih jenis kelamin"
                                        onChange={field.onChange}
                                        value={field.value}
                                        items={[
                                            { displayText: <GenderBadge placeholder={"male"} size="sm" />, value: "male" },
                                            { displayText: <GenderBadge placeholder={"female"} size="sm" />, value: "female" }
                                        ]}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "jenis kelamin wajib di isi."
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Alamat Rumah</Label>
                            <Textarea placeholder="Tulis alamat rumah di sini..." />
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
                        <InputGroup
                            type="text"
                            label="Nama Perusahaan"
                            htmlFor="company"
                            requiredLabel
                            {...register("company", {
                                required: {
                                    value: true,
                                    message: "nama perusahaan wajib di isi."
                                }
                            })}
                        />
                        <div className="w-full flex flex-row items-start justify-between gap-3">
                            {/* job title checkbox */}
                            <div className="w-full flex flex-col gap-3">
                                <Label>Jabatan dan Posisi</Label>
                                <Separator />
                                <div className="w-full grid grid-cols-3 gap-4">
                                    {JOB_TITLES.map((job, index) => (
                                        <Controller
                                            key={index}
                                            name="job_title"
                                            control={control}
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(job);

                                                return (
                                                    <span className="flex flex-row items-center gap-2">
                                                        <Checkbox
                                                            id={`job-${index}`}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value || []), job]);
                                                                } else {
                                                                    field.onChange(
                                                                        field.value?.filter((value: string) => value !== job)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label htmlFor={`job-${index}`} className="font-normal cursor-pointer">
                                                            {job}
                                                        </Label>
                                                    </span>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* subject name checkbox */}
                            <div className="w-full flex flex-col gap-3">
                                <Label>Mata Pelajaran</Label>
                                <Separator />
                                <div className="w-full grid grid-cols-3 gap-4">
                                    {SUBJECTS.map((sub, index) => (
                                        <Controller
                                            key={index}
                                            name="subject_name"
                                            control={control}
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(sub);

                                                return (
                                                    <span className="flex flex-row items-center gap-2">
                                                        <Checkbox
                                                            id={`sub-${index}`}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value || []), sub]);
                                                                } else {
                                                                    field.onChange(
                                                                        field.value?.filter((value: string) => value !== sub)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label htmlFor={`sub-${index}`} className="font-normal cursor-pointer">
                                                            {sub}
                                                        </Label>
                                                    </span>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </FormContent>
            <FormFooter className="flex flex-row gap-3">
                <Button className="w-48 bg-blue-600 hover:bg-blue-800 flex flex-row items-center justify-center gap-2">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <p className="text-sm text-white">simpan perubahan</p>
                            <Save />
                        </>
                    )}
                </Button>
                <Button className="w-48 bg-red-600 hover:bg-red-800 flex flex-row gap-2 items-center justify-center">
                    <p className="text-sm text-white">batalkan perubahan</p>
                    <X />
                </Button>
            </FormFooter>
        </FormComponent>
    )
}