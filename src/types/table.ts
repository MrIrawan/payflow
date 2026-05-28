import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  // T[keyof T] sudah cover semua value type dari T
  // pakai unknown sebagai fallback agar tidak pakai any
  cell?: (value: T[keyof T], row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRowAction?: (row: T) => ReactNode;
  wrapper?: boolean;
}