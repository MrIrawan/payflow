"use client";

import { EllipsisIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";

export function DataTable() {
  return (
    <Table className="p-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit capitalize">Full Name</TableHead>
          <TableHead className="w-fit capitalize">Email</TableHead>
          <TableHead className="w-fit capitalize">Job Title</TableHead>
          <TableHead className="w-fit capitalize">Company</TableHead>
          <TableHead className="w-fit capitalize">Gender</TableHead>
          <TableHead className="w-fit capitalize">Net Salary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell className="text-sm font-normal text-black">
            Farrel Irawan
          </TableCell>
          <TableCell className="text-sm font-normal text-black">
            irawanssfarrel@gmail.com
          </TableCell>
          <TableCell className="text-sm font-normal text-black">
            Siswa
          </TableCell>
          <TableCell className="text-sm font-normal text-black">
            SMK Nurjamilah
          </TableCell>
          <TableCell className="text-sm font-normal text-black">
            Laki-laki
          </TableCell>
          <TableCell className="text-sm font-normal text-black">
            1.000.000
          </TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
        <TableRow className="h-14 transition-all duration-300 ease-in-out hover:bg-gray-100">
          <TableCell>Farrel Irawan</TableCell>
          <TableCell>irawanssfarrel@gmail.com</TableCell>
          <TableCell>Siswa</TableCell>
          <TableCell>SMK Nurjamilah</TableCell>
          <TableCell>Laki-laki</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>
            <EllipsisIcon />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
