"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { DataTableProps } from "@/types/table";

export function DataTable<T>({
  columns,
  data,
  renderRowAction,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className="capitalize">
              {col.header}
            </TableHead>
          ))}

          {/* Action column hanya muncul jika dibutuhkan */}
          {renderRowAction && <TableHead />}
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

            {/* SLOT action */}
            {renderRowAction && (
              <TableCell>
                {renderRowAction(row)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
