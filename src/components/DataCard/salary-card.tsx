'use client';

import { Skeleton } from '@/components/ui/skeleton';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SalaryCardProps {
  /** Net salary estimate for current month in IDR */
  netSalary?: number;
  /** Full Indonesian month name, e.g. "Juli" */
  month?: string;
  /** When true, renders skeleton placeholders */
  isLoading?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * SalaryCard
 *
 * Card 1 of 3 — Estimasi Gaji Bulan Ini.
 * Accent dot (#2C5EF5) is the single tertiary usage in the card group.
 *
 * Glassline card spec:
 *   bg: surface (#FFFFFF)
 *   border: 1px solid #4A5568 / 15%
 *   rounded: 16px
 *   padding: 24px
 */
export function SalaryCard({ netSalary, month, isLoading = false }: SalaryCardProps) {
  if (isLoading) {
    return (
      <div className="glassline-card">
        <Skeleton className="w-24 h-3 rounded" />
        <Skeleton className="w-40 h-8 mt-2 rounded" />
        <Skeleton className="w-32 h-3 mt-2 rounded" />
      </div>
    );
  }

  return (
    <div className="glassline-card">
      {/* Label row with tertiary accent dot */}
      <div className="flex items-center gap-2 relative">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-ping absolute bg-glass-tertiary"
          aria-hidden="true"
        />
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-glass-tertiary"
          aria-hidden="true"
        />
        <p className="glassline-label">ESTIMASI GAJI</p>
      </div>

      {/* Value */}
      <p
        className="text-[2.25rem] font-semibold leading-none"
        style={{
          fontFamily: 'var(--font-geist-sans, sans-serif)',
          color: '#0F1419',
          letterSpacing: '-0.02em',
        }}
      >
        {netSalary !== undefined ? formatRupiah(netSalary) : '—'}
      </p>

      {/* Subtext */}
      <p className="glassline-body">
        Estimasi bulan {month ?? '—'}
      </p>
    </div>
  );
}
