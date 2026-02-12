"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UpdateTeacherDataRequest } from "@/types/request";

import { FormComponent, FormContent, FormFooter } from "../Form/Form";
import { InputGroup } from "../InputGroup/input-group";
import { CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { DatePicker } from "../DatePicker/date-picker";
import { SelectGroupComponent } from "../SelectGroup/select-group";
import { GenderBadge } from "../GenderBadge/gender-badge";
import { jobTitle } from "../../../public/static/jobTitle";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { subjectArray } from "../../../public/static/subject";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { CircleXIcon, FilePenIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";
import { updateTeacherData } from "@/lib/service/admin/teacher/updateTeacherData";

export function UpdateTeacherForm({ currentData }: { currentData: UpdateTeacherDataRequest }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset, // Ambil fungsi reset
        formState: { errors }
    } = useForm<UpdateTeacherDataRequest>({
        // Gunakan defaultValues untuk inisialisasi awal (kosong/default)
        defaultValues: currentData
    });

    // MAGIC FIX: Reset form ketika props 'currentData' berubah/tersedia
    useEffect(() => {
        if (currentData) {
            reset(currentData);
        }
    }, [currentData, reset]);

    const onSubmit: SubmitHandler<UpdateTeacherDataRequest> = async (data) => {
        setIsLoading(true)

        try {
            const response = await updateTeacherData(currentData.guru_id, data);

            if (!response.isSuccess) {
                toast.custom(() => <Toaster variant="error" title="gagal update data guru" description={response.message} />)
                return;
            };

            toast.custom(() => <Toaster title="berhasil update data guru!" description={`guru dengan id ${currentData.guru_id}, berhasil di update.`} />);
            router.push("/admin/teacher");
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="gagal memproses permintaan" description={`${error || "sesuatu telah terjadi, kami gagal memproses permintaan anda."}`} />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)} className="w-full shadow-none flex flex-col gap-6">
            <FormContent>
                <div className="flex flex-col gap-3">
                    <CardTitle className="text-xl font-semibold text-black">Informasi diri guru</CardTitle>
                    <Separator className="ring-border ring border-none bg-border" />
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">
                            <InputGroup
                                label="Nama Lengkap"
                                htmlFor="full_name"
                                type="text"
                                requiredLabel
                                aria-invalid={errors.full_name ? "true" : "false"}
                                errorMsg={errors.full_name?.message}
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
                                        errorMessage={errors.date_of_birth?.message}
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
                                        errorMessage={errors.gender?.message}
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
                                aria-invalid={errors.home_address ? "true" : "false"}
                                errorMsg={errors.home_address?.message}
                                {...register("home_address", {
                                    required: { value: true, message: "alamat rumah wajib di isi." },
                                    minLength: { value: 8, message: "minimal panjang alamat rumah adalah 8 huruf." }
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <CardTitle className="text-xl font-semibold text-black">Informasi pekerjaan guru</CardTitle>
                    <Separator className="ring-border ring border-none bg-border" />
                    <div className="flex flex-row gap-3">
                        <InputGroup
                            label="Nama Perusahaan"
                            htmlFor="company"
                            type="text"
                            requiredLabel
                            aria-invalid={errors.company ? "true" : "false"}
                            errorMsg={errors.company?.message}
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
                        <CardTitle className="text-xl font-semibold text-black">Informasi jabatan guru</CardTitle>
                        <Separator className="ring-border ring border-none bg-border" />
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
                        <CardTitle className="text-xl font-semibold text-black">Informasi mata pelajaran guru</CardTitle>
                        <Separator className="ring-border ring border-none bg-border" />
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
    )
}