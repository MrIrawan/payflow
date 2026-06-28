import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * HeroSection Component
 * Follows the Glassline aesthetic: calm, flat, fog-grey background,
 * and a single cobalt accent action.
 */
export default function HeroSection() {
  return (
    <section className="bg-glass-neutral pt-32 pb-20 px-6 lg:px-8 border-b border-glass-secondary/10">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Badge Label */}
        <span className="font-mono text-[0.75rem] text-glass-secondary tracking-wider uppercase bg-glass-surface px-3 py-1 border border-glass-secondary/15 rounded-glass-sm mb-6 animate-fade-in">
          PAYROLL INFRASTRUCTURE
        </span>

        {/* Headline */}
        <h1 className="text-[2.75rem] md:text-[3.75rem] font-semibold tracking-[-0.03em] leading-[1.1] text-glass-primary max-w-3xl mb-6">
          Payroll infrastructure for every company<span className="text-glass-tertiary">.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[0.95rem] md:text-lg leading-[1.55] text-glass-secondary max-w-2xl mb-8">
          Manage salaries, track attendance, and run payroll for your entire team — from your first hire to your hundredth.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Link
            href="/signUp"
            className="w-full sm:w-auto text-[0.95rem] font-medium bg-glass-tertiary text-glass-surface px-6 py-3 rounded-glass-md hover:bg-glass-tertiary/95 transition-all text-center inline-flex items-center justify-center gap-2"
          >
            Get Started for Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="text-[0.95rem] font-medium text-glass-secondary hover:text-glass-primary transition-colors flex items-center gap-1.5 py-2 px-4"
          >
            See how it works <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Social Proof */}
        <div className="font-mono text-[0.75rem] text-glass-secondary/80 uppercase tracking-widest mb-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          500+ companies across Indonesia
        </div>

        {/* High-Fidelity Mockup Dashboard (Flat, Glassline aesthetic) */}
        <div className="w-full bg-glass-surface rounded-glass-lg border border-glass-secondary/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden text-left">
          {/* Mockup Topbar */}
          <div className="bg-glass-neutral/40 px-4 py-3 border-b border-glass-secondary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-glass-secondary/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-glass-secondary/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-glass-secondary/30"></div>
              <span className="font-mono text-[0.75rem] text-glass-secondary/60 ml-4 select-none">
                app.payflow.id/dashboard
              </span>
            </div>
            <Skeleton className="h-4 w-24 bg-gray-300" />
          </div>

          {/* Mockup Layout */}
          <div className="flex min-h-[360px] flex-col md:flex-row">
            {/* Mockup Sidebar */}
            <div className="w-full md:w-48 bg-glass-neutral/20 border-r border-glass-secondary/10 p-4 space-y-4">
              <Skeleton className="h-6 w-32 bg-gray-300" />
              <div className="space-y-2.5 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-glass-sm bg-glass-tertiary/20"></div>
                  <div className="h-3 w-20 bg-glass-tertiary rounded-glass-sm"></div>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2 opacity-65">
                    <Skeleton className="w-4 h-4 rounded-glass-sm bg-gray-300" />
                    <Skeleton className="h-3 w-24 bg-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup Content Area */}
            <div className="flex-1 p-6 space-y-6">
              {/* Header and Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[0.75rem] text-glass-secondary/70 uppercase">
                    CURRENT BILLING PERIOD
                  </div>
                  <div className="text-lg font-semibold text-glass-primary">
                    June 2026 Payroll Summary
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-glass-tertiary/5 border border-glass-tertiary/15 text-glass-tertiary font-mono text-[0.75rem] rounded-glass-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Synced with Attendance
                </div>
              </div>

              {/* Stats Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-glass-secondary/10 rounded-glass-md bg-glass-neutral/10">
                  <div className="font-mono text-[0.75rem] text-glass-secondary">TOTAL DISBURSEMENT</div>
                  <div className="text-xl font-semibold text-glass-primary mt-1">Rp 148.50M</div>
                </div>
                <div className="p-4 border border-glass-secondary/10 rounded-glass-md bg-glass-neutral/10">
                  <div className="font-mono text-[0.75rem] text-glass-secondary">TOTAL EMPLOYEES</div>
                  <div className="text-xl font-semibold text-glass-primary mt-1">32 Active</div>
                </div>
                <div className="p-4 border border-glass-secondary/10 rounded-glass-md bg-glass-neutral/10">
                  <div className="font-mono text-[0.75rem] text-glass-secondary">APPROVAL STATUS</div>
                  <div className="text-xl font-semibold text-green-600 mt-1 flex items-center gap-1">
                    Ready
                  </div>
                </div>
              </div>

              {/* Employee Payroll List */}
              <div className="border border-glass-secondary/10 rounded-glass-md overflow-hidden bg-glass-surface">
                <div className="p-3 bg-glass-neutral/20 border-b border-glass-secondary/10 grid grid-cols-3 text-[0.75rem] font-mono text-glass-secondary">
                  <div>EMPLOYEE</div>
                  <div>DEPARTMENT</div>
                  <div className="text-right">NET PAYOUT</div>
                </div>
                <div className="divide-y divide-glass-secondary/10">
                  <div className="p-3 grid grid-cols-3 text-[0.85rem] items-center">
                    <div>
                      <div className="font-medium text-glass-primary">Budi Santoso</div>
                      <div className="font-mono text-[0.7rem] text-glass-secondary">EMP-0822</div>
                    </div>
                    <div className="text-glass-secondary">Engineering</div>
                    <div className="text-right font-medium text-glass-primary">Rp 12,450,000</div>
                  </div>
                  <div className="p-3 grid grid-cols-3 text-[0.85rem] items-center">
                    <div>
                      <div className="font-medium text-glass-primary">Siti Aminah</div>
                      <div className="font-mono text-[0.7rem] text-glass-secondary">EMP-0841</div>
                    </div>
                    <div className="text-glass-secondary">Human Resource</div>
                    <div className="text-right font-medium text-glass-primary">Rp 9,800,000</div>
                  </div>
                  <div className="p-3 grid grid-cols-3 text-[0.85rem] items-center opacity-70">
                    <div>
                      <div className="font-medium text-glass-primary">Ahmad Fauzi</div>
                      <div className="font-mono text-[0.7rem] text-glass-secondary">EMP-0791</div>
                    </div>
                    <div className="text-glass-secondary">Product Design</div>
                    <div className="text-right font-medium text-glass-primary">Rp 8,700,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
