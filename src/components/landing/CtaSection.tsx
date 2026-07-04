"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * CtaSection Component
 * Uses the primary dark color as background for a high contrast sign-off.
 * Features exactly 1 primary action button.
 */
export default function CtaSection() {
  return (
    <section className="bg-glass-primary py-24 px-6 lg:px-8 border-b border-glass-secondary/20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Headline */}
        <h2 className="text-[2.5rem] md:text-[3.25rem] font-semibold tracking-[-0.03em] leading-tight text-glass-surface mb-6">
          Ready to simplify your payroll?
        </h2>

        {/* Subtext */}
        <p className="text-[0.95rem] md:text-lg text-glass-surface/60 max-w-xl mb-10 leading-[1.55]">
          No credit card required. Setup your company and employee database in under 10 minutes.
        </p>

        {/* Primary CTA (Cobalt Button) */}
        <Link
          href="/signUp"
          className="w-full sm:w-auto text-[0.95rem] font-medium bg-glass-tertiary text-glass-surface px-8 py-3.5 rounded-glass-md hover:bg-glass-tertiary/95 transition-all text-center inline-flex items-center justify-center gap-2 group"
        >
          Start for Free
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
