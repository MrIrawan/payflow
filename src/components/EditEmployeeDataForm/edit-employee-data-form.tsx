"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EditEmployeeRequest } from "@/types/request";
import { editEmployee } from "@/lib/services/admin/employee/editEmployee";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

import { BookOpen, Briefcase, Save, UserCircle, Wallet } from "lucide-react";
import { FormComponent, FormContent, FormFooter } from "../Form/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { InputGroup } from "../InputGroup/input-group";
import { SelectGroupComponent } from "../SelectGroup/select-group";
import { GenderBadge } from "../GenderBadge/gender-badge";
import { DatePicker } from "../DatePicker/date-picker";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";


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

export function EditEmployeeDataForm({ currentData, employeeId }: { currentData: EditEmployeeRequest | undefined; employeeId: string; }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<EditEmployeeRequest>({
        defaultValues: {
            full_name: currentData?.full_name,
            home_address: currentData?.home_address,
            gender: currentData?.gender,
            job_title: currentData?.job_title,
            subject_name: currentData?.subject_name,
            total_weekly_hours: currentData?.total_weekly_hours === null ? currentData.total_weekly_hours : 0,
            company: currentData?.company,
            date_of_birth: currentData?.date_of_birth
        }
    });
    const router = useRouter();

    const onSubmit: SubmitHandler<EditEmployeeRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await editEmployee(data, employeeId);

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal mengedit data pegawai" description={`${response.data.message || "kami gagal dalam mengedit data pegawai yang anda mau."}`} />)
                console.log(response)
                return;
            };

            toast.custom(() => <Toaster variant="success" title="berhasil mengedit data pegawai" description="selamat! data pegawai sudah di edit." />)
            router.push("/admin/employee/employee-list");
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="kami tidak dapat memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormComponent className="flex flex-col gap-6" asWrapper={false} onSubmit={handleSubmit(onSubmit)}>
            <FormContent className="flex flex-col gap-4">
                {/* INFORMASI PRIBADI */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm p-6 flex flex-col gap-4">
                    <CardHeader className="bg-white p-0">
                        <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                            <UserCircle className="size-6" />
                            Informasi Pribadi
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="w-full p-0 flex flex-col gap-4">
                        <InputGroup
                            label="Nama Lengkap"
                            htmlFor="full_name"
                            {...register("full_name", { required: true })}
                            aria-invalid={errors.full_name ? "true" : "false"}
                            errorMsg={errors.full_name?.message}
                        />

                        <div className="w-full flex flex-col md:flex-row gap-4 items-start justify-between">
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <SelectGroupComponent
                                        label="Jenis Kelamin"
                                        htmlFor="gender"
                                        placeholder="Pilih jenis kelamin"
                                        items={[
                                            { value: "male", displayText: <GenderBadge placeholder={"male"} size="sm" /> },
                                            { value: "female", displayText: <GenderBadge placeholder={"female"} size="sm" /> },
                                        ]}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                            <Controller
                                name="date_of_birth"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        label="Tanggal Lahir"
                                        htmlFor="date_of_birth"
                                        placeholder="Pilih tanggal"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Label htmlFor="home_address">Alamat Rumah</Label>
                            <Textarea id="home_address" {...register("home_address", { required: true })} aria-invalid={errors.home_address ? "true" : "false"} />
                            {errors.home_address && (
                                <p className="text-sm font-medium text-destructive">
                                    {String(errors.home_address.message)}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* DATA PENGGAJIAN */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="shadow-sm border-gray-200 border-t-4 border-t-green-500 h-full p-6 flex flex-col gap-4">
                            <CardHeader className="bg-white p-0 gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                                    <Wallet className="size-5" />
                                    Data Penggajian
                                </CardTitle>
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-0 w-full flex flex-col gap-4">
                                <InputGroup
                                    label="Total Jam Ajar"
                                    htmlFor="total_weekly_hours"
                                    type="number"
                                    // Ubah input menjadi number
                                    {...register("total_weekly_hours", { valueAsNumber: true, required: true })}
                                    aria-invalid={errors.total_weekly_hours ? "true" : "false"}
                                    errorMsg={errors.total_weekly_hours?.message}
                                />
                                <InputGroup
                                    label="Nama Instansi"
                                    htmlFor="company"
                                    {...register("company", { required: true })}
                                    aria-invalid={errors.company ? "true" : "false"}
                                    errorMsg={errors.company?.message}
                                    readOnly
                                    className="bg-gray-50"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* JABATAN & MAPEL */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* JABATAN */}
                        <Card className="shadow-sm border-gray-200 p-6 flex flex-col gap-4">
                            <CardHeader className="p-0 gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                                    <Briefcase className="size-5" />
                                    Jabatan & Posisi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {/* 6. Controller untuk Array Checkbox Jabatan */}
                                <Controller
                                    name="job_title"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {JOB_TITLES.map((job) => {
                                                const isChecked = field.value?.includes(job);
                                                return (
                                                    <div key={job} className="flex items-center space-x-2 p-1 hover:bg-white rounded transition-colors">
                                                        <Checkbox
                                                            id={`job-${job}`}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value || []), job]);
                                                                } else {
                                                                    field.onChange(field.value?.filter((v: string) => v !== job));
                                                                }
                                                            }}
                                                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                        />
                                                        <Label htmlFor={`job-${job}`} className="text-sm font-medium cursor-pointer text-gray-700 leading-tight">
                                                            {job}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    rules={{ required: true }}
                                />
                            </CardContent>
                        </Card>

                        {/* MATA PELAJARAN */}
                        <Card className="shadow-sm border-gray-200 p-6 flex flex-col gap-4">
                            <CardHeader className="p-0 gap-0">
                                <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                                    <BookOpen className="size-5" />
                                    Mata Pelajaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {/* 7. Controller untuk Array Checkbox Mata Pelajaran */}
                                <Controller
                                    name="subject_name"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-2">
                                            {SUBJECTS.map((subject) => {
                                                const isChecked = field.value?.includes(subject);
                                                return (
                                                    <div key={subject} className="flex items-start space-x-2 p-1 hover:bg-white rounded transition-colors">
                                                        <Checkbox
                                                            id={`sub-${subject}`}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value || []), subject]);
                                                                } else {
                                                                    field.onChange(field.value?.filter((v: string) => v !== subject));
                                                                }
                                                            }}
                                                            className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                        />
                                                        <Label htmlFor={`sub-${subject}`} className="text-sm font-medium cursor-pointer text-gray-700 leading-tight">
                                                            {subject}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    rules={{ required: true }}
                                />
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </FormContent>
            <Separator />
            <FormFooter>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                    {/* Pastikan tombol submit bertipe 'submit' */}
                    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        <Save className="size-4 mr-2" />
                        {isLoading ? "Menyimpan..." : "Simpan Data Pegawai"}
                    </Button>
                    <Button variant="outline" type="button" asChild className="w-full sm:w-auto text-gray-600 hover:bg-gray-100 border-gray-300">
                        <Link href="/admin/employee-list">Batal</Link>
                    </Button>
                </div>
            </FormFooter>
        </FormComponent>
    )
}