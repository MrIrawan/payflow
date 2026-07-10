'use client';

import { Skeleton } from '@/components/ui/skeleton';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WelcomeSignProps {
  /** First name of the currently logged-in employee */
  firstName?: string;
  /** Full Indonesian month name, e.g. "Juli" */
  month?: string;
  /** Current year, e.g. 2025 */
  year?: number;
  /** When true, renders skeleton placeholders instead of content */
  isLoading?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * WelcomeSign
 *
 * Top-of-page greeting section.
 * Follows Glassline token spec:
 *   - label   → Geist Mono 0.75rem / secondary (#4A5568)
 *   - headline → Geist 2.25rem / 600 / -0.02em / primary (#0F1419)
 *   - body     → Geist 0.95rem / lh 1.55 / secondary
 */
export function WelcomeSign({
  firstName,
  month,
  year,
  isLoading = false,
}: WelcomeSignProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {/* label skeleton */}
        <Skeleton className="w-48 h-4 rounded-md" />
        {/* headline skeleton */}
        <Skeleton className="w-72 h-9 mt-1 rounded-md" />
        {/* body skeleton */}
        <Skeleton className="w-96 h-4 mt-2 rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      {/* Label — Geist Mono, secondary */}
      <p
        className="text-[0.75rem] uppercase tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-geist-mono, monospace)', color: '#4A5568' }}
      >
        SELAMAT DATANG
      </p>

      {/* Headline — Geist, h1 */}
      <h1
        className="text-[2.25rem] font-semibold leading-tight mt-1"
        style={{
          fontFamily: 'var(--font-geist-sans, sans-serif)',
          color: '#0F1419',
          letterSpacing: '-0.02em',
        }}
      >
        Halo, {firstName ?? 'Pengguna'}! 👋
      </h1>

      {/* Body — Geist, secondary */}
      <p
        className="text-[0.95rem] mt-2"
        style={{
          fontFamily: 'var(--font-geist-sans, sans-serif)',
          color: '#4A5568',
          lineHeight: 1.55,
        }}
      >
        Berikut ringkasan kehadiran dan penggajian Anda bulan{' '}
        <span className="font-medium" style={{ color: '#0F1419' }}>
          {month ?? '—'} {year ?? '—'}
        </span>
        .
      </p>
    </div>
  );
}
