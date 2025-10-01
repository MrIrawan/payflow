import { LucideIcon } from "lucide-react";

export interface BreadcrumbsProps {
    countItem: number;
    href: Array<string> | string;
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