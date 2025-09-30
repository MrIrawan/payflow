import { LucideIcon } from "lucide-react";

export interface BreadcrumbsProps {
    countItem: number;
    href: Array<string> | string;
}

export interface CollapsibleMenuProps {
    children: React.ReactNode;
    items: [
        {
            title: string;
            icon: LucideIcon;
        }
    ];
}