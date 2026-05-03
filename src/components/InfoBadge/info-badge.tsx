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
    Code2,
    Building2,
    HeartPulse,
    ShoppingBag,
    Truck,
    Cpu,
    Leaf,
    Tv2,
    Hammer,
    Hotel,
    Scale,
    Plane,
    Zap,
    FlaskConical,
    Paintbrush,
    Wheat,
    Ship,
    Drama,
    Banknote,
    Wifi,
    Package,
    Car,
    Home,
    ShieldCheck,
    Gamepad2,
    Coffee,
    Factory,
    Globe2,
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
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold my-0.5 w-fit",
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

export const industryBadgeMap: Record<
    string,
    { className: string; icon: JSX.Element }
> = {

    // ── Technology & Digital ──────────────────────────────────────────────────

    "Technology": {
        className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
        icon: <Code2 size={14} />,
    },
    "IT": {
        className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
        icon: <Cpu size={14} />,
    },
    "Software": {
        className: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
        icon: <Code2 size={14} />,
    },
    "Telecommunications": {
        className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
        icon: <Wifi size={14} />,
    },
    "Gaming": {
        className: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
        icon: <Gamepad2 size={14} />,
    },
    "Media": {
        className: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
        icon: <Tv2 size={14} />,
    },

    // ── Finance & Business ────────────────────────────────────────────────────

    "Finance": {
        className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        icon: <Banknote size={14} />,
    },
    "Banking": {
        className: "bg-green-50 text-green-700 ring-1 ring-green-200",
        icon: <Landmark size={14} />,
    },
    "Insurance": {
        className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
        icon: <ShieldCheck size={14} />,
    },
    "Investment": {
        className: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
        icon: <Landmark size={14} />,
    },
    "Consulting": {
        className: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
        icon: <Building2 size={14} />,
    },
    "Legal": {
        className: "bg-zinc-50 text-zinc-700 ring-1 ring-zinc-300",
        icon: <Scale size={14} />,
    },

    // ── Healthcare & Science ──────────────────────────────────────────────────

    "Healthcare": {
        className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
        icon: <HeartPulse size={14} />,
    },
    "Pharmaceutical": {
        className: "bg-pink-50 text-pink-700 ring-1 ring-pink-200",
        icon: <FlaskConical size={14} />,
    },
    "Biotechnology": {
        className: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-200",
        icon: <FlaskConical size={14} />,
    },
    "Research": {
        className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        icon: <FlaskConical size={14} />,
    },

    // ── Education ─────────────────────────────────────────────────────────────

    "Education": {
        className: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
        icon: <GraduationCap size={14} />,
    },

    // ── Retail & Consumer ─────────────────────────────────────────────────────

    "Retail": {
        className: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
        icon: <ShoppingBag size={14} />,
    },
    "E-Commerce": {
        className: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
        icon: <Package size={14} />,
    },
    "Food & Beverage": {
        className: "bg-lime-50 text-lime-700 ring-1 ring-lime-200",
        icon: <Coffee size={14} />,
    },
    "Agriculture": {
        className: "bg-green-50 text-green-800 ring-1 ring-green-200",
        icon: <Wheat size={14} />,
    },

    // ── Industry & Energy ─────────────────────────────────────────────────────

    "Manufacturing": {
        className: "bg-stone-50 text-stone-700 ring-1 ring-stone-300",
        icon: <Factory size={14} />,
    },
    "Construction": {
        className: "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-300",
        icon: <Hammer size={14} />,
    },
    "Energy": {
        className: "bg-amber-50 text-amber-800 ring-1 ring-amber-300",
        icon: <Zap size={14} />,
    },
    "Mining": {
        className: "bg-stone-100 text-stone-800 ring-1 ring-stone-300",
        icon: <Hammer size={14} />,
    },

    // ── Logistics & Transportation ────────────────────────────────────────────

    "Logistics": {
        className: "bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200",
        icon: <Truck size={14} />,
    },
    "Automotive": {
        className: "bg-gray-50 text-gray-700 ring-1 ring-gray-200",
        icon: <Car size={14} />,
    },
    "Aviation": {
        className: "bg-sky-50 text-sky-800 ring-1 ring-sky-200",
        icon: <Plane size={14} />,
    },
    "Maritime": {
        className: "bg-blue-50 text-blue-800 ring-1 ring-blue-200",
        icon: <Ship size={14} />,
    },

    // ── Property & Hospitality ────────────────────────────────────────────────

    "Real Estate": {
        className: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
        icon: <Home size={14} />,
    },
    "Hospitality": {
        className: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
        icon: <Hotel size={14} />,
    },
    "Tourism": {
        className: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
        icon: <Globe2 size={14} />,
    },

    // ── Creative & Services ───────────────────────────────────────────────────

    "Creative": {
        className: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-200",
        icon: <Paintbrush size={14} />,
    },
    "Entertainment": {
        className: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
        icon: <Drama size={14} />,
    },
    "Non-Profit": {
        className: "bg-green-50 text-green-700 ring-1 ring-green-200",
        icon: <HeartPulse size={14} />,
    },
    "Government": {
        className: "bg-blue-50 text-blue-800 ring-1 ring-blue-300",
        icon: <Landmark size={14} />,
    },
    "Environment": {
        className: "bg-lime-50 text-lime-700 ring-1 ring-lime-200",
        icon: <Leaf size={14} />,
    },
}