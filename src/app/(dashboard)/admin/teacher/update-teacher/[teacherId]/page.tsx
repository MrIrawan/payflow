"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller, FormProvider, useFormContext } from "react-hook-form";
import { UpdateTeacherDataRequest } from "@/types/request";
import { updateTeacherData } from "@/lib/service/admin/teacher/updateTeacherData";
import { getTeacherById } from "@/lib/service/admin/teacher/getTeacherById";

import { DatePicker } from "@/components/DatePicker/date-picker"
import { InputGroup } from "@/components/InputGroup/input-group"
import { SelectGroupComponent } from "@/components/SelectGroup/select-group"
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form"
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { GetTeacherByIdResponse } from "@/types/response";

export default function UpdateTeacherPage({ params }: {
    params: Promise<{ teacherId: string }>
}) {
    const router = useRouter();
    const form = useForm<UpdateTeacherDataRequest>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teacherData, setTeacherData] = useState<GetTeacherByIdResponse | null>(null);

    useEffect(() => {
        async function fetchTeacherData() {
            const { teacherId } = await params;
            const response = await getTeacherById(teacherId);

            if (response && response.isSuccess && response.data) {
                setTeacherData(response.data);
                form.reset({
                    full_name: response.data.data.full_name,
                })
            }
        }

        fetchTeacherData();
    }, [])

    const onSubmit: SubmitHandler<UpdateTeacherDataRequest> = async (data) => {
        setIsLoading(true);

        const response = await updateTeacherData(teacherData?.data.guru_id!, data);

        if (response?.isSuccess) {
            toast.custom(() => <Toaster title="berhasil menyimpan data guru" description={response.data?.message} variant="success" />)
            router.push("/admin/teacher")
        } else {
            toast.custom(() => <Toaster title="gagal menyimpan data guru" description={response?.message || "Terjadi kesalahan saat menyimpan data guru"} variant="error" />)
        }
    }

    return (
        <>
            <section className="w-full p-6">
                <div className="w-full flex flex-col gap-6 items-center">
                    <PageHeader />
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle className="text-4xl font-bold text-black">Update Data Guru</CardTitle>
                            <CardDescription className="text-lg font-medium max-w-xl">Update data guru baru dengan lengkap dan cepat secara real-time dengan fitur manajemen data guru.</CardDescription>
                        </div>
                        <Separator />
                        <FormProvider {...form}>
                            <FormComponent asWrapper={false} onSubmit={form.handleSubmit(onSubmit)}>
                                <FormContent className="flex flex-col gap-6">
                                    <TeacherIdentitySection />
                                    <Separator />
                                    <JobInfoSection />
                                    <Separator />
                                    <ContactInfoSection />
                                </FormContent>
                                <FormFooter>
                                    {/* Form footer actions like submit button */}
                                    <Button className="bg-blue-600 hover:bg-blue-800 w-40">
                                        {isLoading ? (<Spinner />) : (<p className="text-sm font-medium text-white">Simpan data guru</p>)}
                                    </Button>
                                </FormFooter>
                            </FormComponent>
                        </FormProvider>
                    </div>
                </div>
            </section>
        </>
    )
}

function TeacherIdentitySection() {
    const { register, control, formState: { errors } } = useFormContext();

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-row items-start gap-3">
                <span className="rounded-full w-8 h-8 ring-[1.5px] ring-blue-600 flex flex-row justify-center items-center">
                    <h3 className="text-base font-medium text-blue-600">1</h3>
                </span>
                <div className="flex flex-col gap-0">
                    <CardTitle className="text-xl font-semibold text-black">isi identitas guru</CardTitle>
                    <CardDescription className="text-base font-medium max-w-md">kami memerlukan identitas guru untuk kami simpan. semua kolom identitas guru wajib di isi.</CardDescription>
                </div>
            </div>
            {/* input column goes here */}
            <div className="w-full flex flex-row gap-3 items-start">
                <InputGroup
                    label="Nama Lengkap"
                    htmlFor="full_name"
                    type="text"
                    placeholder="Ex: Budi Hermawan"
                    requiredLabel
                    errorMsg={errors.full_name?.message}
                    aria-invalid={errors.full_name ? "true" : "false"}
                    {...register("full_name", {
                        required: {
                            value: true,
                            message: "Nama lengkap wajib diisi"
                        }
                    })}
                />
                <Controller control={control} name="date_of_birth" render={({ field, formState: { errors } }) => (
                    <DatePicker
                        label="Tanggal Lahir"
                        htmlFor="date_of_birth"
                        placeholder="Pilih tanggal lahir"
                        requiredLabel
                        onchange={field.onChange}
                        value={field.value}
                        errorMessage={errors.date_of_birth?.message}
                    />
                )}
                    rules={{
                        required: {
                            value: true,
                            message: "Tanggal lahir wajib di isi"
                        }
                    }}
                />
                <Controller
                    control={control}
                    name="gender"
                    render={({ field, formState: { errors } }) => (
                        <SelectGroupComponent
                            label="Jenis Kelamin"
                            htmlFor="gender"
                            placeholder="Pilih jenis kelamin"
                            requiredLabel
                            items={[
                                { value: "male", displayText: <GenderBadge placeholder={"male"} size="sm" /> },
                                { value: "female", displayText: <GenderBadge placeholder={"female"} size="sm" /> }
                            ]}
                            onvaluechange={field.onChange}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: "Jenis kelamin wajib di isi, pilih antara 'Laki-laki' atau 'Perempuan'"
                        }
                    }}
                />
            </div>
        </div>
    )
}

