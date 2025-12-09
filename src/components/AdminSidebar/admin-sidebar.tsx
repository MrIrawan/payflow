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

export function AdminSidebar() {
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
              <SidebarNavigationLink key={index} {...link} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
