"use client";

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

import { PlusCircleIcon } from "lucide-react";
import { SelectGroupComponent } from "../SelectGroup/select-group";
import { AttendanceBadge } from "../AttendaceBadge/attendance-badge";
import { timeStringToTimestamp } from "@/utils/timeStringToTimestamp";
import { storeTeacherAttendance } from "@/lib/service/storeTeacherAttendance";

export function StoreAttendanceDrawer() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<StoreAttendanceRequest>();
    const onSubmit: SubmitHandler<StoreAttendanceRequest> = (data) => {
        const formattedData = {
            ...data,
            checkin_time: timeStringToTimestamp(data.checkin_time + ":00"),
            checkout_time: timeStringToTimestamp(data.checkout_time + ":00"),
        };

        const response = storeTeacherAttendance(formattedData)
            .then((res) => {
                console.log("Attendance stored successfully:", res);
            })
            .catch((error) => {
                console.error("Error storing attendance:", error);
            });
    }
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant={"outline"} className="border-muted-foreground border-dashed hover:bg-blue-50 hover:border-blue-600 duration-500">
                    <PlusCircleIcon />
                    <p className="text-sm font-medium text-black">Tambah Absensi</p>
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
                        <InputGroup type="text" label="Nama Guru" htmlFor="teacher_name" {...register("teacher_name")} />
                        <DatePicker label="Tanggal Absensi" htmlFor="attendance_date" placeholder="Pilih tanggal absensi" />
                        <div className="flex flex-row gap-2">
                            <InputGroup type="time" label="Waktu Check-in" htmlFor="checkin_time" {...register("checkin_time")} />
                            <InputGroup type="time" label="Waktu Check-out" htmlFor="checkout_time" {...register("checkout_time")} />
                        </div>
                        <Controller
                            control={control}
                            name="attendance_status"
                            render={({ field }) => (
                                <SelectGroupComponent label="Status Absensi" placeholder="Pilih status absensi" items={[
                                    { value: "present", displayText: <AttendanceBadge placeholder="Present" size="sm" /> },
                                    { value: "absent", displayText: <AttendanceBadge placeholder="Absent" size="sm" /> },
                                    { value: "on leave", displayText: <AttendanceBadge placeholder="On Leave" size="sm" /> }
                                ]} onvaluechange={field.onChange} />
                            )}
                        />
                    </FormContent>
                    <DrawerFooter className="flex flex-col gap-1.5">
                        <Button variant={"outline"} type="submit" className="border-blue-600 bg-blue-800/70 hover:bg-blue-600/70">
                            <p className="text-base font-medium text-white">Simpan Absensi</p>
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