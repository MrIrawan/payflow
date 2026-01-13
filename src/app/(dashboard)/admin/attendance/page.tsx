import { AttendanceDataCard } from "@/components/AttendanceDataCard/attendance-data-card"
import { AttendanceTable } from "@/components/AttendanceTable/attendance-table"
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AttendancePage() {
    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6 items-center">
                <PageHeader />
                <div className="w-full flex flex-col gap-6">
                    {/* content header */}
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text-4xl font-bold text-black">Absensi Guru</CardTitle>
                            <CardDescription className="text-lg font-medium max-w-xl">Analisis data absensi guru hari ini dengan fitur simpan data real-time dan filterisasi data.</CardDescription>
                        </div>
                        <div className="w-full flex flex-row items-center gap-3">
                            <AttendanceDataCard />
                        </div>
                        <AttendanceTable />
                    </div>
                </div>
            </div>
        </section>
    )
}

function PageHeader() {
    return (
        <div className="h-fit w-full flex flex-row items-center gap-3">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
            <DashboardBreadcrumb data={{
                page: "Data absensi",
                link: [
                    {
                        title: "Dashboard",
                        href: "/admin"
                    }
                ]
            }} />
        </div>
    )
}