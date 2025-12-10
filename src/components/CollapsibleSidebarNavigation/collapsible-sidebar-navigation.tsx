"use client";

import { useState } from "react";

import { CollapsibleSidebarNavigationProps } from "@/types/types";
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
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function CollabsipleSidebarNavigation({
  label,
  Icon,
  sub,
}: CollapsibleSidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<null | string>(null);
  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger className="w-full" asChild>
          <SidebarMenuButton asChild className="[&>svg]:size-7 h-fit">
            <Link
              href={"#"}
              className="flex flex-row justify-between gap-2 items-center w-full h-6"
            >
              <div className="flex flex-row gap-2 justify-start items-center">
                <Icon size={16} className="size-7" />
                <p className="text-lg font-medium text-black">{label}</p>
              </div>
              <ChevronDownIcon
                className={`${isOpen ? "rotate-180" : ""} transition-transform`}
              />
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
