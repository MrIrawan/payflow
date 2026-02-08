"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UpdateTeacherDataRequest } from "@/types/request";

import {
    Drawer,
    DrawerClose,
    DrawerHeader,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger
} from "../ui/drawer";
import { Button } from "../ui/button";

import { InputGroup } from "../InputGroup/input-group";
import { DatePicker } from "../DatePicker/date-picker";
import { FormComponent, FormContent } from "../Form/Form";

import { FilePenLineIcon } from "lucide-react";
import { SelectGroupComponent } from "../SelectGroup/select-group";
import { Spinner } from "../ui/spinner";
import { Toaster } from "../Toaster/toaster";
import { GetAllTeachers } from "@/types/response";
import { GenderBadge } from "../GenderBadge/gender-badge";
import { updateTeacherData } from "@/lib/service/admin/teacher/updateTeacherData";

export function UpdateTeacherDrawer({ teacherData }: {
    teacherData: GetAllTeachers;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<UpdateTeacherDataRequest>({
        defaultValues: {
            full_name: teacherData.full_name,
            date_of_birth: teacherData.date_of_birth ? new Date(teacherData.date_of_birth) : undefined,
            gender: teacherData.gender,
            company: teacherData.company,
            job_title: teacherData.job_title,
            home_address: teacherData.home_address
        }
    });

    const onSubmit: SubmitHandler<UpdateTeacherDataRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await updateTeacherData(teacherData.guru_id, data);

            if (response?.isSuccess === true) {
                toast.custom(() => <Toaster variant="success" title="Berhasil memperbarui data guru" description="Data guru telah berhasil diperbarui." />);
                router.refresh();
                setIsOpen(false);
            } else {
                toast.custom(() => <Toaster variant="error" title="Gagal memperbarui data guru" description={response?.message || "Terjadi kesalahan saat memperbarui data guru."} />);
                router.refresh();
                setIsOpen(false);
            }
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="Gagal memperbarui data guru" description="Terjadi kesalahan saat memperbarui data guru." />);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-white hover:bg-muted-foreground/20">
                    <FilePenLineIcon className="text-black" />
                    <p className="text-black text-sm font-semibold">Update data guru</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="min-w-[600px] flex flex-col justify-between">
                <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)}>
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <DrawerTitle className="text-2xl font-bold">Update Data Guru</DrawerTitle>
                            <DrawerDescription className="text-base font-medium">Update dan simpan data guru secara real-time.</DrawerDescription>
                        </div>
                    </DrawerHeader>
                    <FormContent className="px-4">
                        {/* form fields here */}
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
                        <div className="w-full flex flex-row justify-between items-start gap-3">
                            <Controller control={control} name="date_of_birth" render={({ field, formState: { errors } }) => (
                                <DatePicker
                                    label="Tanggal Lahir"
                                    htmlFor="date_of_birth"
                                    placeholder="Pilih tanggal lahir"
                                    requiredLabel
                                    onChange={field.onChange}
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
                                        onChange={field.onChange}
                                        value={field.value}
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
                    <DrawerFooter className="flex flex-col gap-1.5">
                        <Button variant={"outline"} type="submit" className="border-blue-600 bg-blue-800/70 hover:bg-blue-600/70">
                            {isLoading ? (<Spinner className="text-white" />) : (<p className="text-base font-medium text-white">Update Guru</p>)}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant={"outline"} className="border-red-600 bg-red-800/70 hover:bg-red-600/70">
                                <p className="text-base font-medium text-white">Batalkan Update</p>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </FormComponent>
            </DrawerContent>
        </Drawer>
    )
}