"use client";

import { useState } from "react";
import { EmployeeDataCardData } from "@/types/types";

import { DataCard, DataCardBody, DataCardFooter, DataCardHeader } from "../DataCard/data-card";
import { WalletIcon, CalendarCheckIcon, ScrollTextIcon } from "lucide-react";
import { CardDescription, CardTitle } from "../ui/card";

export function EmployeeDataCard() {
    const [employeeData, setEmployeeData] = useState<EmployeeDataCardData>();

    return (
        <div className="w-full flex flex-row justify-between items-center gap-3">
            <DataCard className="h-[200px] flex flex-col justify-between">
                <DataCardHeader className="w-full flex flex-row items-center justify-between">
                    <span className="p-2.5 rounded-md bg-gray-200 flex flex-row items-center justify-center">
                        <WalletIcon className="size-6 text-black" />
                    </span>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                </DataCardHeader>
                <DataCardBody className="p-0 flex flex-col gap-1.5">
                    <CardTitle className="text-3xl font-bold">Rp. 2.500.000.00,-</CardTitle>
                    <CardDescription className="font-medium">Current Salary</CardDescription>
                </DataCardBody>
                <DataCardFooter className="p-0">
                    <p className="text-sm font-medium text-muted-foreground">Berdasarkan perhitungan dari data.</p>
                </DataCardFooter>
            </DataCard>
            <DataCard className="h-[200px] flex flex-col justify-between">
                <DataCardHeader className="w-full flex flex-row items-center justify-between">
                    <span className="p-2.5 rounded-md bg-gray-200 flex flex-row items-center justify-center">
                        <CalendarCheckIcon className="size-6 text-black" />
                    </span>
                    <p className="text-sm font-medium text-muted-foreground">January</p>
                </DataCardHeader>
                <DataCardBody className="p-0 flex flex-col gap-1.5">
                    <CardTitle className="text-3xl font-bold">14</CardTitle>
                    <CardDescription className="font-medium">Day's Worked</CardDescription>
                </DataCardBody>
                <DataCardFooter className="p-0">
                    <p className="text-sm font-medium text-muted-foreground">Anda telah berkerja keras!</p>
                </DataCardFooter>
            </DataCard>
            <DataCard className="h-[200px] flex flex-col justify-between">
                <DataCardHeader className="w-full flex flex-row items-center justify-between">
                    <span className="p-2.5 rounded-md bg-gray-200 flex flex-row items-center justify-center">
                        <ScrollTextIcon className="size-6 text-black" />
                    </span>
                    <p className="text-sm font-medium text-muted-foreground">By History</p>
                </DataCardHeader>
                <DataCardBody className="p-0 flex flex-col gap-1.5">
                    <CardTitle className="text-3xl font-bold">14</CardTitle>
                    <CardDescription className="font-medium">Receiving Payslips</CardDescription>
                </DataCardBody>
                <DataCardFooter className="p-0">
                    <p className="text-sm font-medium text-muted-foreground">Hasil kerja keras anda!</p>
                </DataCardFooter>
            </DataCard>
        </div>
    )
}