import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Card } from "../ui/card";

import {
  UserRoundIcon,
  UsersRoundIcon,
  ChevronDownIcon,
  CalendarArrowUpIcon,
  CalendarDaysIcon,
  CalendarCheckIcon,
  CalendarArrowUp,
  ClockIcon,
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
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserRoundIcon className="w-5 h-5" />
                        <p className="text-base font-zalando-medium">
                          Data guru
                        </p>
                      </div>
                      <ChevronDownIcon className="w-5 h-5" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="flex flex-col gap-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <UsersRoundIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Data semua guru
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <UserRoundIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Data per-guru
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarArrowUpIcon className="w-5 h-5" />
                        <p className="text-base font-zalando-medium">
                          Absensi kehadiran
                        </p>
                      </div>
                      <ChevronDownIcon className="w-5 h-5" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="flex flex-col gap-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <CalendarArrowUp className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Rata-rata absensi
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Absensi perbulan
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <CalendarCheckIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Absensi per-guru
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />
                        <p className="text-base font-zalando-medium">
                          Jam mengajar
                        </p>
                      </div>
                      <ChevronDownIcon className="w-5 h-5" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="flex flex-col gap-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <BookIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Jam ajar per-mapel
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <div className="flex items-center gap-2">
                            <UsersRoundIcon className="w-4 h-4" />
                            <p className="text-base font-zalando-medium">
                              Jam ajar per-guru
                            </p>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
