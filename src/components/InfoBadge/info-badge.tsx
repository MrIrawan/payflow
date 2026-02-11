import { cn } from "@/lib/utils";

import {
    Crown,
    Briefcase,
    Users,
    Wallet,
    Shield,
    GraduationCap,
    Book,
    Code,
    Calculator,
    Globe,
    Palette,
    Dumbbell,
} from "lucide-react";

import { JSX } from "react";

interface BadgeProps {
    label: string | undefined;
    icon?: React.ReactNode;
    className?: string;
}

export function InfoBadge({ label, icon, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                "shadow-sm transition hover:scale-105",
                className
            )}
        >
            {icon}
            {label}
        </span>
    );
}

export const jobBadgeMap: Record<string, { className: string; icon: JSX.Element }> = {
    "Guru": {
        className: "bg-blue-100 text-blue-700",
        icon: <GraduationCap size={14} />,
    },
    "Kepala Sekolah": {
        className: "bg-purple-100 text-purple-700",
        icon: <Crown size={14} />,
    },
    "Kurikulum": {
        className: "bg-green-100 text-green-700",
        icon: <Briefcase size={14} />,
    },
    "Kesiswaan": {
        className: "bg-pink-100 text-pink-700",
        icon: <Users size={14} />,
    },
    "Bendahara": {
        className: "bg-yellow-100 text-yellow-800",
        icon: <Wallet size={14} />,
    },
    "BK": {
        className: "bg-red-100 text-red-700",
        icon: <Shield size={14} />,
    },
};

export const subjectBadgeMap: Record<string, { className: string; icon: JSX.Element }> = {
    "Matematika": {
        className: "bg-indigo-100 text-indigo-700",
        icon: <Calculator size={14} />,
    },
    "Bahasa Inggris": {
        className: "bg-sky-100 text-sky-700",
        icon: <Globe size={14} />,
    },
    "Bahasa Indonesia": {
        className: "bg-emerald-100 text-emerald-700",
        icon: <Book size={14} />,
    },
    "Informatika": {
        className: "bg-gray-900 text-white",
        icon: <Code size={14} />,
    },
    "SBK": {
        className: "bg-rose-100 text-rose-700",
        icon: <Palette size={14} />,
    },
    "PJOK": {
        className: "bg-orange-100 text-orange-700",
        icon: <Dumbbell size={14} />,
    },
};
