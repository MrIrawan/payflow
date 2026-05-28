import { EmployeeProfileCardProps } from "@/types/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BookOpen, Building2, CalendarClock, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";


export function EmployeeProfileCard({ employeeData, companyId }: {
    employeeData: EmployeeProfileCardProps;
    companyId?: number;
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
                    {/* dropdown content */}
                    <DropdownMenuContent side="left" align="start" className="w-80 p-0 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                        {/* Header — avatar + identity */}
                        <div className="flex flex-row items-center gap-3 px-4 pt-4 pb-3">
                            <Avatar className="w-12 h-12 rounded-lg shrink-0">
                                <AvatarFallback className={`w-full h-full font-bold text-base text-white ${data.gender === "male" ? "bg-blue-500" : "bg-pink-500"} rounded-lg`}>
                                    {data.full_name.slice(0, 2)}
                                </AvatarFallback>
                                <AvatarImage />
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-semibold text-gray-900 truncate">
                                        {employeeData.currentUser === data.full_name ? `${data.full_name} (You)` : data.full_name}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground truncate">{data.email}</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Info rows */}
                        <div className="flex flex-col gap-0 px-2 py-2">
                            {/* Company */}
                            <div className="flex flex-row items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                                    <Building2 className="size-5 text-blue-500" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-gray-800 truncate">{employeeData.companyName}</span>
                                    <span className="text-xs text-muted-foreground">Company Name</span>
                                </div>
                            </div>

                            {/* Join Date */}
                            <div className="flex flex-row items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center shrink-0">
                                    <CalendarClock className="size-5 text-green-500" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-gray-800 truncate">
                                        {new Date(data.join_date).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                    <span className="text-xs text-muted-foreground">Join Date</span>
                                </div>
                            </div>

                            {/* Department — dummy field */}
                            <div className="flex flex-row items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
                                    <BookOpen className="size-5 text-purple-500" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-gray-800 truncate">{data.job_title?.[0] ?? "—"}</span>
                                    <span className="text-xs text-muted-foreground">Job Title</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Footer action */}
                        <div className="px-3 py-2.5">
                            <Link href={`/employee/${companyId}/me`}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 text-xs font-medium [&_svg:not([class*='size-'])]:size-4"
                                >
                                    <User2 strokeWidth={1.5} />
                                    Lihat Profil Lengkap
                                </Button>
                            </Link>
                        </div>
                    </DropdownMenuContent>
                    {/* dropdown content end */}
                </DropdownMenu>
            ))}
        </>
    )
}