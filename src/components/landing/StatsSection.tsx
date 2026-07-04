"use client";

import React from "react";

/**
 * StatsSection Component
 * Displays key statistics in a clean grid layout separated by border-r dividers.
 */
export default function StatsSection() {
  const stats = [
    { value: "500+", label: "COMPANIES" },
    { value: "99.9%", label: "UPTIME" },
    { value: "12+", label: "INDUSTRIES" },
    { value: "10m", label: "SETUP TIME" },
  ];

  return (
    <section className="bg-glass-neutral py-16 border-b border-glass-secondary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center px-4 md:border-r last:border-r-0 border-glass-secondary/15 flex flex-col items-center justify-center"
            >
              {/* Stat Value */}
              <h2 className="text-[2rem] md:text-[2.25rem] font-semibold tracking-[-0.02em] text-glass-primary mb-2">
                {stat.value}
              </h2>
              {/* Stat Label */}
              <span className="font-mono text-[0.72rem] text-glass-secondary tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
