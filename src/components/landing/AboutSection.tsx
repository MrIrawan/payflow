"use client";

import React from "react";
import { Check } from "lucide-react";

/**
 * AboutSection Component
 * Highlights the localized focus of PayFlow for Indonesian regulations and companies.
 */
export default function AboutSection() {
  const points = [
    "Dibangun oleh developer Indonesia",
    "Memahami kebutuhan bisnis lokal",
    "Terus berkembang bersama user",
  ];

  return (
    <section id="about" className="bg-glass-neutral py-20 px-6 lg:px-8 border-b border-glass-secondary/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Text & Content */}
        <div className="space-y-6">
          <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase block">
            ABOUT
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
            Built for Indonesian businesses<span className="text-glass-tertiary">.</span>
          </h2>
          <p className="text-[0.95rem] leading-[1.6] text-glass-secondary">
            PayFlow lahir untuk menjawab tantangan pengelolaan administrasi karyawan di Indonesia. Kami memahami bahwa regulasi lokal seperti perhitungan pajak PPh 21, iuran BPJS Kesehatan, dan BPJS Ketenagakerjaan membutuhkan penanganan yang spesifik dan akurat.
          </p>
          <p className="text-[0.95rem] leading-[1.6] text-glass-secondary">
            Dengan platform yang dirancang sederhana namun kuat, kami membantu yayasan pendidikan, sekolah swasta, startup, dan UKM di seluruh Indonesia menjalankan penggajian bulanan tanpa ribet.
          </p>

          {/* Checklist */}
          <ul className="space-y-3.5 pt-4">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-glass-tertiary/10 flex items-center justify-center text-glass-tertiary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-[0.95rem] font-medium text-glass-primary">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Visual Component representing localized Indonesian payroll compliance */}
        <div className="border border-glass-secondary/15 rounded-glass-lg bg-glass-surface p-6 space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
          <div className="border-b border-glass-secondary/10 pb-4">
            <span className="font-mono text-[0.7rem] text-glass-secondary/70 uppercase">
              LOCAL COMPLIANCE CHECKS
            </span>
            <h3 className="text-lg font-semibold text-glass-primary mt-1">
              Indonesian Payroll Rules
            </h3>
          </div>

          <div className="space-y-4">
            {/* BPJS Ketenagakerjaan */}
            <div className="p-3.5 bg-glass-neutral/30 border border-glass-secondary/10 rounded-glass-md flex items-start gap-3">
              <div className="w-8 h-8 rounded-glass-sm bg-glass-secondary/10 flex items-center justify-center font-mono text-xs font-bold text-glass-secondary shrink-0">
                BP
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-glass-primary">BPJS Ketenagakerjaan</span>
                  <span className="text-xs font-mono text-green-600 font-semibold">Active</span>
                </div>
                <p className="text-xs text-glass-secondary mt-1">
                  Auto-calculation of JHT (3.7% company, 2% employee), JKK, and JK rules.
                </p>
              </div>
            </div>

            {/* BPJS Kesehatan */}
            <div className="p-3.5 bg-glass-neutral/30 border border-glass-secondary/10 rounded-glass-md flex items-start gap-3">
              <div className="w-8 h-8 rounded-glass-sm bg-glass-secondary/10 flex items-center justify-center font-mono text-xs font-bold text-glass-secondary shrink-0">
                BK
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-glass-primary">BPJS Kesehatan</span>
                  <span className="text-xs font-mono text-green-600 font-semibold">Active</span>
                </div>
                <p className="text-xs text-glass-secondary mt-1">
                  Automatic split: 4% borne by company, 1% deducted from employee salary.
                </p>
              </div>
            </div>

            {/* PPh 21 Tax */}
            <div className="p-3.5 bg-glass-neutral/30 border border-glass-secondary/10 rounded-glass-md flex items-start gap-3">
              <div className="w-8 h-8 rounded-glass-sm bg-glass-secondary/10 flex items-center justify-center font-mono text-xs font-bold text-glass-secondary shrink-0">
                PP
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-glass-primary">PPh Pasal 21</span>
                  <span className="text-xs font-mono text-green-600 font-semibold">Active</span>
                </div>
                <p className="text-xs text-glass-secondary mt-1">
                  Calculates income tax automatically using the latest TER (Tarif Efektif Rata-rata) regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
