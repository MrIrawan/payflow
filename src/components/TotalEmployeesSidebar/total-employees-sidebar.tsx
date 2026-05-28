"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { GetAllEmployeesOnCompanyData } from "@/types/response";
import { getAllEmployeesOnCompany } from "@/lib/services/employee/employees/getAllEmployeesOnCompany";

import { UsersIcon } from "lucide-react";
import { Card, CardDescription } from "../ui/card";
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { EmployeeProfileCard } from "../EmployeeProfileCard/employee-profile-card";
import { Skeleton } from "../ui/skeleton";

export function TotalEmployeesSidebar() {
    const params = useParams();
    const companyId = Number(params.companyId);

    const [totalEmployees, setTotalEmployees] = useState<GetAllEmployeesOnCompanyData | undefined>(undefined);

    useEffect(() => {
        async function fetchAllEmployees(companyId: number) {
            const response = await getAllEmployeesOnCompany(companyId);

            if (response.success === false) {
                console.error("error fetch all employees: ", response.message);
                return;
            }

            if (response.data !== null) {
                setTotalEmployees(response.data.data);
            }
        }

        fetchAllEmployees(companyId)
    }, [companyId]);

    console.log(totalEmployees)

    return (
        <Sidebar side="right" className="p-2.5">
            <SidebarHeader className="w-full p-2">
                {totalEmployees === undefined ? (
                    <Skeleton className="w-full h-[25px] rounded-md bg-gray-300" />
                ) : (
                    <Card className="p-0 w-full flex flex-row items-center justify-between gap-1 rounded-none border-none outline-none shadow-none">
                        <div className="w-fit flex flex-row items-center justify-start gap-2">
                            <UsersIcon className="text-muted-foreground" />
                            <CardDescription className="text-base font-medium">Total employees</CardDescription>
                        </div>
                        <div className="w-fit p-0 overflow-hidden">
                            <Separator className="data-[orientation=horizontal]:w-20 bg-muted-foreground" orientation="horizontal" />
                        </div>
                        <div className="w-fit">
                            <CardDescription className="text-base font-medium">{totalEmployees.employees.length}</CardDescription>
                        </div>
                    </Card>
                )}
            </SidebarHeader>
            <SidebarContent className="py-2">
                {totalEmployees === undefined ? (
                    <>
                        <Skeleton className="w-full h-15 bg-gray-300 rounded-xl" />
                        <Skeleton className="w-full h-15 bg-gray-300 rounded-xl" />
                        <Skeleton className="w-full h-15 bg-gray-300 rounded-xl" />
                        <Skeleton className="w-full h-15 bg-gray-300 rounded-xl" />
                        <Skeleton className="w-full h-15 bg-gray-300 rounded-xl" />
                    </>
                ) : (
                    <>
                        <EmployeeProfileCard employeeData={totalEmployees} companyId={companyId} />
                    </>
                )}
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}