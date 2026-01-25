"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { StoreTeacherDataRequest } from "@/types/request";
import { storeTeacherData } from "@/lib/service/storeTeacherData";

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

export default function AddTeacherPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<StoreTeacherDataRequest>();

    const onSubmit: SubmitHandler<StoreTeacherDataRequest> = async (data) => {
        setIsLoading(true);

        const response = await storeTeacherData(data);

        if (response.isSuccess) {
            toast.custom(() => <Toaster title="berhasil menyimpan data guru" description={response.data?.message} variant="success" />)
            router.push("/admin/teacher")
        } else {
            toast.custom(() => <Toaster title="gagal menyimpan data guru" description={response.message} variant="error" />)
        }
    }

    return (
        <>
            <section className="w-full p-6">
                <div className="w-full flex flex-col gap-6 items-center">
                    <PageHeader />
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle className="text-4xl font-bold text-black">Tambah Data Guru</CardTitle>
                            <CardDescription className="text-lg font-medium max-w-xl">Tambah data guru baru dengan lengkap dan cepat secara real-time dengan fitur manajemen data guru.</CardDescription>
                        </div>
                        <Separator />
                        <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)}>
                            <FormContent className="grid grid-cols-2 gap-3">
                                {/* Form fields will go here */}
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
                                <InputGroup
                                    label="Nama Jabatan"
                                    htmlFor="job_title"
                                    type="text"
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
                                    aria-invalid={errors.net_salary ? "true" : "false"}
                                    errorMsg={errors.net_salary?.message}
                                    {...register("net_salary", {
                                        required: {
                                            value: true,
                                            message: "Gaji tetap wajib diisi"
                                        }, valueAsNumber: true
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
                            </FormContent>
                            <FormFooter>
                                {/* Form footer actions like submit button */}
                                <Button className="bg-blue-600 hover:bg-blue-800 w-40">
                                    {isLoading ? (<Spinner />) : (<p className="text-sm font-medium text-white">Simpan data guru</p>)}
                                </Button>
                            </FormFooter>
                        </FormComponent>
                    </div>
                </div>
            </section>
        </>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Tambah data guru",
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