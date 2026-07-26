'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { CalendarCheck } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AttendanceCardProps {
  /** Number of days the employee was present this month */
  presentCount?: number;
  /** Total working days in the current month (excludes weekends) */
  workingDays?: number;
  /** When true, renders skeleton placeholders */
  isLoading?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AttendanceCard
 *
 * Card 2 of 3 — Total Hadir Bulan Ini.
 * Progress bar uses primary (#0F1419) to comply with single-accent rule.
 *
 * Glassline card spec:
 *   bg: surface (#FFFFFF)
 *   border: 1px solid #4A5568 / 15%
 *   rounded: 16px
 *   padding: 24px
 */
export function AttendanceCard({
  presentCount = 0,
  workingDays = 1,
  isLoading = false,
}: AttendanceCardProps) {
  if (isLoading) {
    return (
      <div className="glassline-card">
        <Skeleton className="w-24 h-3 rounded" />
        <Skeleton className="w-40 h-8 mt-2 rounded" />
        <Skeleton className="w-32 h-3 mt-2 rounded" />
        <Skeleton className="w-full h-1 mt-3 rounded-full" />
      </div>
    );
  }

  const progress = workingDays > 0 ? Math.min((presentCount / workingDays) * 100, 100) : 0;

  return (
    <div className="glassline-card">
      {/* Label */}
      <div className='w-full h-fit flex flex-row justify-between items-center'>
        <div className="flex items-center gap-2 relative">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-ping absolute bg-green-600"
            aria-hidden="true"
          />
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-green-600"
            aria-hidden="true"
          />
          <p className="glassline-label">TOTAL HADIR</p>
        </div>
        <CalendarCheck className='text-glass-secondary size-5' />
      </div>

      {/* Value */}
      <p
        className="text-[2.25rem] font-semibold mt-2 leading-none"
        style={{
          fontFamily: 'var(--font-geist-sans, sans-serif)',
          color: '#0F1419',
          letterSpacing: '-0.02em',
        }}
      >
        {presentCount}{' '}
        <span
          className="text-[1rem] font-normal"
          style={{ color: '#4A5568', letterSpacing: 'normal' }}
        >
          Hari
        </span>
      </p>

      {/* Subtext */}
      <p className="glassline-body mt-2">
        Dari {workingDays} hari kerja bulan ini
      </p>

      {/* Progress bar */}
      <div
        className="w-full mt-3 rounded-full overflow-hidden"
        style={{ height: '4px', backgroundColor: '#F1F3F5' }}
        role="progressbar"
        aria-valuenow={presentCount}
        aria-valuemin={0}
        aria-valuemax={workingDays}
        aria-label={`Kehadiran: ${presentCount} dari ${workingDays} hari`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: '#0F1419',
          }}
        />
      </div>
    </div>
  );
}
