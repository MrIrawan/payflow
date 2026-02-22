"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { StoreEmployeeAttendanceRequest } from "@/types/request";
import { storeEmployeeAttendance } from "@/lib/services/employee/attendance/storeEmployeeAttendance";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

import { FormComponent, FormContent } from "../Form/Form";
import { InputGroup } from "../InputGroup/input-group";
import { DatePicker } from "../DatePicker/date-picker";
import { SelectGroupComponent } from "../SelectGroup/select-group";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";

import { MapPin } from "lucide-react";
import { getUserLocation } from "@/utils/getUserLocation";
import { timeStringToTimestamp } from "@/utils/timeStringToTimestamp";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

export function StoreEmployeeAttendanceDrawer({ teacherName }: { teacherName: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { register, control, formState: { errors }, handleSubmit } = useForm<StoreEmployeeAttendanceRequest>();

    const onSubmit: SubmitHandler<StoreEmployeeAttendanceRequest> = async (data) => {
        setIsLoading(true);

        const locationPromise = getUserLocation();
        const formattedData = {
            ...data,
            checkin_time: timeStringToTimestamp(data.checkin_time + ":00"),
            checkout_time: timeStringToTimestamp(data.checkout_time + ":00"),
            location: await locationPromise
        };

        try {
            const response = await storeEmployeeAttendance(formattedData);

            if (response.data.success === false) {
                toast.custom(() => <Toaster variant="error" title="gagal menambah absensi" description="kami gagal dalam memproses untuk menambahkan absensi untuk anda." />);
                return;
            }

            toast.custom(() => <Toaster variant="success" title="berhasil menambahkan absensi" description="anda telah berhasil menambahkan absensi." />)
        } catch (error) {
            toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "suatu error terjadi sehingga kami tidak bisa memproses."}`} />)
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <MapPin className="size-4" />
                    Absen Sekarang
                </Button>
            </DrawerTrigger>
            <DrawerContent className="min-w-[500px] flex flex-col justify-between">
                <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmit)}>
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <DrawerTitle className="text-2xl font-bold">Tambah Absensi Guru</DrawerTitle>
                            <DrawerDescription className="text-base font-medium">Tambah dan simpan data absensi guru secara real-time.</DrawerDescription>
                        </div>
                    </DrawerHeader>
                    <FormContent className="px-4">
                        {/* form fields here */}
                        <InputGroup
                            type="text"
                            label="Nama Guru"
                            htmlFor="teacher_name"
                            errorMsg={errors.teacher_name?.message}
                            requiredLabel={true}
                            value={teacherName}
                            readOnly
                            aria-invalid={errors.teacher_name ? "true" : "false"}
                            {...register("teacher_name", { required: { message: "Nama guru wajib diisi", value: true } })}
                        />
                        <Controller
                            control={control}
                            name="attendance_date"
                            render={({ field: { onChange, value }, formState: { errors } }) => (
                                <DatePicker
                                    label="Tanggal Absensi"
                                    htmlFor="attendance_date"
                                    placeholder="Pilih tanggal absensi"
                                    onChange={onChange}
                                    value={value}
                                    requiredLabel={true}
                                    errorMessage={errors.attendance_date?.message}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Tanggal absensi wajib di isi."
                                }
                            }}
                        />
                        <div className="flex flex-row gap-2">
                            <InputGroup
                                type="time"
                                label="Waktu Check-in"
                                htmlFor="checkin_time"
                                requiredLabel={true}
                                errorMsg={errors.checkin_time?.message}
                                aria-invalid={errors.checkin_time ? "true" : "false"}
                                {...register("checkin_time", { required: { message: "Waktu check-in wajib diisi", value: true } })}
                            />
                            <InputGroup
                                type="time"
                                label="Waktu Check-out"
                                htmlFor="checkout_time"
                                requiredLabel={true}
                                errorMsg={errors.checkout_time?.message}
                                aria-invalid={errors.checkout_time ? "true" : "false"}
                                {...register("checkout_time", { required: { message: "Waktu check-out wajib diisi", value: true } })}
                            />
                        </div>
                        <Controller
                            control={control}
                            name="attendance_status"
                            render={({ field }) => (
                                <SelectGroupComponent label="Status Absensi" placeholder="Pilih status absensi" requiredLabel htmlFor="attendance_status" items={[
                                    { value: "present", displayText: <AttendanceBadge placeholder="Present" size="sm" /> },
                                    { value: "absent", displayText: <AttendanceBadge placeholder="Absent" size="sm" /> },
                                    { value: "on leave", displayText: <AttendanceBadge placeholder="On Leave" size="sm" /> }
                                ]} onChange={field.onChange} />
                            )}
                            rules={{ required: { message: "Status absen wajib di isi.", value: true } }}
                        />
                    </FormContent>
                    <DrawerFooter className="flex flex-col gap-1.5">
                        <Button variant={"outline"} type="submit" className="border-blue-600 bg-blue-800/70 hover:bg-blue-600/70">
                            {isLoading ? (<Spinner className="text-white" />) : (<p className="text-base font-medium text-white">Simpan Absensi</p>)}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant={"outline"} className="border-red-600 bg-red-800/70 hover:bg-red-600/70">
                                <p className="text-base font-medium text-white">Batal</p>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </FormComponent>
            </DrawerContent>
        </Drawer>
    )
}