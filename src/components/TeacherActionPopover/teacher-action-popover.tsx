"use client";

import { useState } from "react";

import { EllipsisIcon, FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";

export function TeacherActionPopover({ teacherId }: {
    teacherId: string;
}) {
    return (
        <Popover>
            <PopoverTrigger>
                <EllipsisIcon />
            </PopoverTrigger>
            <PopoverContent align="end" asChild className="p-0">
                <div className="w-[250px] flex flex-col gap-2.5 p-2.5">
                    <CardDescription className="text-xs font-medium">Teacher Actions</CardDescription>
                    {/* action buttons here */}
                    <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-white hover:bg-muted-foreground/20">
                        <FilePenLineIcon className="text-black" />
                        <p className="text-black text-sm font-semibold">Edit data absensi</p>
                    </Button>
                    <AlertDialogDestructive teacherId={teacherId} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export function AlertDialogDestructive({ teacherId }: {
    teacherId: string;
}) {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (isDelete === true) {
        // delete teacher logic here
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-destructive hover:bg-red-800">
                    <Trash2Icon className="text-white" />
                    <p className="text-white text-sm font-medium">Hapus data guru</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="default">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete teacher?</AlertDialogTitle>
                    <AlertDialogDescription className="font-medium">
                        This will permanently delete this teacher data. are you sure to choose delete option?
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