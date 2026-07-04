'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'permit' | 'holiday' | 'weekend';

export interface AttendanceDayData {
  date: Date;
  /** null = no data yet (future dates) */
  status: AttendanceStatus | null;
}

export interface AttendanceCalendarProps {
  data: AttendanceDayData[];
  /** 0–11, default: current month */
  month?: number;
  /** default: current year */
  year?: number;
  className?: string;
  isLoading?: boolean;
}

// ── Design constants ───────────────────────────────────────────────────────────

const DAY_HEADERS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

/** Maps JS getDay() (0=Sun) → Mon-first column index (0=Mon…6=Sun) */
function jsToMonFirst(jsDay: number): number {
  return (jsDay + 6) % 7;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// ── Per-status visual tokens ───────────────────────────────────────────────────

interface StatusStyle {
  bg: string;
  text: string;
  dot: string | null;
  label: string;
}

const STATUS_STYLES: Record<AttendanceStatus, StatusStyle> = {
  present: { bg: '#dcfce7', text: '#0F1419', dot: '#22c55e', label: 'Hadir' },
  absent: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', label: 'Absen' },
  late: { bg: '#FFF7ED', text: '#EA580C', dot: '#FB923C', label: 'Terlambat' },
  permit: { bg: '#FFFBEB', text: '#D97706', dot: '#FBBF24', label: 'Izin' },
  holiday: { bg: 'transparent', text: 'rgba(74,85,104,0.40)', dot: null, label: 'Libur' },
  weekend: { bg: 'transparent', text: 'rgba(74,85,104,0.40)', dot: null, label: 'Akhir Pekan' },
};

// ── Legend summary ─────────────────────────────────────────────────────────────

const LEGEND_SUMMARY_STATUSES = ['present', 'absent', 'permit', 'late'] as const;
type SummaryStatus = (typeof LEGEND_SUMMARY_STATUSES)[number];

const LEGEND_HEADER = [
  { status: 'present' as SummaryStatus, label: 'Hadir', color: '#22c55e' },
  { status: 'absent' as SummaryStatus, label: 'Absen', color: '#EF4444' },
  { status: 'permit' as SummaryStatus, label: 'Izin', color: '#6B7280' },
  { status: 'late' as SummaryStatus, label: 'Terlambat', color: '#FB923C' },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AttendanceCalendar
 *
 * Google-Calendar-style monthly grid for current-month attendance.
 * Each cell: date number + status dot. Today has cobalt border.
 * Hover shows shadcn Tooltip with day name, date, and status.
 * Summary counts appear below the grid.
 *
 * Glassline spec:
 *   card bg: surface / border: secondary/15 / rounded 16px / p-6
 *   today: border tertiary (#2C5EF5), bg tertiary/5
 *   cells: 7-col grid, aspect-square, min-h 40px
 */
export function AttendanceCalendar({
  data,
  month,
  year,
  className,
  isLoading = false,
}: AttendanceCalendarProps) {
  const now = new Date();
  const targetMonth = month ?? now.getMonth();
  const targetYear = year ?? now.getFullYear();

  // ── Build calendar grid ────────────────────────────────────────────

  const firstDay = new Date(targetYear, targetMonth, 1);
  const totalDays = new Date(targetYear, targetMonth + 1, 0).getDate();
  const startCol = jsToMonFirst(firstDay.getDay()); // 0=Mon offset

  /** Quick lookup: "YYYY-MM-DD" → status */
  const statusMap = new Map<string, AttendanceStatus | null>();
  for (const d of data) {
    const key = d.date.toISOString().slice(0, 10);
    statusMap.set(key, d.status);
  }

  /** Today's date string for comparison */
  const todayStr = now.toISOString().slice(0, 10);

  // ── Summary counts ─────────────────────────────────────────────────

  const counts: Record<SummaryStatus, number> = {
    present: 0, absent: 0, late: 0, permit: 0,
  };
  for (const d of data) {
    const s = d.status as SummaryStatus | null;
    if (s && s in counts) counts[s]++;
  }

  // ── Render skeleton ────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className={cn('glassline-card', className)}>
        {/* Header skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-36 h-3 rounded" />
            <Skeleton className="w-28 h-5 rounded" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-14 h-4 rounded" />
            ))}
          </div>
        </div>
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_HEADERS.map((h) => (
            <Skeleton key={h} className="h-3 rounded mx-0.5" />
          ))}
        </div>
        {/* Cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-[10px]" />
          ))}
        </div>
      </div>
    );
  }

  // ── Render calendar ────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn('glassline-card', className)}>

        {/* ── Card header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          {/* Left */}
          <div className="flex flex-col gap-0.5">
            <p className="glassline-label">ABSENSI BULAN INI</p>
            <p
              className="text-[1.125rem] font-semibold leading-tight"
              style={{
                fontFamily: 'var(--font-geist-sans, sans-serif)',
                color: '#0F1419',
                letterSpacing: '-0.01em',
              }}
            >
              {MONTH_NAMES[targetMonth]} {targetYear}
            </p>
          </div>

          {/* Right: legend */}
          <div
            className="flex flex-wrap gap-x-3 gap-y-1"
            style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.7rem', color: '#4A5568' }}
          >
            {LEGEND_HEADER.map(({ status, label, color }) => (
              <span key={status} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Day-of-week headers ───────────────────────────────── */}
        <div
          className="grid grid-cols-7 mb-2"
          style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.7rem', color: '#4A5568' }}
        >
          {DAY_HEADERS.map((h) => (
            <span key={h} className="text-center py-1 select-none">
              {h}
            </span>
          ))}
        </div>

        {/* ── Calendar grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-7 gap-1">
          {/* Leading empty cells */}
          {Array.from({ length: startCol }).map((_, i) => (
            <div key={`empty-${i}`} aria-hidden="true" />
          ))}

          {/* Day cells */}
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;
            const dateObj = new Date(targetYear, targetMonth, day);
            const dateStr = dateObj.toISOString().slice(0, 10);
            const jsDay = dateObj.getDay(); // 0=Sun

            const isToday = dateStr === todayStr;
            const isFuture = dateStr > todayStr;
            const isWeekend = jsDay === 0 || jsDay === 6;
            const rawStatus = statusMap.get(dateStr) ?? null;

            // Determine effective status
            let effectiveStatus: AttendanceStatus | null = rawStatus;
            if (!effectiveStatus && isWeekend) effectiveStatus = 'weekend';

            // Cell visual
            const style = effectiveStatus
              ? STATUS_STYLES[effectiveStatus]
              : null;

            const cellBg = isToday
              ? 'rgba(44,94,245,0.05)'
              : isFuture && !isWeekend
                ? '#F1F3F5'
                : (style?.bg ?? 'transparent');

            const textColor = isToday
              ? '#2C5EF5'
              : isFuture && !isWeekend
                ? 'rgba(74,85,104,0.30)'
                : (style?.text ?? '#4A5568');

            const showDot = !isToday && !isFuture && style?.dot;
            const tooltipLabel = style ? style.label : null;
            const dayName = DAY_NAMES[jsDay];
            const monthName = MONTH_NAMES[targetMonth];

            const cell = (
              <div
                key={dateStr}
                className="relative flex flex-col items-center justify-center min-h-[40px] aspect-square rounded-[10px] select-none"
                style={{
                  backgroundColor: cellBg,
                  border: isToday ? '1px solid #2C5EF5' : '1px solid transparent',
                  cursor: tooltipLabel ? 'default' : 'default',
                }}
                aria-label={tooltipLabel ? `${dayName}, ${day} ${monthName} — ${tooltipLabel}` : `${dayName}, ${day} ${monthName}`}
              >
                {/* Date number */}
                <span
                  className="text-[0.75rem] leading-none"
                  style={{
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    color: textColor,
                    fontWeight: isToday ? 600 : 400,
                  }}
                >
                  {day}
                </span>

                {/* Status dot */}
                {showDot && (
                  <span
                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: style!.dot! }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );

            // Only wrap with Tooltip if there's a meaningful status to show
            if (tooltipLabel && !isWeekend && !isFuture) {
              return (
                <Tooltip key={dateStr}>
                  <TooltipTrigger asChild>{cell}</TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="rounded-[10px] border shadow-sm px-3 py-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: 'rgba(74,85,104,0.15)',
                      fontFamily: 'var(--font-geist-mono, monospace)',
                      fontSize: '0.75rem',
                      color: '#4A5568',
                    }}
                  >
                    <p className="font-medium" style={{ color: '#0F1419' }}>
                      {dayName}, {day} {monthName}
                    </p>
                    <p className="mt-0.5">Status: {tooltipLabel}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return cell;
          })}
        </div>

        {/* ── Legend summary below calendar ─────────────────────── */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-1 mt-4 pt-4"
          style={{
            borderTop: '1px solid rgba(74,85,104,0.10)',
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontSize: '0.75rem',
            color: '#4A5568',
          }}
        >
          {LEGEND_SUMMARY_STATUSES.map((s) => {
            const meta = LEGEND_HEADER.find((l) => l.status === s)!;
            return (
              <span key={s} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />
                <span>{meta.label}</span>
                <span
                  className="font-medium tabular-nums"
                  style={{ color: '#0F1419' }}
                >
                  {counts[s]} hari
                </span>
              </span>
            );
          })}
        </div>

      </div>
    </TooltipProvider>
  );
}
