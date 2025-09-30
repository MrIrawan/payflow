import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <section className="w-full h-screen">
        <SidebarTrigger />
        {children}
      </section>
    </SidebarProvider>
  );
}
