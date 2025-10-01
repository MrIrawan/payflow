import Image from "next/image";
import payFLowBanner from "../../../public/images/payflow-banner.svg";

import ProfileCard from "../ProfileCard/profile-card";
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
import { Separator } from "../ui/separator";

export default function AppSidebar() {
  const number: number = 5;
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <Card className="shadow-none p-0 h-20 overflow-hidden rounded-none border-none">
          <Image 
            src={payFLowBanner}
            alt="PayFlow Banner"
            className="w-full h-full object-cover"
          />
        </Card>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-3">
              {staticSidebarData.map((item, index) => (
                <CollapsibleMenu key={index} items={item.items}>
                    <div className="flex items-center gap-2">
                      <item.labelIcon className="w-6 h-6" />
                      <p className="text-lg font-semibold lowercase">
                        {item.label}
                      </p>
                    </div>
                </CollapsibleMenu>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <HandCoinsIcon className="w-6 h-6" />
                    <p className="text-lg font-semibold">penggajian</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <BookIcon className="w-6 h-6" />
                    <p className="text-lg font-semibold">laporan</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ProfileCard 
          variant="sidebar"
          name="John Doe"
          email="tT8sG@example.com"
          avatar=""
        />
      </SidebarFooter>
    </Sidebar>
  );
}
