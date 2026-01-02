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
import { DataTableProps } from "@/types/table";

export function DataTable<T>({ columns, data, getRowId }: DataTableProps<T>) {
  return (
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

            <TableCell onClick={() => console.log(getRowId ? getRowId(row) : rowIndex)}>
              <EllipsisIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
