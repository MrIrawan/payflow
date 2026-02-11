import { getCookie } from "@/utils/getCookie";

import { AdminSidebar } from "@/components/AdminSidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const adminToken = await getCookie("admin_token");

  if (!adminToken) {
    redirect("/admin/signIn");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      {children}
    </SidebarProvider>
  );
}
