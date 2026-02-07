"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { StoreAttendanceRequest } from "@/types/request";

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
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";
import { timeStringToTimestamp } from "@/utils/timeStringToTimestamp";
import { Spinner } from "../ui/spinner";
import { Toaster } from "../Toaster/toaster";
import { updateAttendanceData } from "@/lib/service/admin/attendance/updateAttendanceData";

export function UpdateAttendanceDrawer({ attendanceId }: {
    attendanceId: string;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<StoreAttendanceRequest>();
    const router = useRouter();

    const onSubmitToUpdateAttendance: SubmitHandler<StoreAttendanceRequest> = async (data) => {
        setIsLoading(true);
        try {
            const formattedData = {
                ...data,
                checkin_time: timeStringToTimestamp(data.checkin_time + ":00"),
                checkout_time: timeStringToTimestamp(data.checkout_time + ":00"),
            };

            const response = await updateAttendanceData(attendanceId, formattedData);

            if (response?.isSuccess === false) {
                toast.custom(() => <Toaster title="gagal mengupdate data absensi" description={response.message} variant="error" />)
                setIsOpen(false);
                router.refresh();
                return;
            }

            if (response?.isSuccess) {
                toast.custom(() => <Toaster title="berhasil mengupdate data absensi" description={response.data?.message} variant="success" />)
                setIsOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.custom(() => <Toaster title="terjadi kesalahan" description="gagal mengupdate data absensi" variant="error" />)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-white hover:bg-muted-foreground/20">
                    <FilePenLineIcon className="text-black" />
                    <p className="text-black text-sm font-semibold">Edit data absensi</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="min-w-[500px] flex flex-col justify-between">
                <FormComponent asWrapper={false} onSubmit={handleSubmit(onSubmitToUpdateAttendance)}>
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <DrawerTitle className="text-2xl font-bold">Edit Data Absensi Guru</DrawerTitle>
                            <DrawerDescription className="text-base font-medium">Edit dan simpan data absensi guru secara real-time.</DrawerDescription>
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
                                    onchange={onChange}
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
                                ]} onvaluechange={field.onChange} />
                            )}
                            rules={{ required: { message: "Status absen wajib di isi.", value: true } }}
                        />
                    </FormContent>
                    <DrawerFooter className="flex flex-col gap-1.5">
                        <Button variant={"outline"} type="submit" className="border-blue-600 bg-blue-800/70 hover:bg-blue-600/70">
                            {isLoading ? (<Spinner className="text-white" />) : (<p className="text-base font-medium text-white">Edit Absensi</p>)}
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