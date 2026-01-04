import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerHeader, DrawerContent, DrawerFooter, DrawerTitle, DrawerDescription, DrawerTrigger } from "../ui/drawer";
import { FormComponent, FormContent } from "../Form/Form";
import { InputGroup } from "../InputGroup/input-group";
import { DatePicker } from "../DatePicker/date-picker";

export function StoreAttendanceDrawer() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant={"outline"} className="border-muted-foreground border-dashed">
                    <PlusCircleIcon />
                    <p className="text-sm font-medium text-black">Store Attendance</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="min-w-[500px] flex flex-col justify-between">
                <DrawerHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <DrawerTitle className="text-2xl font-bold">Store Teacher Attendance</DrawerTitle>
                        <DrawerDescription className="text-base font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</DrawerDescription>
                    </div>
                </DrawerHeader>
                <FormComponent asWrapper={false} className="px-4">
                    <FormContent>
                        {/* form fields here */}
                        <InputGroup type="text" label="Teacher Name" htmlFor="teacher_name" />
                        <DatePicker label="Attendance Date" htmlFor="attendance_date" placeholder="Pick attendance date" />
                        <div className="flex flex-row gap-2">
                            <InputGroup type="time" label="Check-in Time" htmlFor="checkin_time" />
                            <InputGroup type="time" label="Check-out Time" htmlFor="checkout_time" />
                        </div>
                        <DatePicker label="Attendance Status" htmlFor="attendance_status" placeholder="Pick attendance status" />
                    </FormContent>
                </FormComponent>
                <DrawerFooter className="flex flex-col gap-1.5">
                    <Button variant={"outline"} className="border-blue-600 bg-blue-800/70 hover:bg-blue-600/70">
                        <p className="text-base font-medium text-white">Store Attendance</p>
                    </Button>
                    <DrawerClose asChild>
                        <Button variant={"outline"} className="border-red-600 bg-red-800/70 hover:bg-red-600/70">
                            <p className="text-base font-medium text-white">Cancel</p>
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}