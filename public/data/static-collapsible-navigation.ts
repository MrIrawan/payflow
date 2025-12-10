import { CollapsibleSidebarNavigationProps } from "@/types/types";
import { CalendarCheck2 } from "lucide-react";

export const staticCollapsibleNavigationLinks: CollapsibleSidebarNavigationProps =
  {
    label: "Absensi",
    Icon: CalendarCheck2,
    sub: [
      {
        href: "/dashboard/absensi/create",
        label: "buat absensi",
      },
      {
        href: "/dashboard/absensi/data",
        label: "data absensi",
      },
      {
        href: "/dashboard/absensi/rekap",
        label: "rekap absensi",
      },
    ],
  };
