import { QuickNavigationCardProps } from "@/types/types";
import { AlarmClock, CalendarCheck2, HandCoins, UserRound } from "lucide-react";

export const quickNavigationData: QuickNavigationCardProps[] = [
  {
    title: "Data diri anda",
    description: "kelola data diri anda dengan mudah di PayFLow.",
    link: "/profile/me",
    icon: UserRound,
    bgColor: "bg-blue-200",
    ringColor: "ring-blue-300",
    iconColor: "text-blue-500",
  },
  {
    title: "Absensi anda",
    description: "dapatkan satistik absensi anda di waktu kapanpun",
    link: "/profile/me/absensi",
    icon: CalendarCheck2,
    bgColor: "bg-green-200",
    ringColor: "ring-green-300",
    iconColor: "text-green-500",
  },
  {
    title: "Info gaji anda",
    description: "lihat informasi gaji anda kapanpun dimanapun",
    link: "/penggajian/info-gaji/u/",
    icon: HandCoins,
    bgColor: "bg-yellow-200",
    ringColor: "ring-yellow-300",
    iconColor: "text-yellow-500",
  },
  {
    title: "Jam ajar & mapel",
    description: "atur mapel dan jam ajar sesuai yang anda mau",
    link: "/jam-ajar/mapel/u/",
    icon: AlarmClock,
    bgColor: "bg-orange-200",
    ringColor: "ring-orange-300",
    iconColor: "text-orange-500",
  },
];
