"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { getAllTeachers } from "@/lib/service/getAllTeachers";

import {
    DataCard,
    DataCardBody,
    DataCardFooter,
    DataCardHeader
} from "../DataCard/data-card";
import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

import {
    ArrowRightIcon,
    MarsIcon,
    UsersIcon,
    VenusIcon
} from "lucide-react";

export function TeachersDataCard() {
    const [maleTeachers, setMaleTeachers] = useState<number>(0);
    const [femaleTeachers, setFemaleTeachers] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        async function getTeacherByGender() {
            try {
                const response = await getAllTeachers();

                const maleCount = response.data?.data.filter((teacher) => teacher.gender === "male").length;
                const femaleCount = response.data?.data.filter((teacher) => teacher.gender === "female").length;

                setMaleTeachers(maleCount || 0);
                setFemaleTeachers(femaleCount || 0);
            } catch (error) {
                console.error("get teacher by gender error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getTeacherByGender();
    }, [])

    return (
        <div className="flex flex-row justify-between items-center gap-6">
            <DataCard>
                <DataCardHeader>
                    <div className="w-16 h-16 p-2.5 rounded-xl bg-indigo-100 flex flex-row items-center justify-center">
                        <MarsIcon className="text-indigo-600 size-9" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle>Male Teachers</CardTitle>
                        <CardDescription>
                            Analyse male teachers based on data.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="p-0 h-full flex flex-col justify-center">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : maleTeachers}</h2>
                </DataCardBody>
                <DataCardFooter className="p-0 h-fit">
                    <Link href={"/admin/teacher"}>
                        <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-indigo-600 hover:bg-indigo-800">
                            <p className="text-sm font-medium text-white">
                                lihat selengkapnya
                            </p>
                            <ArrowRightIcon className="text-white" />
                        </Button>
                    </Link>
                </DataCardFooter>
            </DataCard>
            <DataCard>
                <DataCardHeader>
                    <div className="w-16 h-16 p-2.5 rounded-xl bg-fuchsia-100 flex flex-row items-center justify-center">
                        <VenusIcon className="text-fuchsia-600 size-9" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle>Female Teachers</CardTitle>
                        <CardDescription>
                            Analyse female teachers based on data.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="p-0 h-full flex flex-col justify-center">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : femaleTeachers}</h2>
                </DataCardBody>
                <DataCardFooter className="p-0 h-fit">
                    <Link href={"/admin/teacher"}>
                        <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-fuchsia-600 hover:bg-fuchsia-800">
                            <p className="text-sm font-medium text-white">
                                lihat selengkapnya
                            </p>
                            <ArrowRightIcon className="text-white" />
                        </Button>
                    </Link>
                </DataCardFooter>
            </DataCard>
            <DataCard>
                <DataCardHeader>
                    <div className="w-16 h-16 p-2.5 rounded-xl bg-blue-100 flex flex-row items-center justify-center">
                        <UsersIcon className="text-blue-600 size-9" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle>Total Teachers</CardTitle>
                        <CardDescription>
                            Analyse total teachers based on data.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="p-0 h-full flex flex-col justify-center">
                    <h2 className="text-5xl font-medium text-black">{isLoading ? (<Spinner className="size-8" />) : femaleTeachers + maleTeachers}</h2>
                </DataCardBody>
                <DataCardFooter className="p-0 h-fit">
                    <Link href={"/admin/teacher"}>
                        <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-blue-600 hover:bg-blue-800">
                            <p className="text-sm font-medium text-white">
                                lihat selengkapnya
                            </p>
                            <ArrowRightIcon className="text-white" />
                        </Button>
                    </Link>
                </DataCardFooter>
            </DataCard>
        </div>
    )
}