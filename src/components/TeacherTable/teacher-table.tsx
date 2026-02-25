"use client";

import Link from "next/link";
import Image from "next/image";
import EmptyStateDataTable from "../../../public/images/empty-state-data-table.svg";

import { useState, useEffect } from "react";

import { GetAllEmployeesData } from "@/types/response";

import { DataTable } from "../DataTable/data-table";
import { Column } from "@/types/table";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { filterByKeys } from "@/utils/filterByKeys";
import { useDebounce } from "@/hooks/use-debounce";
import { GenderOptionsButton } from "../GenderOptionsButton/gender-options-button";
import { GenderBadge } from "../GenderBadge/gender-badge";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { TeacherActionPopover } from "../TeacherActionPopover/teacher-action-popover";
import { InfoBadge, jobBadgeMap, subjectBadgeMap } from "../InfoBadge/info-badge";
import { Spinner } from "../ui/spinner";

const teacherColumns: Column<GetAllEmployeesData>[] = [
    { header: "Nama Lengkap", accessor: "full_name" },
    { header: "Tanggal Lahir", accessor: "date_of_birth", cell: (value: Date) => value ? new Date(value).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) : "-" },
    { header: "Jenis Kelamin", accessor: "gender", cell: (value: string) => <GenderBadge placeholder={value} /> },
    { header: "Alamat Email", accessor: "email_address", cell: (value: string) => <p className="font-medium">{value}</p> },
    {
        header: "Jabatan", accessor: "job_title", cell: (value: string[]) => (
            <div className="w-[280px] flex flex-row gap-1.5 flex-wrap">
                {value?.map((job, index) => {
                    return (
                        <InfoBadge
                            key={index}
                            label={job}
                            icon={jobBadgeMap[job]?.icon}
                            className={jobBadgeMap[job]?.className}
                        />
                    )
                })}
            </div>
        )
    },
    {
        header: "Mata Pelajaran", accessor: "subject_name", cell: (value: string[]) => (
            <div className="w-[280px] flex flex-row gap-1.5 flex-wrap">
                {value?.map((subject, index) => {
                    return (
                        <InfoBadge
                            key={index}
                            label={subject}
                            icon={subjectBadgeMap[subject]?.icon}
                            className={subjectBadgeMap[subject]?.className}
                        />
                    )
                })}
            </div>
        )
    },
];

export default function TeacherTable({ data }: { data: GetAllEmployeesData[] | undefined }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsloading] = useState<boolean>(false);

    const debouncedSearch = useDebounce(searchQuery, 400);

    const filteredData = filterByKeys(data || [], debouncedSearch, ["full_name"]);

    return (
        <div className={`w-full flex gap-6 ${isLoading ? "h-[500px] flex-row justify-center items-center" : "h-fit flex-col"}`}>
            {isLoading ? (
                <Spinner className="size-10" />
            ) : (
                <>
                    {data?.length === 0 ? (
                        <>
                            <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                                <div className="w-full flex flex-row gap-2.5 items-end">
                                    <div className="flex flex-col gap-2.5">
                                        <Label className="font-semibold">Search Teacher</Label>
                                        <Input
                                            type="text"
                                            placeholder="teacher neame here..."
                                            className="min-w-[300px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Card>
                            <div className="w-full flex flex-row justify-center items-center">
                                <div className="w-fit h-fit flex flex-col gap-3 items-center">
                                    <Image
                                        src={EmptyStateDataTable}
                                        alt="empty state data table image"
                                        width={250}
                                    />
                                    <div className="flex flex-col gap-1 items-center">
                                        <CardTitle className="text-xl text-black">belum ada data guru yang dapat di tampilkan.</CardTitle>
                                        <CardDescription className="text-base font-medium max-w-md text-center">
                                            kami tidak bisa menampilkan data guru, ayo daftarkan guru pada halaman <Link href={"/admin/teacher/add-teacher"} className="hover:underline">tambah data guru.</Link>
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (<>
                        <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                            <div className="w-full flex flex-row gap-2.5 items-end">
                                <div className="flex flex-col gap-2.5">
                                    <Label className="font-semibold">Search Teacher</Label>
                                    <Input
                                        type="text"
                                        placeholder="teacher neame here..."
                                        className="min-w-[300px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                        <DataTable
                            columns={teacherColumns}
                            data={filteredData}
                            // renderRowAction={(row) => <TeacherActionPopover teacherData={row} />}
                            wrapper={false}
                        />
                    </>)}
                </>
            )}
        </div>
    )
}