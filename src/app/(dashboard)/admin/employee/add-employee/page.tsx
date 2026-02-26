"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Save,
    UserCircle,
    KeyRound,
    Briefcase,
    BookOpen,
    Wallet
} from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form";
import { Separator } from "@/components/ui/separator";
import { InputGroup } from "@/components/InputGroup/input-group";
import { AddEmployeeRequest } from "@/types/request"; // Pastikan path ini benar
import { SelectGroupComponent } from "@/components/SelectGroup/select-group";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";
import { DatePicker } from "@/components/DatePicker/date-picker";
import { addEmployee } from "@/lib/services/admin/employee/addEmployee";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<AddEmployeeRequest>({
        defaultValues: {
            job_title: [],
            subject_name: [],
            company: "SMK Nurjamilah"
        }
    });

    const onSubmit: SubmitHandler<AddEmployeeRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await addEmployee(data);

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal menambahkan pegawai" description={`${response.data.message || "kami gagal dalam menambahkan pegawai yang anda mau."}`} />)
                console.log(response)
                return;
            };

            toast.custom(() => <Toaster variant="success" title="berhasil menambahkan pegawai" description="selamat! pegawai sudah di tambahkan dan di daftarkan" />)
            router.push("/admin/employee/employee-list");
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="kami tidak dapat memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full min-h-screen gap-6 p-4 sm:p-6 bg-gray-50/50 pb-20">
            <PageHeader />
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Tambah <span className="text-blue-600">Pegawai Baru</span>
                </h1>
                <p className="text-muted-foreground font-medium mt-1">
                    Isi formulir di bawah ini untuk mendaftarkan akun dan data kepegawaian baru.
                </p>
            </div>

            <FormComponent className="flex flex-col gap-6" asWrapper={false} onSubmit={handleSubmit(onSubmit)}>
                <FormContent className="flex flex-col gap-4">
                    <Card className="border-t-4 border-t-amber-500 shadow-sm p-6 flex flex-col gap-4">
                        <CardHeader className="w-full bg-white p-0">
                            <CardTitle className="flex items-center gap-2 text-xl text-amber-600">
                                <KeyRound className="size-6" />
                                Kredensial Login
                            </CardTitle>
                            <CardDescription>Email dan password untuk akses aplikasi PayFlow.</CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="w-full p-0 flex flex-col sm:flex-row gap-3">
                            <InputGroup
                                label="Alamat Email"
                                htmlFor="email_address"
                                type="email"
                                {...register("email_address", { required: true })}
                                aria-invalid={errors.email_address ? "true" : "false"}
                                errorMsg={errors.email_address?.message}
                            />
                            <InputGroup
                                label="Password Awal"
                                htmlFor="password_email"
                                type="password"
                                {...register("password_email", { required: true })}
                                aria-invalid={errors.password_email ? "true" : "false"}
                                errorMsg={errors.password_email?.message}
                            />
                        </CardContent>
                    </Card>

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
        </div>
    );
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Add Employee",
                link: [
                    { title: "Dashboard", href: "/admin" },
                    { title: "Employee", href: "/admin" }
                ]
            }} />
        </div>
    )
}