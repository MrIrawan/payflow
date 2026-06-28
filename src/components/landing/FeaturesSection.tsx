"use client";

import React from "react";
import { Wallet, Clock, Building, Shield, FileText, Key, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FeaturesSection Component (Bento Grid)
 * Shows core capabilities of the app using a flat design system with
 * subtle borders and clear functional previews.
 */
export default function FeaturesSection() {
  const features = [
    {
      id: "payroll",
      title: "Kelola Penggajian",
      description: "Hitung komponen gaji pokok, tunjangan, potongan pajak, dan BPJS secara otomatis sesuai regulasi Indonesia.",
      className: "md:col-span-2 md:row-span-2",
      icon: Wallet,
      preview: (
        <div className="mt-4 border border-glass-secondary/15 rounded-glass-md bg-glass-neutral/5 p-4 font-mono text-[0.8rem] space-y-3">
          <div className="flex justify-between border-b border-glass-secondary/10 pb-2">
            <span className="text-glass-secondary">Gaji Pokok</span>
            <span className="font-semibold text-glass-primary">Rp 6,500,000</span>
          </div>
          <div className="flex justify-between border-b border-glass-secondary/10 pb-2">
            <span className="text-glass-secondary">Tunjangan Jabatan</span>
            <span className="font-semibold text-glass-primary">Rp 1,200,000</span>
          </div>
          <div className="flex justify-between border-b border-glass-secondary/10 pb-2">
            <span className="text-glass-secondary">BPJS & PPh 21</span>
            <span className="font-semibold text-red-500">-Rp 385,000</span>
          </div>
          <div className="flex justify-between pt-1 text-glass-primary font-bold">
            <span>Take Home Pay</span>
            <span className="text-glass-tertiary">Rp 7,315,000</span>
          </div>
        </div>
      )
    },
    {
      id: "attendance",
      title: "Absensi Real-time",
      description: "Sinkronisasi kehadiran harian karyawan langsung dengan penggajian untuk akurasi potongan.",
      className: "md:col-span-1 md:row-span-1",
      icon: Clock,
      preview: (
        <div className="mt-6 flex items-center justify-around bg-glass-neutral/10 border border-glass-secondary/15 rounded-glass-md p-4">
          <div className="text-center">
            <div className="text-[0.65rem] font-mono text-glass-secondary uppercase">Hadir</div>
            <div className="text-lg font-bold text-glass-primary mt-1">22</div>
          </div>
          <div className="text-center border-x border-glass-secondary/10 px-4">
            <div className="text-[0.65rem] font-mono text-glass-secondary uppercase">Izin</div>
            <div className="text-lg font-bold text-amber-500 mt-1">1</div>
          </div>
          <div className="text-center">
            <div className="text-[0.65rem] font-mono text-glass-secondary uppercase">Alpa</div>
            <div className="text-lg font-bold text-red-500 mt-1">0</div>
          </div>
        </div>
      )
    },
    {
      id: "multitenant",
      title: "Multi-Tenant Architecture",
      description: "Satu akun untuk mengelola banyak yayasan atau cabang perusahaan dengan data terpisah secara aman.",
      className: "md:col-span-1 md:row-span-2",
      icon: Building,
      preview: (
        <div className="mt-6 space-y-2.5">
          <div className="p-2.5 bg-glass-tertiary/5 border border-glass-tertiary/20 rounded-glass-md flex items-center gap-2">
            <div className="w-5 h-5 rounded-glass-sm bg-glass-tertiary text-glass-surface flex items-center justify-center font-mono text-[0.65rem] font-bold">Y</div>
            <div className="text-xs font-medium text-glass-primary truncate">Yayasan Pendidikan Abdi</div>
          </div>
          <div className="p-2.5 bg-glass-surface border border-glass-secondary/15 rounded-glass-md flex items-center gap-2 opacity-60">
            <div className="w-5 h-5 rounded-glass-sm bg-glass-secondary/20 text-glass-primary flex items-center justify-center font-mono text-[0.65rem] font-bold">S</div>
            <div className="text-xs font-medium text-glass-primary truncate">SD Cerdas Mulia</div>
          </div>
          <div className="p-2.5 bg-glass-surface border border-glass-secondary/15 rounded-glass-md flex items-center gap-2 opacity-60">
            <div className="w-5 h-5 rounded-glass-sm bg-glass-secondary/20 text-glass-primary flex items-center justify-center font-mono text-[0.65rem] font-bold">S</div>
            <div className="text-xs font-medium text-glass-primary truncate">SMP Bakti Bangsa</div>
          </div>
        </div>
      )
    },
    {
      id: "rolebased",
      title: "Role-Based Access Control",
      description: "Pembagian hak akses antara Owner, Admin, dan Karyawan untuk menjaga kerahasiaan data.",
      className: "md:col-span-2 md:row-span-1",
      icon: Shield,
      preview: (
        <div className="mt-6 flex gap-2">
          <span className="px-2.5 py-1 bg-glass-tertiary text-glass-surface rounded-glass-sm text-[0.7rem] font-mono">OWNER</span>
          <span className="px-2.5 py-1 bg-glass-primary text-glass-surface rounded-glass-sm text-[0.7rem] font-mono">ADMIN</span>
          <span className="px-2.5 py-1 bg-glass-neutral border border-glass-secondary/20 text-glass-secondary rounded-glass-sm text-[0.7rem] font-mono">EMPLOYEE</span>
        </div>
      )
    },
    {
      id: "payslip",
      title: "Slip Gaji Otomatis",
      description: "Karyawan dapat langsung mengunduh slip gaji bulanan yang dikirim otomatis via dashboard.",
      className: "md:col-span-2 md:row-span-1",
      icon: FileText,
      preview: (
        <div className="mt-6 p-3.5 bg-glass-surface border border-glass-secondary/15 rounded-glass-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-glass-neutral rounded-glass-sm text-glass-tertiary flex items-center justify-center font-bold text-xs font-mono">
              PDF
            </div>
            <div>
              <div className="text-xs font-medium text-glass-primary">SlipGaji_Juni_2026.pdf</div>
              <div className="text-[0.65rem] text-glass-secondary font-mono">1.2 MB • Generated Just Now</div>
            </div>
          </div>
          <button className="text-xs font-medium text-glass-tertiary hover:underline cursor-pointer">
            Download
          </button>
        </div>
      )
    },
    {
      id: "companykey",
      title: "Company Key Invitation",
      description: "Karyawan bergabung ke dalam organisasi secara instan dengan menggunakan Company Key unik.",
      className: "md:col-span-1 md:row-span-1",
      icon: Key,
      preview: (
        <div className="mt-6 font-mono text-center">
          <div className="bg-glass-neutral text-glass-primary font-bold tracking-widest text-xs py-2 px-3 border border-glass-secondary/15 rounded-glass-md select-all">
            PAYFLOW-XYZ-99
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="bg-glass-neutral py-20 px-6 lg:px-8 border-b border-glass-secondary/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase mb-3 block">
            FEATURES
          </span>
          <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
            Everything you need to run payroll<span className="text-glass-tertiary">.</span>
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.55] text-glass-secondary max-w-xl">
            Dari penghitungan gaji otomatis hingga absensi real-time —
            semua yang dibutuhkan tim HR ada dalam satu dashboard.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={cn(
                  "bg-glass-surface rounded-glass-lg border border-glass-secondary/15 p-6 flex flex-col transition-shadow duration-300",
                  feature.id === "payroll" ? "justify-start" : "justify-between",
                  "hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]",
                  feature.className
                )}
              >
                <div>
                  <div className="w-10 h-10 rounded-glass-md bg-glass-neutral flex items-center justify-center text-glass-tertiary mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-glass-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.5] text-glass-secondary">
                    {feature.description}
                  </p>
                </div>
                {feature.preview}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
