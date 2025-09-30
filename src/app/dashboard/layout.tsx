import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/AppSidebar/app-sidebar";

export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="w-full h-screen">
        <div className="w-full flex items-center gap-2 h-12 overflow-hidden px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="max-h-6" />
        </div>
        {children}
      </section>
    </SidebarProvider>
  );
}
