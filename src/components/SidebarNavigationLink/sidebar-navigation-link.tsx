import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { SidebarNavigationLinkProps } from "@/types/types";

export function SidebarNavigationLink({
  href,
  Icon,
  label,
  activeBg
}: SidebarNavigationLinkProps) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(`${href}`)
  return (
    <SidebarMenuItem className={`rounded-lg ${activeBg ? isActive ? "bg-blue-100" : "bg-white" : "bg-white"}`}>
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
