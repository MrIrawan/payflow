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
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function DataTable() {
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
        <Button variant={"outline"}>view</Button>
      </Card>
      <Table>
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
    </div>
  );
}
