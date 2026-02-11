"use client";

import React from "react";
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
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm p-3">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={String(col.accessor) + index} className="capitalize font-semibold text-blue-900">
                {col.header}
              </TableHead>
            ))}
            {/* {renderRowAction && <TableHead className="text-right">Aksi</TableHead>} */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-blue-50/30 transition-colors font-medium"
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.accessor];

                  return (
                    <TableCell key={colIndex}>
                      {col.cell ? (
                        // Jika ada custom render (cell)
                        col.cell(value, row)
                      ) : (
                        // Default render: Handle jika value adalah array (seperti job_title)
                        Array.isArray(value)
                          ? value.join(", ")
                          : String(value ?? "-")
                      )}
                    </TableCell>
                  );
                })}

                {renderRowAction && (
                  <TableCell className="text-right">
                    {renderRowAction(row)}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (renderRowAction ? 1 : 0)} className="h-24 text-center text-gray-400">
                Tidak ada data tersedia.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}