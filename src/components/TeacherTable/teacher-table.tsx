"use client";

import { useState, useEffect } from "react";

import { getAllTeachers } from "@/lib/service/getAllTeachers";
import { GetAllTeachers } from "@/types/response";

import { DataTable } from "../DataTable/data-table";
import { TableColumn } from "@/types/table";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { filterByKeys } from "@/utils/filterByKeys";
import { useDebounce } from "@/hooks/use-debounce";
import { GenderOptionsButton } from "../GenderOptionsButton/gender-options-button";
import { GenderBadge } from "../GenderBadge/gender-badge";

const teacherColumns: TableColumn<GetAllTeachers>[] = [
    { header: "Nama Lengkap", accessor: "full_name" },
    { header: "Tanggal Lahir", accessor: "date_of_birth", cell: (value) => value ? new Date(value).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" }) : "-" },
    { header: "Perusahaan", accessor: "company", cell: (value) => value ? value : "-" },
    { header: "Jabatan", accessor: "job_title", cell: (value) => value ? value : "-" },
    { header: "Alamat Rumah", accessor: "home_address", cell: (value) => value ? value : "-" },
    { header: "Jenis Kelamin", accessor: "gender", cell: (value) => <GenderBadge placeholder={value} /> },
    { header: "Gaji Tetap", accessor: "net_salary", cell: (value) => value ? `Rp ${value.toLocaleString("id-ID")}` : "-" },
];

export default function TeacherTable() {
    const [data, setData] = useState<GetAllTeachers[] | undefined>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debouncedSearch = useDebounce(searchQuery, 400);

    useEffect(() => {
        async function getAllTeachersData() {
            try {
                const response = await getAllTeachers();
                setData(response.data?.data)
            } catch (error) {
                console.error("Get all teachers error:", error);
            }
        }

        getAllTeachersData();
    }, [])

    const filteredData = filterByKeys(data || [], debouncedSearch, ["full_name"])

    return (
        <div className="w-full flex flex-col gap-6">
            <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
                <div className="flex flex-row gap-2.5 items-end">
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
                    <GenderOptionsButton />
                </div>
            </Card>
            <DataTable
                columns={teacherColumns}
                data={filteredData}
                getRowId={(row) => row.guru_id}
            />
        </div>
    )
}