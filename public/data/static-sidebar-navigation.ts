import { SidebarNavigationLinkProps } from "@/types/types";
import { BookMarked, Users2, Wallet } from "lucide-react";

export const staticSidebarNavigationLinks: SidebarNavigationLinkProps[] = [
  {
    href: "/admin/teacher",
    Icon: Users2,
    label: "Data guru",
  },
  {
    href: "/admin/penggajian",
    Icon: Wallet,
    label: "Penggajian",
  },
  {
    href: "/admin/laporan",
    Icon: BookMarked,
    label: "Laporan",
  },
];
