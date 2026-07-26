'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb/dashboard-breadcrumb';
import { toast } from 'sonner';
import { Toaster } from '@/components/Toaster/toaster';

import { WelcomeSign } from '@/components/WelcomeSign/welcome-sign';
import { SalaryCard } from '@/components/DataCard/salary-card';
import { AttendanceCard } from '@/components/DataCard/attendance-card';
import { PayslipCard } from '@/components/DataCard/payslip-card';
import { AttendanceBarChart, type AttendanceBarChartData } from '@/components/AttendanceBarChart/attendance-bar-chart';
import {
  AttendanceCalendar,
  type AttendanceDayData,
  type AttendanceStatus,
} from '@/components/AttendanceCalendar/attendance-calendar';

import { getEmployeeInfo } from '@/lib/services/employee/info/getEmployeeInfo';
import { setActiveCompany } from '@/utils/activeCompany';
import { type GetEmployeeInfoData } from '@/types/response';
import { type Attendance } from '@/types/base';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Count working days (Mon–Fri) in a given month */
function getWorkingDaysInMonth(year: number, month: number): number {
  const days = new Date(year, month + 1, 0).getDate();
  let count = 0;
  for (let d = 1; d <= days; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

/** Short month label — matches planning.md spec */
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** Full Indonesian month name */
const FULL_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/**
 * Build AttendanceBarChartData[] grouped by month for the current year.
 * Only months that have any record are populated; the rest default to 0.
 */
function buildChartData(attendances: Attendance[], year: number): AttendanceBarChartData[] {
  const map: Record<number, AttendanceBarChartData> = {};

  for (let m = 0; m < 12; m++) {
    map[m] = { month: SHORT_MONTHS[m], present: 0, absent: 0, late: 0, permit: 0 };
  }

  for (const a of attendances) {
    const d = new Date(a.attendance_date);
    if (d.getFullYear() !== year) continue;
    const m = d.getMonth();
    const entry = map[m];
    if (a.status === 'present') entry.present++;
    else if (a.status === 'absent') entry.absent++;
    else if (a.status === 'late') entry.late++;
    else if (a.status === 'permit') entry.permit++;
  }

  return Object.values(map);
}

/**
 * Build AttendanceDayData[] for the current month.
 * Weekends are flagged; future dates get null status.
 */
function buildCalendarData(
  attendances: Attendance[],
  year: number,
  month: number,
): AttendanceDayData[] {
  const statusMap = new Map<string, AttendanceStatus>();

  for (const a of attendances) {
    const d = new Date(a.attendance_date);
    if (d.getFullYear() !== year || d.getMonth() !== month) continue;
    const key = a.attendance_date.slice(0, 10);
    statusMap.set(key, a.status as AttendanceStatus);
  }

  const totalDays = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);
  const result: AttendanceDayData[] = [];

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().slice(0, 10);
    const dow = date.getDay();
    const isPast = key <= todayStr;

    let status: AttendanceStatus | null = statusMap.get(key) ?? null;

    if (!status && (dow === 0 || dow === 6)) {
      status = 'weekend';
    } else if (!status && !isPast) {
      status = null; // future, no data
    }

    result.push({ date, status });
  }

  return result;
}

// ── Dummy data — used until real fetching is wired in ──────────────────────────

const DUMMY_FIRST_NAME = 'Budi';
const DUMMY_NET_SALARY = 6_750_000;

function buildDummyAttendances(): Attendance[] {
  const now = new Date();
  const year = now.getFullYear();
  const records: Attendance[] = [];
  let idCounter = 1;

  // ─ Generate 6 months of dummy data for the bar chart ─
  const statuses: Array<'present' | 'absent' | 'late' | 'permit'> = [
    'present', 'present', 'present', 'present', 'present',
    'late', 'absent', 'permit',
  ];

  for (let month = 0; month < now.getMonth() + 1; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dow = date.getDay();
      if (dow === 0 || dow === 6) continue; // skip weekends
      const dateStr = date.toISOString().slice(0, 10);
      if (dateStr > now.toISOString().slice(0, 10)) break; // don't exceed today

      const status = statuses[(idCounter - 1) % statuses.length];
      records.push({
        attendance_id: `dummy-${idCounter++}`,
        company_id: 1,
        employee_id: 'dummy-employee',
        created_at: dateStr,
        attendance_date: dateStr,
        checkin_time: status !== 'absent' ? '08:00:00' : null,
        checkout_time: status !== 'absent' ? '17:00:00' : null,
        status,
      });
    }
  }

  return records;
}

