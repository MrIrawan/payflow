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

  const sidebarLinkClassName = activeBg
    ? cn(
      "rounded-lg border-2 border-transparent hover:border-2 hover:border-glass-secondary/15 hover:bg-glass-secondary/5",
      isActive
        ? "text-glass-tertiary border-2 border-glass-tertiary/20 bg-glass-tertiary/15 hover:bg-glass-tertiary/20 hover:border-glass-tertiary/25 hover:text-glass-tertiary duration-100"
        : "text-glass-primary bg-white"
    )
    : cn(
      "rounded-lg hover:bg-glass-secondary/5",
      isActive ? "text-glass-tertiary" : "text-glass-primary"
    );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn("[&>svg]:size-6 h-fit duration-100 transition-colors", sidebarLinkClassName)}
      >
        <Link
          href={href}
          className="w-full flex flex-row items-center justify-start gap-0 h-6"
        >
          {Icon && <Icon />}
          <p className={`${activeBg ? "text-base" : "text-sm"} font-medium font-sans`}>
            {label}
          </p>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
