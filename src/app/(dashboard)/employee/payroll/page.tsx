"use client";

import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb/dashboard-breadcrumb"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calculator, Clock, Receipt } from "lucide-react"

export default function PayrollCalculatePage() {
    return (
        <section className="w-full p-6">
            <div className="w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-3">
                    <PageHeader />
                    <Separator />
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Kolom Input Form */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-blue-600 font-semibold">
                                <Calculator size={20} />
                                <h2>Input Parameter Gaji</h2>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Jam/Minggu</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            placeholder="Contoh: 12"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"

                                        >
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('id-ID', { month: 'long' })}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Tahun</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 border border-gray-100 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    Hitung Gaji
                                </button>
                            </form>
                        </div>

                        {/* Kolom Hasil/Summary */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Receipt size={120} />
                                </div>

                                <h3 className="text-gray-500 font-medium mb-1">Estimasi Gaji Bersih</h3>
                                <div className="text-4xl font-bold text-gray-900 mb-8">
                                    Rp 2.000.000.00,-
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-blue-50 rounded-xl">
                                        <p className="text-sm text-blue-600 font-medium mb-1">Honor Mengajar</p>
                                        <p className="text-xl font-bold text-blue-900">Rp 500.000.00,-</p>
                                        <p className="text-xs text-blue-400 mt-1">25k × 4 JP × 4 Minggu</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl">
                                        <p className="text-sm text-green-600 font-medium mb-1">Uang Transport</p>
                                        <p className="text-xl font-bold text-green-900">Rp 300.000.00,-</p>
                                        <p className="text-xs text-green-400 mt-1">45k × Total Kehadiran</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                    <Receipt className="text-gray-300" size={40} />
                                </div>
                                <h3 className="text-gray-400 font-medium">Belum ada data untuk dihitung</h3>
                                <p className="text-gray-400 text-sm max-w-xs">Silahkan isi parameter di samping untuk melihat rincian gaji kamu.</p>
                            </div> */}
                        </div>

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
                page: "Payroll",
                link: [
                    { title: "Dashboard", href: "/employee" }
                ]
            }} />
        </div>
    )
}
