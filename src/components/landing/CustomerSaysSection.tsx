"use client";

import React from "react";

/**
 * CustomerSaysSection Component
 * Displays real-world customer testimonials in a beautiful flat card grid.
 */
export default function CustomerSaysSection() {
  const testimonials = [
    {
      quote: "PayFlow memangkas waktu kerja administrasi bulanan kami dari 3 hari menjadi hanya 30 menit. Sangat membantu guru honorer kami memantau slip gaji secara mandiri.",
      author: "Ibu Rahmawati",
      role: "KEPALA YAYASAN, HARAPAN BANGSA",
      avatarInitials: "R",
    },
    {
      quote: "Paling suka fitur Multi-Tenant dan Role-Based Access. Mengelola gaji divisi operasional dan development di entitas berbeda menjadi sangat tertata dan aman.",
      author: "Aditya Pratama",
      role: "HR MANAGER, TECHINDO DIGITAL",
      avatarInitials: "A",
    },
    {
      quote: "Dulu pusing rekap absensi harian untuk hitung gaji lembur karyawan. Sekarang karyawan tinggal join pakai Company Key dan absen dari HP. Transparan dan otomatis!",
      author: "Pak Bambang",
      role: "OWNER, KOPI NUSANTARA",
      avatarInitials: "B",
    },
  ];

  return (
    <section className="bg-glass-neutral py-20 px-6 lg:px-8 border-b border-glass-secondary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[0.75rem] text-glass-tertiary tracking-wider uppercase mb-3 block">
            CUSTOMER SAYS
          </span>
          <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary">
            Trusted by teams across Indonesia<span className="text-glass-tertiary">.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-glass-surface border border-glass-secondary/15 rounded-glass-lg p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-shadow duration-300"
            >
              {/* Quote */}
              <p className="text-[0.95rem] leading-[1.6] text-glass-primary italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div>
                <div className="w-full h-[1px] bg-glass-secondary/10 mb-5" />
                <div className="flex items-center gap-3">
                  {/* Flat Avatar */}
                  <div className="w-9 h-9 rounded-full bg-glass-neutral flex items-center justify-center font-semibold text-glass-tertiary text-sm select-none">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-glass-primary">
                      {t.author}
                    </h4>
                    <span className="font-mono text-[0.68rem] text-glass-secondary/80 tracking-wider block mt-0.5">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
