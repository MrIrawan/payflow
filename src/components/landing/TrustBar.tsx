"use client";

import React from "react";

/**
 * TrustBar Component
 * Renders client logos in a clean, flat, grayscale row.
 */
export default function TrustBar() {
  const logos = [
    { name: "Sekolah Harapan", label: "HARAPAN SCHOOL" },
    { name: "Yayasan Bakti", label: "BAKTI FOUNDATION" },
    { name: "Ruang Cerdas", label: "RUANG CERDAS" },
    { name: "Bina Ilmu", label: "BINA ILMU" },
    { name: "Cahaya Bangsa", label: "CAHAYA BANGSA" },
  ];

  return (
    <div className="bg-glass-surface border-y border-glass-secondary/15 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <p className="font-mono text-[0.75rem] text-glass-secondary/60 uppercase tracking-widest mb-6">
          TRUSTED BY TEAMS AT
        </p>

        {/* Logo Grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 select-none opacity-45 hover:opacity-75 transition-opacity"
            >
              <div className="w-5 h-5 rounded-glass-sm bg-glass-secondary/40 flex items-center justify-center font-mono text-[0.65rem] font-bold text-glass-surface">
                {logo.name[0]}
              </div>
              <span className="font-sans font-semibold tracking-tight text-glass-primary text-sm">
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
