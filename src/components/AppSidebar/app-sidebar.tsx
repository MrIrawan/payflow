import CollapsibleMenu from "../CollapsibleMenu/collapsible-menu";
import { staticSidebarData } from "../../../public/data/static-sidebar-menu";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Card } from "../ui/card";

import {
  HandCoinsIcon,
  BookIcon,
} from "lucide-react";

export default function AppSidebar() {
  const number: number = 5;
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <Card className="shadow-none"></Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-3">
              {staticSidebarData.map((item, index) => (
                <CollapsibleMenu key={index} items={item.items}>
                    <div className="flex items-center gap-2">
                      <item.labelIcon className="w-5 h-5" />
                      <p className="text-base font-zalando-medium">
                        {item.label}
                      </p>
                    </div>
                </CollapsibleMenu>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <HandCoinsIcon className="w-5 h-5" />
                    <p className="text-base font-zalando-medium">Penggajian</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <BookIcon className="w-5 h-5" />
                    <p className="text-base font-zalando-medium">Laporan</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Card className="shadow-none"></Card>
      </SidebarFooter>
    </Sidebar>
  );
}
