import { AdminSidebar } from "@/components/AdminSidebar/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      {/* <SidebarTrigger /> */}
      {children}
    </SidebarProvider>
  );
}
