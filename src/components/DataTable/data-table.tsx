"use client";

import {
  EllipsisIcon,
  GridIcon,
  LayoutDashboardIcon,
  TableIcon,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonOption } from "../ButtonOption/button-option";
import { DataTableProps } from "@/types/table";

export function DataTable({ headers, data }: DataTableProps) {
  return (
    <div className="w-full flex flex-col gap-6 p-3">
      <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
        <div className="flex flex-row gap-2.5 items-end">
          <div className="flex flex-col gap-1.5">
            <Label>Full Name Search</Label>
            <Input type="text" placeholder="search name here..." />
          </div>
          <Button variant={"outline"}>gender</Button>
          <Button variant={"outline"}>status</Button>
          <Button variant={"outline"}>reset</Button>
        </div>
        <ButtonOption placeholder="view option" Icon={LayoutDashboardIcon}>
          <div className="flex flex-row items-center gap-3">
            <Button
              variant={"outline"}
              className="flex flex-col items-center justify-center h-20 w-20 border border-gray-300 rounded-lg"
            >
              <GridIcon className="text-gray-600" />
              <p className="text-base font-medium text-gray-600">Grid</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex flex-col items-center justify-center h-20 w-20 border border-gray-300 rounded-lg"
            >
              <TableIcon className="text-gray-600" />
              <p className="text-base font-medium text-gray-600">Table</p>
            </Button>
          </div>
        </ButtonOption>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            {headers?.map((header, index) => (
              <TableHead key={index} className="w-fit capitalize">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data, index) => (
            <TableRow
              key={index}
              className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100"
            >
              <TableCell className="text-sm font-normal text-black">
                {data.fullName}
              </TableCell>
              <TableCell className="text-sm font-normal text-black">
                {data.email}
              </TableCell>
              <TableCell className="text-sm font-normal text-black">
                {data.jobTitle}
              </TableCell>
              <TableCell className="text-sm font-normal text-black">
                {data.company}
              </TableCell>
              <TableCell className="text-sm font-normal text-black">
                {data.gender}
              </TableCell>
              <TableCell className="text-sm font-normal text-black">
                {data.netSalary.toLocaleString()}
              </TableCell>
              <TableCell>
                <EllipsisIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
