"use client";

import React, { useState } from "react";
import { GraduationCap, Rocket, Store, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SolutionsSection Component
 * Offers tabbed presentation of PayFlow use cases for different Indonesian entities.
 */
export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState<"sekolah" | "startup" | "ukm">("sekolah");

  const tabs = [
    {
      id: "sekolah" as const,
      label: "SEKOLAH & YAYASAN",
      icon: GraduationCap,
      title: "Sekolah & Institusi Pendidikan",
      description: "Kelola honorarium guru honorer, tunjangan wali kelas, kalkulasi jam mengajar, absensi harian kelas, serta cetak laporan penggajian yayasan secara berkala.",
      visual: (
        <div className="space-y-4 font-mono text-[0.8rem]">
          <div className="border border-glass-secondary/15 rounded-glass-md p-4 bg-glass-neutral/20">
            <div className="font-semibold text-glass-primary mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-glass-tertiary" />
              Yayasan Pendidikan Islam
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between border-b border-glass-secondary/5 pb-1.5">
                <span className="text-glass-secondary">Gaji Pokok Guru</span>
                <span className="text-glass-primary font-medium">Rp 4,500,000</span>
              </div>
              <div className="flex justify-between border-b border-glass-secondary/5 pb-1.5">
                <span className="text-glass-secondary">Tunjangan Wali Kelas</span>
                <span className="text-glass-primary font-medium">Rp 750,000</span>
              </div>
              <div className="flex justify-between border-b border-glass-secondary/5 pb-1.5">
                <span className="text-glass-secondary">Insentif Jam Mengajar (36 Jam)</span>
                <span className="text-glass-primary font-medium">Rp 1,080,000</span>
              </div>
              <div className="flex justify-between font-bold text-glass-primary pt-1">
                <span>Total Gaji Diterima</span>
                <span className="text-glass-tertiary">Rp 6,330,000</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "startup" as const,
      label: "STARTUP & TECH",
      icon: Rocket,
      title: "Startup & Tech Company",
      description: "Mudah mengelola beberapa entitas perusahaan dalam satu akun dengan multi-tenant. Pengaturan role-based access control (RBAC) yang ketat untuk menjaga kerahasiaan gaji developer dan eksekutif.",
      visual: (
        <div className="space-y-3 font-mono text-[0.8rem]">
          <div className="border border-glass-secondary/15 rounded-glass-md p-4 bg-glass-neutral/20">
            <div className="font-semibold text-glass-primary mb-3 flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-glass-tertiary" />
              PayFlow Corp Tech
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-glass-surface rounded-glass-sm border border-glass-secondary/10">
                <span className="text-glass-primary font-medium">Owner (CEO)</span>
                <span className="text-[0.65rem] px-2 py-0.5 bg-red-100 text-red-600 rounded-glass-sm">Full Control</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-glass-surface rounded-glass-sm border border-glass-secondary/10">
                <span className="text-glass-primary font-medium">Finance Admin</span>
                <span className="text-[0.65rem] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-glass-sm">Payroll Edit</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-glass-surface rounded-glass-sm border border-glass-secondary/10 opacity-70">
                <span className="text-glass-primary font-medium">Developer</span>
                <span className="text-[0.65rem] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-glass-sm">View Only (Self)</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ukm" as const,
      label: "UKM & BISNIS LOKAL",
      icon: Store,
      title: "UKM & Bisnis Lokal",
      description: "Setup cepat tanpa memerlukan tim IT khusus. Cukup undang karyawan menggunakan Company Key unik. Karyawan dapat absen secara real-time dari handphone masing-masing.",
      visual: (
        <div className="space-y-4 font-mono text-[0.8rem]">
          <div className="border border-glass-secondary/15 rounded-glass-md p-4 bg-glass-neutral/20 text-center space-y-4">
            <div className="font-semibold text-glass-primary flex items-center justify-center gap-1.5">
              <Store className="w-4 h-4 text-glass-tertiary" />
              Warung Kopi Nusantara
            </div>
            <div className="py-2.5 px-3 bg-glass-surface border border-glass-secondary/10 rounded-glass-md inline-block">
              <span className="text-xs text-glass-secondary block mb-1">COMPANY KEY</span>
              <span className="font-bold text-glass-primary tracking-widest text-sm">WKN-COFFEE-26</span>
            </div>
            <div className="text-xs text-glass-secondary">
              Karyawan tinggal memasukkan kode ini saat mendaftar untuk langsung terhubung.
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="solutions" className="bg-glass-surface py-20 px-6 lg:px-8 border-b border-glass-secondary/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase mb-3 block">
            SOLUTIONS
          </span>
          <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
            For every kind of team<span className="text-glass-tertiary">.</span>
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex border-b border-glass-secondary/15 mb-12 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-mono text-[0.75rem] tracking-wider border-b-2 font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer",
                  activeTab === tab.id
                    ? "border-glass-tertiary text-glass-tertiary font-semibold"
                    : "border-transparent text-glass-secondary hover:text-glass-primary"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[300px]">
          {/* Text Info */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-semibold text-glass-primary">
              {currentTab.title}
            </h3>
            <p className="text-[0.95rem] leading-[1.6] text-glass-secondary max-w-xl">
              {currentTab.description}
            </p>
            <div className="flex items-center gap-2 text-glass-tertiary text-[0.9rem] font-medium pt-2">
              <CheckCircle2 className="w-4 h-4" />
              Sesuai standar operasional lokal Indonesia
            </div>
          </div>

          {/* Visual Mockup */}
          <div className="lg:col-span-5 bg-glass-neutral/30 border border-glass-secondary/15 rounded-glass-lg p-6">
            {currentTab.visual}
          </div>
        </div>
      </div>
    </section>
  );
}
