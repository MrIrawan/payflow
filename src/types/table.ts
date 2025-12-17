import { TableHTMLAttributes } from "react";

export interface DataTable {
  fullName: string;
  email: string;
  jobTitle: string;
  company: string;
  gender: "male" | "female";
  netSalary: number;
}

export interface DataTableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: DataTable[];
}
