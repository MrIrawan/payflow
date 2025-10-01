import { CollapsibleMenuData } from "@/types/types";
import {
  UserRound,
  UsersRound,
  CalendarDays,
  Book,
  CalendarArrowUp,
  CalendarCheck,
  Clock,
  LucideIcon,
} from "lucide-react";

interface StaticSidebarData {
  label: string;
  labelIcon: LucideIcon;
  items: CollapsibleMenuData[];
}

export const staticSidebarData: StaticSidebarData[] = [
  {
    label: "Data guru",
    labelIcon: UserRound,
    items: [
      {
        title: "Data semua guru",
        icon: UsersRound,
        link: "/dashboard/data-guru",
      },
      {
        title: "Data per-guru",
        icon: UserRound,
        link: "/dashboard/data-guru",
      },
    ],
  },
  {
    label: "Absensi kehadiran",
    labelIcon: CalendarCheck,
    items: [
      {
        title: "Rata-rata absensi",
        icon: CalendarArrowUp,
        link: "/dashboard/data-guru",
      },
      {
        title: "Absensi per-bulan",
        icon: CalendarDays,
        link: "/dashboard/data-guru",
      },
      {
        title: "Absensi per-guru",
        icon: CalendarCheck,
        link: "/dashboard/data-guru",
      },
    ],
  },
  {
    label: "Jam mengajar",
    labelIcon: Clock,
    items: [
      {
        title: "Jam ajar per-mapel",
        icon: Book,
        link: "/dashboard/data-guru",
      },
      {
        title: "Jam ajar per-guru",
        icon: UsersRound,
        link: "/dashboard/data-guru",
      },
    ],
  },
];
