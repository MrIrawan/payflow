import Link from "next/link";

import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { SidebarNavigationLinkProps } from "@/types/types";

import { cn } from "@/lib/utils";

export function SidebarNavigationLink({
  href,
  Icon,
  label,
  isActive,
  onclick,
  className,
}: SidebarNavigationLinkProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="[&>svg]:size-7 h-fit"
        onClick={onclick}
      >
        <Link
          href={href}
          className={`w-full flex flex-row items-center justify-start gap-2 h-6 ${isActive ? "bg-blue-600" : "bg-white"
            }`}
        >
          {Icon && <Icon size={16} />}
          <p className={cn("text-lg font-medium text-black", className)}>
            {label}
          </p>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
