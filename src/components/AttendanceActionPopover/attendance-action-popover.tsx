"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { EllipsisIcon, FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Spinner } from "../ui/spinner";
import { deleteAttendanceData } from "@/lib/service/deleteAttendanceData";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

export function AttendanceActionPopover({ attendanceId }: {
    attendanceId: string;
}) {
    return (
        <Popover>
            <PopoverTrigger>
                <EllipsisIcon />
            </PopoverTrigger>
            <PopoverContent align="end" asChild className="p-0">
                <div className="w-[250px] flex flex-col gap-2.5 p-2.5">
                    <div>
                        <CardDescription className="text-xs font-medium">Attendance Actions</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-white hover:bg-muted-foreground/20">
                            <FilePenLineIcon className="text-black" />
                            <p className="text-black text-sm font-semibold">Edit data absensi</p>
                        </Button>
                        <AlertDialogDestructive attendanceId={attendanceId} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export function AlertDialogDestructive({ attendanceId }: {
    attendanceId: string;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const router = useRouter();

    if (isDelete === true) {
        async function deleteAttendance(attendanceId: string) {
            const response = await deleteAttendanceData(attendanceId)

            if (!response.isSuccess) {
                toast.custom(() => <Toaster title="Failed to delete attendance" description={response.message} variant="error" />)
            } else {
                toast.custom(() => <Toaster title="success to delete attendance" description={`attendance data with id <${attendanceId}>, has already deleted.`} variant="success" />)
            }
        }

        deleteAttendance(attendanceId)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-destructive hover:bg-red-800">
                    <Trash2Icon className="text-white" />
                    <p className="text-white text-sm font-medium">Hapus data absensi</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="default">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete attendance?</AlertDialogTitle>
                    <AlertDialogDescription className="font-medium">
                        This will permanently delete this attendance data. are you sure to choose delete option?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" className="w-20" onClick={() => setIsDelete(false)}>
                        <p className="text-sm font-medium">Cancel</p>
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive" className="w-20" onClick={() => setIsDelete(true)}>
                        {isLoading ? (<Spinner className="size-3.5 text-white" />) : (<p className="text-sm font-medium">Delete</p>)}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
