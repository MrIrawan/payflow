"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { StoreTeacherDataRequest } from "@/types/request";

import { DatePicker } from "@/components/DatePicker/date-picker"
import { InputGroup } from "@/components/InputGroup/input-group"
import { SelectGroupComponent } from "@/components/SelectGroup/select-group"
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form"
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AddTeacherPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { isValid, errors } } = useForm<StoreTeacherDataRequest>();

    const onSubmit: SubmitHandler<StoreTeacherDataRequest> = async (data) => {
        console.log(data);
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
                            <FormContent className="grid grid-cols-2">
                                {/* Form fields will go here */}
                                <InputGroup
                                    label="Nama Lengkap"
                                    htmlFor="full_name"
                                    type="text"
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
                                    errorMsg={errors.email_address?.message}
                                    aria-invalid={errors.email_address ? "true" : "false"}
                                    {...register("email_address", {
                                        required: {
                                            value: true,
                                            message: "Alamat email wajib diisi"
                                        }
                                    })}
                                />
                                <DatePicker
                                    label="Tanggal Lahir"
                                    htmlFor="date_of_birth"
                                    placeholder="Pilih tanggal lahir"
                                />
                                <SelectGroupComponent
                                    label="Jenis Kelamin"
                                    htmlFor="gender"
                                    placeholder="Pilih jenis kelamin"
                                    items={[
                                        { value: "male", displayText: "Laki-laki" },
                                        { value: "female", displayText: "Perempuan" }
                                    ]}
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
                            </FormContent>
                            <FormFooter>
                                {/* Form footer actions like submit button */}
                                <Button className="bg-blue-600 hover:bg-blue-800">Simpan data guru</Button>
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