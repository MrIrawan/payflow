"use client";

import React from "react";

/**
 * HowItWorksSection Component
 * Shows a three-step timeline illustrating how to set up and run PayFlow.
 */
export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Daftar & Buat Company",
      description: "Register dalam 2 menit, buat profil company Anda, lalu invite tim administrasi Anda.",
    },
    {
      number: "02",
      title: "Setup Karyawan",
      description: "Masukkan data karyawan, konfigurasi komponen gaji pokok, tunjangan, serta absensi.",
    },
    {
      number: "03",
      title: "Jalankan Penggajian",
      description: "Generate slip gaji otomatis secara berkala, lakukan review/approval, lalu bayarkan.",
    },
  ];

  return (
    <section className="bg-glass-surface py-20 px-6 lg:px-8 border-b border-glass-secondary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase mb-3 block">
            HOW IT WORKS
          </span>
          <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
            Up and running in minutes<span className="text-glass-tertiary">.</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative space-y-4 group">
              {/* Connector line for desktop */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-7 left-[20%] right-[-80%] h-[1px] bg-glass-secondary/15 z-0" />
              )}

              {/* Number Badge */}
              <div className="font-mono text-[1.75rem] font-semibold text-glass-tertiary select-none relative z-10 bg-glass-surface w-14 h-14 border border-glass-secondary/15 rounded-glass-md flex items-center justify-center">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-glass-primary pt-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[0.95rem] leading-[1.55] text-glass-secondary max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
