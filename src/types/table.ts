import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T; // Mengunci accessor agar hanya berisi key dari T
  // Cell menerima value (T[keyof T]) dan seluruh data row
  cell?: (value: any, row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRowAction?: (row: T) => ReactNode;
  wrapper?: boolean;
}