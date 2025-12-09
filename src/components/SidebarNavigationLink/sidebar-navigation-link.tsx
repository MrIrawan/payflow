import Link from "next/link";

import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { SidebarNavigationLinkProps } from "@/types/types";

export function SidebarNavigationLink({
  href,
  Icon,
  label,
}: SidebarNavigationLinkProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="[&>svg]:size-7 h-fit">
        <Link
          href={href}
          className="w-full flex flex-row items-center justify-start gap-2 h-6"
        >
          <Icon />
          <p className="text-lg font-medium text-black">{label}</p>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