function JobInfoSection() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-row items-start gap-3">
                <span className="rounded-full w-8 h-8 ring-[1.5px] ring-blue-600 flex flex-row justify-center items-center">
                    <h3 className="text-base font-medium text-blue-600">2</h3>
                </span>
                <div className="flex flex-col gap-0">
                    <CardTitle className="text-xl font-semibold text-black">isi informasi pekerjaan</CardTitle>
                    <CardDescription className="text-base font-medium max-w-xl">kami memerlukan informasi pekerjaan dari guru untuk kami perhitungkan dengan fitur penggajian kami. informasi ini wajib di isi.</CardDescription>
                </div>
            </div>
            {/* input column goes here */}
            <div className="w-full flex flex-row gap-3 items-start">
                <InputGroup
                    label="Nama Jabatan"
                    htmlFor="job_title"
                    type="text"
                    requiredLabel
                    errorMsg={errors.job_title?.message}
                    aria-invalid={errors.job_title ? "true" : "false"}
                    {...register("job_title", {
                        required: {
                            value: true,
                            message: "Nama jabatan wajib diisi"
                        }
                    })}
                />
                <InputGroup
                    label="Nama Prusahaan"
                    htmlFor="company"
                    type="text"
                    requiredLabel
                    aria-invalid={errors.company ? "true" : "false"}
                    errorMsg={errors.company?.message}
                    {...register("company", {
                        required: {
                            value: true,
                            message: "Nama perusahaan wajib diisi"
                        }
                    })}
                />
                <InputGroup
                    label="Gaji Tetap"
                    htmlFor="net_salary"
                    type="number"
                    requiredLabel
                    aria-invalid={errors.net_salary ? "true" : "false"}
                    errorMsg={errors.net_salary?.message}
                    {...register("net_salary", {
                        required: {
                            value: true,
                            message: "Gaji tetap wajib diisi"
                        }, valueAsNumber: true
                    })}
                />
            </div>
        </div>
    )
}

function ContactInfoSection() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-row items-start gap-3">
                <span className="rounded-full w-8 h-8 ring-[1.5px] ring-blue-600 flex flex-row justify-center items-center">
                    <h3 className="text-base font-medium text-blue-600">3</h3>
                </span>
                <div className="flex flex-col gap-0">
                    <CardTitle className="text-xl font-semibold text-black">isi informasi kontak</CardTitle>
                    <CardDescription className="text-base font-medium max-w-xl">kami memerlukan informasi kontak guru untuk kami simpan. informasi ini opsional boleh di isi boleh juga tidak.</CardDescription>
                </div>
            </div>
            {/* input column goes here */}
            <div className="w-full flex flex-row gap-3 items-start">
                <InputGroup
                    label="Alamat Email"
                    htmlFor="email_address"
                    type="email"
                    placeholder="Ex: budihermawan@mail.com"
                    requiredLabel
                    errorMsg={errors.email_address?.message}
                    aria-invalid={errors.email_address ? "true" : "false"}
                    {...register("email_address", {
                        required: {
                            value: true,
                            message: "Alamat email wajib diisi"
                        }
                    })}
                />

                <InputGroup
                    label="Alamat Rumah"
                    htmlFor="home_address"
                    type="text"
                    aria-invalid={errors.home_address ? "true" : "false"}
                    errorMsg={errors.home_address?.message}
                    {...register("home_address", {
                        required: {
                            value: true,
                            message: "Alamat Rumah wajib diisi"
                        }
                    })}
                />
            </div>
        </div>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Update data guru",
                link: [
                    {
                        title: "Dashboard",
                        href: "/admin"
                    }
                ]
            }} />
        </div>
    )
}