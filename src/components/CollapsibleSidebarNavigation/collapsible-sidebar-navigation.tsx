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

export function CollabsipleSidebarNavigation({
  label,
  Icon,
  sub,
}: CollabsibleSidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
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
          <SidebarMenuSub className="gap-3">
            {sub.map((subItem, key) => (
              <SidebarMenuSubItem key={key}>
                <SidebarMenuButton asChild>
                  <Link
                    href={subItem.href}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <p
                      className={`text-base font-normal ${
                        isActive ? "text-blue-600" : "text-black"
                      }`}
                    >
                      {subItem.label}
                    </p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
