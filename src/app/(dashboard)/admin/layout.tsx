import { getCookie } from "@/utils/getCookie";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/AdminSidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAdminToken = await getCookie("admin_token");

  if (!isAdminToken) {
    redirect("/admin/signIn");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      {children}
    </SidebarProvider>
  );
}
