"use client";

import {
  EllipsisIcon,
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
import { DataTableProps } from "@/types/table";

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="w-full flex flex-col gap-6 p-3">
      {/* Toolbar tetap */}
      <Card className="w-full flex flex-row items-end justify-between p-0 shadow-none border-none">
        <div className="flex flex-row gap-2.5 items-end">
          <div className="flex flex-col gap-1.5">
            <Label>Search</Label>
            <Input type="text" placeholder="search here..." />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className="capitalize">
                {col.header}
              </TableHead>
            ))}
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-gray-100 transition"
            >
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.cell
                    ? col.cell(row[col.accessor], row)
                    : String(row[col.accessor])}
                </TableCell>
              ))}

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
