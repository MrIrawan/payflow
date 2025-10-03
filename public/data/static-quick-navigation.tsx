import { QuickNavigationCardProps } from "@/types/types";
import { AlarmClock, CalendarCheck2, HandCoins, UserRound } from "lucide-react";

export const quickNavigationData: QuickNavigationCardProps[] = [
  {
    title: "Data diri anda",
    description: "kelola data diri anda dengan mudah di PayFLow.",
    link: "/profile/me",
    icon: UserRound,
  },
  {
    title: "Absensi anda",
    description: "dapatkan satistik absensi anda di waktu kapanpun",
    link: "/profile/me/absensi",
    icon: CalendarCheck2,
  },
  {
    title: "Info gaji anda",
    description: "lihat informasi gaji anda kapanpun dimanapun",
    link: "/penggajian/info-gaji/u/",
    icon: HandCoins,
  },
  {
    title: "Jam ajar & mapel",
    description: "atur mapel dan jam ajar sesuai yang anda mau",
    link: "/jam-ajar/mapel/u/",
    icon: AlarmClock,
  },
];
