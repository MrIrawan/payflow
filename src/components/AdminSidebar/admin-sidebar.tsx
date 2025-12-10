"use client";

import { useState } from "react";

import Image from "next/image";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "../ui/sidebar";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";
import { staticSidebarNavigationLinks } from "../../../public/data/static-sidebar-navigation";
import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { BoxIcon } from "lucide-react";

export function AdminSidebar() {
  const [activeLink, setActiveLink] = useState<null | string>(null);
  return (
    <Sidebar className="px-2.5">
      <SidebarHeader className="p-4">
        <Image src={LogoWithTitle} alt="payflow-logo" width={200} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-full">
          {/* Sidebar items go here */}
          <SidebarMenu className="gap-4">
            {staticSidebarNavigationLinks.map((link, index) => (
              <SidebarNavigationLink
                key={index}
                {...link}
                isActive={activeLink === link.href}
                onclick={() => setActiveLink(link.href)}
              />
            ))}
            <CollabsipleSidebarNavigation
              label="hahahah"
              Icon={BoxIcon}
              sub={staticSidebarNavigationLinks}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
