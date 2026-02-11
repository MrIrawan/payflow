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
    FileText,
    Settings,
    Layers,
    Terminal,
    TrendingUp,
    Landmark,
    Flag,
    Microscope,
    HeartHandshake,
    Lightbulb,
    MoonStar,
    BookOpen,
    Library,
    Languages,
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
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold my-0.5",
                "shadow-sm",
                className
            )}
        >
            {icon}
            {label}
        </span>
    );
}

export const jobBadgeMap: Record<string, { className: string; icon: JSX.Element }> = {
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
    "Kaprok RPL": {
        className: "bg-indigo-100 text-indigo-700",
        icon: <Terminal size={14} />,
    },
    "Kaprok MPLB": {
        className: "bg-orange-100 text-orange-700",
        icon: <Layers size={14} />,
    },
    "DU/DI": {
        className: "bg-slate-100 text-slate-700",
        icon: <Settings size={14} />,
    },
    "Tata Usaha": {
        className: "bg-cyan-100 text-cyan-700",
        icon: <FileText size={14} />,
    },
    "Guru": {
        className: "bg-blue-100 text-blue-700",
        icon: <GraduationCap size={14} />,
    },
};

export const subjectBadgeMap: Record<string, { className: string; icon: JSX.Element }> = {
    // === EXISTING (Sudah ada di kode kamu) ===
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

    // === TAMBAHAN (Rumpun Agama & Bahasa) ===
    "PAI": {
        className: "bg-green-100 text-green-700",
        icon: <MoonStar size={14} />,
    },
    "Fiqih": {
        className: "bg-green-100 text-green-700",
        icon: <BookOpen size={14} />,
    },
    "SKI": {
        className: "bg-green-100 text-green-700",
        icon: <Library size={14} />,
    },
    "Bahasa Arab": {
        className: "bg-teal-100 text-teal-700",
        icon: <Languages size={14} />,
    },
    "Bahasa Jepang": {
        className: "bg-cyan-100 text-cyan-700",
        icon: <Globe size={14} />,
    },

    // === TAMBAHAN (Rumpun Kejuruan / Produktif) ===
    "DDPK RPL": {
        className: "bg-slate-800 text-slate-100",
        icon: <Terminal size={14} />,
    },
    "KK1 RPL": {
        className: "bg-slate-800 text-slate-100",
        icon: <Terminal size={14} />,
    },
    "KK2 RPL": {
        className: "bg-slate-800 text-slate-100",
        icon: <Terminal size={14} />,
    },
    "DDPK MP": {
        className: "bg-blue-800 text-blue-100",
        icon: <Layers size={14} />,
    },
    "KK1 MP": {
        className: "bg-blue-800 text-blue-100",
        icon: <Layers size={14} />,
    },
    "KK2 MP": {
        className: "bg-blue-800 text-blue-100",
        icon: <Layers size={14} />,
    },

    // === TAMBAHAN (Rumpun Umum & Pengembangan) ===
    "PKK": {
        className: "bg-amber-100 text-amber-700",
        icon: <Lightbulb size={14} />,
    },
    "BPBK": {
        className: "bg-red-100 text-red-700",
        icon: <HeartHandshake size={14} />,
    },
    "IPAS": {
        className: "bg-lime-100 text-lime-700",
        icon: <Microscope size={14} />,
    },
    "PKN": {
        className: "bg-violet-100 text-violet-700",
        icon: <Flag size={14} />,
    },
    "Sejarah": {
        className: "bg-stone-100 text-stone-700",
        icon: <Landmark size={14} />,
    },
    "Kebekerjaan": {
        className: "bg-zinc-100 text-zinc-700",
        icon: <TrendingUp size={14} />,
    },
};