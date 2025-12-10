"use client";

import { useState } from "react";

import { CollabsibleSidebarNavigationProps } from "@/types/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import Link from "next/link";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";

export function CollabsipleSidebarNavigation({
  label,
  Icon,
  sub,
}: CollabsibleSidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<null | string>(null);
  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger className="w-full" asChild>
          <SidebarMenuButton asChild className="[&>svg]:size-7 h-fit">
            <Link
              href={"#"}
              className="flex flex-row justify-start gap-2 items-center w-full h-6"
            >
              <Icon size={16} />
              <p className="text-lg font-medium text-black">{label}</p>
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="gap-0">
            {sub.map((subItem, key) => (
              <SidebarNavigationLink
                key={key}
                label={subItem.label}
                href={subItem.href}
                onclick={() => setActiveLink(subItem.href)}
                isActive={activeLink === subItem.href}
                className={`text-base ${
                  activeLink === subItem.href ? "text-blue-600" : "text-black"
                }`}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
