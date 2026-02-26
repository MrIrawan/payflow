"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";
// import { deleteTeacherData } from "@/lib/service/deleteTeacherData";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CardDescription } from "../ui/card";
import { Button } from "../ui/button";
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
    AlertDialogTrigger
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";
import { EllipsisIcon, FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Teacher } from "@/types/base";
import Link from "next/link";
// import { UpdateTeacherDrawer } from "../UpdateTeacherDrawer/update-teacher-drawer";

export function TeacherActionPopover({ teacherData }: {
    teacherData: Teacher;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <EllipsisIcon />
            </PopoverTrigger>
            <PopoverContent align="end" asChild className="p-0">
                <div className="w-[250px] flex flex-col gap-2.5 p-2.5">
                    <CardDescription className="text-xs font-medium">Teacher Actions</CardDescription>
                    {/* action buttons here */}
                    <Link href={`/admin/employee/edit-employee/${teacherData.guru_id}`}>
                        <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-white hover:bg-muted-foreground/20">
                            <FilePenLineIcon className="text-black" />
                            <p className="text-black text-sm font-semibold">Update data guru</p>
                        </Button>
                    </Link>
                    {/* delete teacher alert dialog */}
                    {/* <DeleteTeacherDialog dataId={teacherData.guru_id} /> */}
                </div>
            </PopoverContent>
        </Popover>
    )
}

// function DeleteTeacherDialog({ dataId }: { dataId: string }) {
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     async function deleteTeacherHandler() {
//         setIsLoading(true);

//         try {
//             const response = await deleteTeacherData(dataId);

//             if (response.isSuccess === true) {
//                 console.log(response);
//                 toast.custom(() => <Toaster title="success to delete teacher data" description={response.message} variant="success" />)
//             } else {
//                 console.log(response);
//                 toast.custom(() => <Toaster title="failed to delete teacher data" description={response.message} variant="error" />)
//             }
//         } catch (error) {
//             toast.custom(() => <Toaster title="something went error" description="there is an error while delete teacher data proccess" variant="error" />)
//         } finally {
//             setIsLoading(false);
//         }
//     }
//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button variant={"default"} size={"sm"} className="w-fit h-fit flex flex-row gap-2 p-2 bg-destructive hover:bg-red-800">
//                     <Trash2Icon className="text-white" />
//                     <p className="text-white text-sm font-medium">Hapus data guru</p>
//                 </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent size="default">
//                 <AlertDialogHeader>
//                     <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
//                         <Trash2Icon />
//                     </AlertDialogMedia>
//                     <AlertDialogTitle>Delete teacher?</AlertDialogTitle>
//                     <AlertDialogDescription className="font-medium">
//                         This will permanently delete this teacher data. are you sure to choose delete option?
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel variant="outline" className="w-20">
//                         <p className="text-sm font-medium">Cancel</p>
//                     </AlertDialogCancel>
//                     <AlertDialogAction variant="destructive" className="w-20" onClick={deleteTeacherHandler}>
//                         {isLoading ? (<Spinner className="size-3.5 text-white" />) : (<p className="text-sm font-medium">Delete</p>)}
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }