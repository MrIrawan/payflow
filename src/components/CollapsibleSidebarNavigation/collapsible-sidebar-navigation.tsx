"use client";

import Link from "next/link";
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
} from "../ui/sidebar";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";
import { ChevronDownIcon } from "lucide-react";

export function CollabsipleSidebarNavigation({
  label,
  Icon,
  sub,
}: CollapsibleSidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger className="w-full" asChild>
          <SidebarMenuButton asChild className="[&>svg]:size-6 h-fit border-2 border-transparent hover:border-glass-secondary/15 hover:bg-glass-secondary/5">
            <Link
              href={"#"}
              className="flex flex-row justify-between gap-2 items-center w-full h-6"
            >
              <div className="flex flex-row gap-2 justify-start items-center">
                <Icon className="size-6" />
                <p className="text-base font-medium font-sans text-black">{label}</p>
              </div>
              <ChevronDownIcon
                className={`${isOpen ? "rotate-180" : ""} transition-transform`}
              />
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="gap-1">
            {sub.map((subItem, key) => (
              <SidebarNavigationLink
                key={key}
                label={subItem.label}
                href={subItem.href}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
