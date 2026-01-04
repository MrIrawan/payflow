import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { FormComponent, FormContent } from "../Form/Form";
import { InputGroup } from "../InputGroup/input-group";
import { DatePicker } from "../DatePicker/date-picker";

export function AddAttendanceModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="border-muted-foreground border-dashed flex flex-row items-center">
                    <PlusCircleIcon />
                    <p className="text-sm font-medium text-black">Add Attendance</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px] h-[700px] rounded-xl flex flex-col">
                <DialogHeader className="h-fit flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start">
                        <DialogTitle className="text-xl font-bold">Store Teacher Attendance</DialogTitle>
                        <DialogDescription className="text-base font-medium">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</DialogDescription>
                    </div>
                </DialogHeader>
                {/* form store attendance here */}
                <div className="w-full h-full">
                    <FormComponent asWrapper={false}>
                        <FormContent>
                            {/* form fields here */}
                            <InputGroup
                                type="text"
                                label="Teacher Name"
                                htmlFor="teacher_name"
                                placeholder="teacher name here..."
                            />
                            <DatePicker
                                label="Attendance Date"
                                htmlFor="attendance_date"
                                placeholder="Pick attendance date"
                            />
                            <div className="flex flex-row items-center gap-3">
                                <InputGroup
                                    type="time"
                                    label="Check-in Time"
                                    htmlFor="checkin_time"
                                />
                                <InputGroup
                                    type="time"
                                    label="Check-out Time"
                                    htmlFor="checkout_time"
                                />
                            </div>
                            <DatePicker
                                label="Attendance Status"
                                htmlFor="attendance_status"
                                placeholder="Pick attendance status"
                            />
                        </FormContent>
                    </FormComponent>
                </div>
                <DialogFooter className="h-fit">
                    <Button type="submit" className="w-full bg-blue-600 text-sm font-medium text-white">Store Teacher Attendance</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}