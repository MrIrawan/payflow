'use client';

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AttendanceBarChartData {
  /** Short month label — "Jan", "Feb", ..., "Des" */
  month: string;
  present: number;
  absent: number;
  late: number;
  permit: number;
}

export interface AttendanceBarChartProps {
  data: AttendanceBarChartData[];
  /** Default: current year */
  year?: number;
  className?: string;
  isLoading?: boolean;
}

// ── Design tokens ─────────────────────────────────────────────────────────────

const BAR_COLORS = {
  present: '#22c55e',            // primary
  absent: '#ef4444', // secondary / 40%
  late: '#F59E0B',               // amber-400
  permit: '#6B7280',             // gray-500
} as const;

const LEGEND_ITEMS = [
  { key: 'present', label: 'Hadir', color: BAR_COLORS.present },
  { key: 'absent', label: 'Absen', color: BAR_COLORS.absent },
  { key: 'permit', label: 'Izin', color: BAR_COLORS.permit },
  { key: 'late', label: 'Terlambat', color: BAR_COLORS.late },
] as const;

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-[10px] border px-4 py-3 shadow-sm"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(74,85,104,0.15)',
        fontFamily: 'var(--font-geist-mono, monospace)',
        fontSize: '0.75rem',
        color: '#4A5568',
      }}
    >
      <p className="font-medium mb-1.5" style={{ color: '#0F1419' }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.fill }}
          />
          <span>{entry.name}:</span>
          <span className="font-medium" style={{ color: '#0F1419' }}>
            {entry.value} hari
          </span>
        </p>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AttendanceBarChart
 *
 * Grouped bar chart showing monthly attendance statistics for the current year.
 * Uses recharts (bundled with shadcn/ui — no extra dependency).
 *
 * Glassline spec:
 *   card bg: surface (#FFFFFF) / border: secondary/15 / rounded 16px / p-6
 *   bars:    rounded top [4,4,0,0], 8px wide
 *   grid:    horizontal only, secondary/10, dashArray "4 4"
 *   tooltip: surface bg, secondary/15 border, Geist Mono 0.75rem
 */
export function AttendanceBarChart({
  data,
  year,
  className,
  isLoading = false,
}: AttendanceBarChartProps) {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <div
      className={cn('glassline-card', className)}
    >
      {/* ── Card header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        {/* Left: title */}
        <div className="flex flex-col gap-0.5">
          <p className="glassline-label">STATISTIK KEHADIRAN</p>
          <p
            className="text-[1.125rem] font-semibold leading-tight"
            style={{
              fontFamily: 'var(--font-geist-sans, sans-serif)',
              color: '#0F1419',
              letterSpacing: '-0.01em',
            }}
          >
            {currentYear}
          </p>
        </div>

        {/* Right: inline legend */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-1"
          style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.75rem', color: '#4A5568' }}
        >
          {LEGEND_ITEMS.map(({ key, label, color }) => (
            <span key={key} className="flex items-center gap-1.5">
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

      {/* ── Chart / Skeleton ─────────────────────────────────────────── */}
      {isLoading ? (
        <Skeleton className="w-full h-[200px] rounded-lg" />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="30%"
            barGap={2}
          >
            {/* Horizontal grid lines only */}
            <CartesianGrid
              vertical={false}
              stroke="rgba(74,85,104,0.10)"
              strokeDasharray="4 4"
            />

            {/* X-axis: month names */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: '0.65rem',
                fill: '#4A5568',
              }}
              dy={8}
            />

            {/* Custom tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(74,85,104,0.04)' }}
            />

            {/* Bars — present, absent, late, permit */}
            <Bar
              dataKey="present"
              name="Hadir"
              fill={BAR_COLORS.present}
              radius={[4, 4, 0, 0]}
              maxBarSize={8}
            />
            <Bar
              dataKey="absent"
              name="Absen"
              fill={BAR_COLORS.absent}
              radius={[4, 4, 0, 0]}
              maxBarSize={8}
            />
            <Bar
              dataKey="late"
              name="Terlambat"
              fill={BAR_COLORS.late}
              radius={[4, 4, 0, 0]}
              maxBarSize={8}
            />
            <Bar
              dataKey="permit"
              name="Izin"
              fill={BAR_COLORS.permit}
              radius={[4, 4, 0, 0]}
              maxBarSize={8}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
