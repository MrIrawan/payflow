import { EmployeeProfileCardProps } from "@/types/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";


export function EmployeeProfileCard({ employeeData }: {
    employeeData: EmployeeProfileCardProps[];
}) {
    return (
        <>
            {employeeData.map((data, index) => (
                <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                        <Card className="w-full h-14 p-2 shadow-none transition-all hover:bg-gray-100/50 cursor-pointer">
                            <div className="w-full h-full flex flex-row items-center justify-start gap-2">
                                <Avatar className="w-[15%] h-full rounded-full">
                                    <AvatarFallback className="h-full rounded-full">AV</AvatarFallback>
                                    <AvatarImage />
                                </Avatar>
                                <div className="w-full h-full flex flex-col items-start justify-start gap-0">
                                    <CardTitle className="text-sm">{data.full_name}</CardTitle>
                                    <CardDescription className="text-xs font-semibold">{data.email}</CardDescription>
                                </div>
                            </div>
                        </Card>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left" align="start" className="w-96 h-96">
                        <div className="w-full h-2/6 bg-red-200">
                            <Avatar className="h-full w-2/6">
                                <AvatarFallback className="h-full">AV</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full h-2/12 bg-green-300"></div>
                        <div className="w-full"></div>
                        <div className="w-full"></div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </>
    )
}