const DUMMY_ATTENDANCES: Attendance[] = buildDummyAttendances();
const DUMMY_PAYSLIPS_COUNT = 3;

// ── Page component ─────────────────────────────────────────────────────────────

export default function UserDashboard() {
  const params = useParams();
  const router = useRouter();

  const companyId = Number(params.companyId);

  const [employeeInfo, setEmployeeInfo] = useState<GetEmployeeInfoData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // ── Date constants ─────────────────────────────────────────────────
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // ── Derived values (from real data OR dummy while loading) ─────────
  const profile = employeeInfo?.profile;
  const attendances = employeeInfo?.attendance ?? DUMMY_ATTENDANCES;
  const payslips = employeeInfo?.payslips ?? [];

  const firstName = profile?.full_name?.split(' ')[0] ?? DUMMY_FIRST_NAME;

  const currentMonthAttendances = attendances.filter((a) => {
    const d = new Date(a.attendance_date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const presentCount = currentMonthAttendances.filter((a) => a.status === 'present').length;
  const workingDays = getWorkingDaysInMonth(currentYear, currentMonth);

  const netSalary = payslips.length > 0
    ? payslips.reduce((sum, p) => sum + (p.total_salary ?? 0), 0)
    : DUMMY_NET_SALARY;

  const payslipCount = payslips.length > 0 ? payslips.length : DUMMY_PAYSLIPS_COUNT;

  const chartData = buildChartData(attendances, currentYear);
  const calendarData = buildCalendarData(attendances, currentYear, currentMonth);

  // ── Data fetching ──────────────────────────────────────────────────
  useEffect(() => {
    if (!companyId || isNaN(companyId)) {
      router.replace('/lobby');
      return;
    }

    setActiveCompany(companyId);

    async function fetchEmployeeInfo() {
      setIsLoading(true);
      const response = await getEmployeeInfo(companyId);

      if (response.success === false) {
        toast.custom(() => (
          <Toaster
            variant="error"
            title="Gagal memuat data dashboard"
            description={response.message || 'Gagal mengambil data info dashboard pegawai.'}
          />
        ));
        setIsLoading(false);
        return;
      }

      if (response.data !== null) {
        setEmployeeInfo(response.data);
      }
      setIsLoading(false);
    }

    fetchEmployeeInfo();
  }, [companyId, router]);

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div
      className="flex flex-col gap-8 p-6 w-full min-h-screen bg-glass-neutral"
    >
      {/* 1. PageHeader */}
      <PageHeader />

      {/* 2. Welcome Sign */}
      <WelcomeSign
        firstName={isLoading ? undefined : firstName}
        month={FULL_MONTHS[currentMonth]}
        year={currentYear}
        isLoading={isLoading}
      />

      {/* 3. Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SalaryCard
          netSalary={isLoading ? undefined : netSalary}
          month={FULL_MONTHS[currentMonth]}
          isLoading={isLoading}
        />
        <AttendanceCard
          presentCount={isLoading ? undefined : presentCount}
          workingDays={isLoading ? undefined : workingDays}
          isLoading={isLoading}
        />
        <PayslipCard
          payslipCount={isLoading ? undefined : payslipCount}
          isLoading={isLoading}
        />
      </div>

      {/* 4. Attendance Bar Chart */}
      <AttendanceBarChart
        data={chartData}
        year={currentYear}
        isLoading={isLoading}
      />

      {/* 5. Attendance Calendar */}
      <AttendanceCalendar
        data={calendarData}
        month={currentMonth}
        year={currentYear}
        isLoading={isLoading}
      />
    </div>
  );
}

// ── PageHeader (local, tidak diubah dari sebelumnya) ──────────────────────────

function PageHeader() {
  return (
    <div className="h-fit w-full flex flex-row items-center gap-3">
      <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 hover:bg-muted" />
      <DashboardBreadcrumb data={{ page: 'Dashboard' }} />
    </div>
  );
}