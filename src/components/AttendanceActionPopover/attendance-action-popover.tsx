"use client";

import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";

import { EllipsisIcon, FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
                        <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-destructive hover:bg-red-800">
                            <Trash2Icon className="text-white" />
                            <p className="text-white text-sm font-medium">Hapus data absensi</p>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}