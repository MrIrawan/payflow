import { LucideIcon } from "lucide-react";

export interface BreadcrumbsProps {
    currentPage: string;
    items: BreadcrumbsData[] | [];
}

export interface BreadcrumbsData {
    title: string;
    link: string;
}

export interface CollapsibleMenuProps {
    children: React.ReactNode;
    items: CollapsibleMenuData[] | [];
}

export interface CollapsibleMenuData {
    title: string;
    icon: LucideIcon;
    link: string;
}

export interface ProfileCardProps {
    variant?: "sidebar" | "medium" | "large";
    avatar: string;
    name: string;
    email: string;
}

export interface QuickNavigationCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    link: string;
    color: string;
}

export interface ColorMap {
    color: {
        background: string;
        icon: string;
        ring: string;
    }
}

export interface CustomCardVariants {
    name: string;
    classname: string;
}