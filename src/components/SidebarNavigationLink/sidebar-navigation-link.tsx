import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { SidebarNavigationLinkProps } from "@/types/types";
import { cn } from "@/lib/utils";

export function SidebarNavigationLink({
  href,
  Icon,
  label,
  activeBg
}: SidebarNavigationLinkProps) {
  const pathName = usePathname();
  const isActive = pathName === href;

  const sidebarLinkClassName = cn()

  return (
    <SidebarMenuItem className={`rounded-lg ${activeBg ? isActive ? "border-2 border-glass-tertiary bg-glass-tertiary/20" : "bg-white" : "bg-white"} border-2 border-transparent duration-100 hover:border-2 hover:border-glass-secondary/20 hover:bg-glass-secondary/15`}>
      <SidebarMenuButton
        asChild
        className="[&>svg]:size-6 h-fit"
      >
        <Link
          href={href}
          className="w-full flex flex-row items-center justify-start gap-2 h-6"
        >
          {Icon && <Icon size={14} className={`${isActive ? "text-blue-600" : "text-black"}`} />}
          <p className={`text-lg font-medium ${isActive ? "text-blue-600" : "text-black"}`}>
            {label}
          </p>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
