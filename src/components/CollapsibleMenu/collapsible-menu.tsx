import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import { CollapsibleMenuProps } from "@/types/types";

import { ChevronDown } from "lucide-react";

export default function CollapsibleMenu({
  children,
  items = [],
}: CollapsibleMenuProps) {
  return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex items-center justify-between">
              {children}
              <ChevronDown className="w-5 h-5" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="flex flex-col gap-2">
              {items.map((item, index) => (
                <SidebarMenuSubItem key={index}>
                    <SidebarMenuSubButton href={item.link}>
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <p className="text-base font-medium lowercase">
                          {item.title}
                        </p>
                      </div>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
  );
}
