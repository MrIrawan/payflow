'use client';

import { FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PayslipCardProps {
  /** Total number of payslips received since joining */
  payslipCount?: number;
  /** When true, renders skeleton placeholders */
  isLoading?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * PayslipCard
 *
 * Card 3 of 3 — Total Slip Gaji Diterima.
 * FileText icon (lucide-react) positioned top-right.
 *
 * Glassline card spec:
 *   bg: surface (#FFFFFF)
 *   border: 1px solid #4A5568 / 15%
 *   rounded: 16px
 *   padding: 24px
 */
export function PayslipCard({ payslipCount = 0, isLoading = false }: PayslipCardProps) {
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
    <div className="glassline-card relative">
      {/* Icon — top right */}
      <FileText
        className="absolute top-6 right-6"
        style={{ color: '#4A5568', width: '1.25rem', height: '1.25rem' }}
        aria-hidden="true"
      />

      {/* Label */}
      <p className="glassline-label">SLIP GAJI DITERIMA</p>

      {/* Value */}
      <p
        className="text-[2.25rem] font-semibold mt-2 leading-none"
        style={{
          fontFamily: 'var(--font-geist-sans, sans-serif)',
          color: '#0F1419',
          letterSpacing: '-0.02em',
        }}
      >
        {payslipCount}{' '}
        <span
          className="text-[1rem] font-normal"
          style={{ color: '#4A5568', letterSpacing: 'normal' }}
        >
          Slip
        </span>
      </p>

      {/* Subtext */}
      <p className="glassline-body mt-2">Sepanjang waktu bergabung</p>
    </div>
  );
}
