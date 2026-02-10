"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/service/user/profile/getUserProfile";
import { DashboardData } from "@/types/response";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EditUserProfileRequest } from "@/types/request";

import { subjectArray } from "../../../../../../public/static/subject";
import { jobTitle } from "../../../../../../public/static/jobTitle";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb";
import { DatePicker } from "@/components/DatePicker/date-picker";
import { GenderBadge } from "@/components/GenderBadge/gender-badge";
import { InputGroup } from "@/components/InputGroup/input-group";
import { SelectGroupComponent } from "@/components/SelectGroup/select-group";
import { FormComponent, FormContent, FormFooter } from "@/components/Form/Form";
import { CircleXIcon, FilePenIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/Toaster/toaster";
import { editUserProfile } from "@/lib/service/user/profile/editUserProfile";
import { Spinner } from "@/components/ui/spinner";

export default function EditUserProfilePage() {
    const [isLoading, setIsLoading] = useState<boolean>();
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<EditUserProfileRequest>();

    useEffect(() => {
        async function fetchCurrentData() {
            const response = await getUserProfile();

            if (!response.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal mendapatkan data profil" description={response.message} />)
                return;
            } else {
                const currentProfile = response.data?.data.profile;
                console.log(currentProfile)

                reset({
                    full_name: currentProfile?.full_name,
                    company: currentProfile?.company,
                    gender: currentProfile?.gender,
                })
            }
        }

        fetchCurrentData();
    }, [])

    const onSubmit: SubmitHandler<EditUserProfileRequest> = async (data) => {
        setIsLoading(true)

        try {
            const response = await editUserProfile(data);

            if (!response.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal! profil kamu gagal di ubah" description={response.message} />)
                console.log(response)
                return;
            } else {
                toast.custom(() => <Toaster variant="success" title="berhasil! profil kamu berhasil diubah." description="kamu telah berhasil mengubah profil kamu." />)
            }
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="gagal edit profil kamu" description="sesuatu telah terjadi sehingga kami tidak bisa memproses data kamu." />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6">
                <PageHeader />
                <Separator />
                <div className="w-full flex flex-col gap-0.5">
                    <CardTitle className="text-4xl text-black font-bold">Edit Data Profile</CardTitle>
                    <CardDescription className="text-lg font-medium text-muted-foreground max-w-xl">Edit detail dari data profil dan pekerjaan kamu.</CardDescription>
                </div>
                <Card className="p-0">
                    {/* sectioned form here */}
                    <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)} className="w-full shadow-none flex flex-col gap-6 p-4">
                        <FormContent>
                            <div className="flex flex-col gap-3">
                                <CardTitle className="text-xl font-semibold text-black">Informasi diri anda</CardTitle>
                                <Separator />
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <InputGroup
                                            label="Nama Lengkap"
                                            htmlFor="full_name"
                                            type="text"
                                            requiredLabel
                                            {...register("full_name", {
                                                required: { value: true, message: "nama lengkap wajib di isi." },
                                                minLength: { value: 3, message: "minimal panjang nama lengkap adalah 3 huruf." }
                                            })}
                                        />
                                        <Controller
                                            control={control}
                                            name="date_of_birth"
                                            render={({ field, formState: { errors } }) => (
                                                <DatePicker
                                                    label="Tanggal Lahir"
                                                    htmlFor="date_of_birth"
                                                    placeholder="Pilih tanggal"
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    errorMessage={errors.date_of_birth}
                                                />
                                            )}
                                            rules={{
                                                required: { value: true, message: "tanggal lahir wajib di isi." }
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <Controller
                                            control={control}
                                            name="gender"
                                            render={({ field, formState: { errors } }) => (
                                                <SelectGroupComponent
                                                    label="Jenis Kelamin"
                                                    htmlFor="gender"
                                                    placeholder="Pilih jenis kelamin"
                                                    items={[
                                                        { value: "male", displayText: <GenderBadge placeholder={"male"} size="sm" /> },
                                                        { value: "female", displayText: <GenderBadge placeholder={"female"} size="sm" /> },
                                                    ]}
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    errorMessage={errors.gender}
                                                />
                                            )}
                                            rules={{
                                                required: { value: true, message: "jenis kelamin wajib di isi." }
                                            }}
                                        />
                                        <InputGroup
                                            label="Alamat Rumah"
                                            htmlFor="home_address"
                                            type="text"
                                            requiredLabel
                                            {...register("home_address", {
                                                required: { value: true, message: "alamat rumah wajib di isi." },
                                                minLength: { value: 8, message: "minimal panjang alamat rumah adalah 8 huruf." }
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <CardTitle className="text-xl font-semibold text-black">Informasi pekerjaan anda</CardTitle>
                                <Separator />
                                <div className="flex flex-row gap-3">
                                    <InputGroup
                                        label="Nama Perusahaan"
                                        htmlFor="company"
                                        type="text"
                                        requiredLabel
                                        {...register("company", {
                                            required: { value: true, message: "nama perusahaan wajib di isi." },
                                            minLength: { value: 5, message: "minimal panjang huruf nama perusahaan adalah 5 huruf." }
                                        })}
                                    />
                                    <Controller
                                        control={control}
                                        name="join_date"
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Tanggal Bergabung"
                                                htmlFor="join_date"
                                                placeholder="Pilih tanggal bergabung"
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                        rules={{
                                            required: { value: true, message: "tanggal bergabung wajib di isi." }
                                        }}
                                    />
                                </div>
                            </div>
                            {/* input checkbox by shadcn */}
                            <div className="w-full flex flex-row gap-3">
                                <div className="w-full flex flex-col gap-3">
                                    <CardTitle className="text-xl font-semibold text-black">Informasi jabatan anda</CardTitle>
                                    <Separator />
                                    {/* job title checkbox */}
                                    <Controller
                                        control={control}
                                        name="job_title"
                                        render={({ field }) => (
                                            <div className="w-full grid grid-cols-3 gap-6">
                                                {jobTitle.map((job) => (
                                                    <div className="flex flex-row gap-2" key={job}>
                                                        <Checkbox
                                                            id={job}
                                                            checked={field.value?.includes(job)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value ?? []), job]);
                                                                } else {
                                                                    field.onChange(
                                                                        field.value?.filter((item) => item !== job)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label htmlFor={job}>{job}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        rules={{
                                            required: { value: true, message: "informasi jabatan wajib di isi." }
                                        }}
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <CardTitle className="text-xl font-semibold text-black">Informasi mata pelajaran anda</CardTitle>
                                    <Separator />
                                    {/* subject name checkbox */}
                                    <Controller
                                        control={control}
                                        name="subject_name"
                                        render={({ field }) => (
                                            <div className="w-full grid grid-cols-3 gap-6">
                                                {subjectArray.map((subject) => (
                                                    <div className="flex flex-row gap-2" key={subject}>
                                                        <Checkbox
                                                            id={subject}
                                                            checked={field.value?.includes(subject)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange([...(field.value ?? []), subject]);
                                                                } else {
                                                                    field.onChange(
                                                                        field.value?.filter((item) => item !== subject)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <Label htmlFor={subject}>{subject}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        rules={{
                                            required: { value: true, message: "informasi mata pelajaran wajib di isi." }
                                        }}
                                    />
                                </div>
                            </div>
                        </FormContent>
                        <Separator />
                        <FormFooter className="flex flex-row gap-3">
                            <Button variant={"default"} className="min-w-36 bg-blue-600 hover:bg-blue-800 flex flex-row gap-2">
                                {isLoading ? (<Spinner />) : (
                                    <>
                                        <p className="text-sm font-medium text-white">simpan profil</p>
                                        <FilePenIcon className="text-white" />
                                    </>
                                )}
                            </Button>
                            <Button variant={"default"} className="min-w-36 bg-red-600 hover:bg-red-800 flex flex-row gap-2">
                                <p className="text-sm font-medium text-white">batal simpan</p>
                                <CircleXIcon className="text-white" />
                            </Button>
                        </FormFooter>
                    </FormComponent>
                </Card>
            </div>
        </section>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Edit Your Profile",
                link: [
                    {
                        title: "Dashboard",
                        href: "/employee"
                    },
                    {
                        title: "Your Profile",
                        href: "/employee/me"
                    }
                ]
            }} />
        </div>
    )
}