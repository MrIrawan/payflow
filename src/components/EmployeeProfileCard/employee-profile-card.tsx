import { EmployeeProfileCardProps } from "@/types/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Building2, CalendarClock, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


export function EmployeeProfileCard({ employeeData }: {
    employeeData: EmployeeProfileCardProps;
}) {
    return (
        <>
            {employeeData.employees.map((data, index) => (
                <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                        <Card className="w-full h-15 p-2 shadow-none transition-all hover:bg-gray-100/50 cursor-pointer">
                            <div className="w-full h-full flex flex-row items-center justify-start gap-2">
                                <Avatar className="w-[15%] h-full rounded-md">
                                    <AvatarFallback className={`h-full rounded-md font-semibold text-white text-sm ${data.gender === "male" ? "bg-blue-500" : "bg-pink-500"}`}>{data.full_name.slice(0, 2)}</AvatarFallback>
                                    <AvatarImage />
                                </Avatar>
                                <div className="w-full h-fit flex flex-col items-start justify-start gap-0">
                                    <CardTitle className="text-sm">{employeeData.currentUser === data.full_name ? `${data.full_name} (You)` : data.full_name}</CardTitle>
                                    <CardDescription className="text-xs font-semibold">{data.email}</CardDescription>
                                </div>
                            </div>
                        </Card>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left" align="start" className="w-96 h-fit p-4 flex flex-col gap-4">
                        <div className="w-full h-[100px]">
                            <Avatar className="h-full w-[100px] rounded-md">
                                <AvatarFallback className={`h-full font-semibold text-3xl text-white ${data.gender === "male" ? "bg-blue-500" : "bg-pink-500"} rounded-md`}>{data.full_name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full h-2/12 flex flex-col gap-0">
                            <h2 className="font-semibold text-black text-xl">{data.full_name}</h2>
                            <h3 className="font-medium text-muted-foreground text-base">{data.email}</h3>
                        </div>
                        <Separator orientation="horizontal" />
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-row items-center justify-start gap-2">
                                <div className="rounded-sm w-10 h-10 bg-blue-100 flex flex-row items-center justify-center">
                                    <Building2 className="text-blue-500 size-5" />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <CardTitle className="text-sm font-semibold">Company Name</CardTitle>
                                    <CardDescription className="text-xs font-medium">{employeeData.companyName}</CardDescription>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-start gap-2">
                                <div className="rounded-sm w-10 h-10 bg-green-100 flex flex-row items-center justify-center">
                                    <CalendarClock className="text-green-500 size-5" />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <CardTitle className="text-sm font-semibold">Join Date</CardTitle>
                                    <CardDescription className="text-xs font-medium">{new Date(data.join_date).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}</CardDescription>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <Button className="bg-blue-600 hover:bg-blue-700 [&_svg:not([class*='size-'])]:size-5">
                                <User2 fill="white" strokeWidth={1} />
                                <p className="text-sm font-medium text-white">See profile</p>
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </>
    )
}