export interface SignUpUser {
  id: string;
  email: string;
  created_at: string;
  email_confirm_at: string;
  metadata: Record<string, unknown>;
}

export interface SignUpSession {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
}

export interface SignUpResponseData {
  user: SignUpUser;
  session: SignUpSession;
}

export interface SignUpResponse {
  data: SignUpResponseData;
  message: string;
  success: boolean;
}

export interface SignInUser {
  id: string;
  email: string;
  created_at: string;
  email_confirm_at: string;
  metadata: Record<string, unknown>;
}

export interface SignInSession {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
}

export interface SignInResponseData {
  user: SignInUser;
  session: SignInSession;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  data: SignInResponseData;
}

export interface GetAllTeachersResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllTeachers[];
}

export interface GetAllTeachers {
  guru_id: string;
  created_at: string;
  full_name: string;
  date_of_birth: string;
  email_address: string;
  home_address: string;
  job_title: string[]; // Ini array
  company: string;
  gender: "male" | "female";
  join_date: string;    // Tambahkan ini agar sinkron dengan API
  subject_name: string[]; // Ini array
}

export interface GetTeahersByGenderResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetTeahersByGender[];
}

export interface GetTeahersByGender {
  guru_id: string;
  created_at: string;
  full_name: string;
  date_of_birth: string;
  home_address: string | null;
  job_title: string | null;
  company: string | null;
  net_salary: number | null;
  gender: string | null;
}

export interface GetAllAttendanceResponse {
  success: boolean;
  message: string;
  data: GetAllAttendance[];
}

export interface GetAllAttendance {
  attendance_id: string;
  created_at: string;
  attendance_date: string;
  checkin_time: string;
  checkout_time: string;
  attendance_status: "present" | "on leave" | "absent";
  teacher_name: string;
}

export interface StoreAttendanceResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllAttendance;
}

export interface StoreTeacherDataResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllTeachers;
}

export interface DeleteTeacherDataResponse {
  success: boolean;
  statusText: string;
  message: string;
}

export interface AdminSignInResponse {
  success: boolean;
  message: string;
}

export interface UpdateAttendanceResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllAttendance;
}

export interface UpdateTeacherDataResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllTeachers;
}

export interface GetTeacherByIdResponse {
  success: boolean;
  statusText: string;
  message: string;
  data: GetAllTeachers;
}

export interface GetAllAttendanceChartData {
  month: string,
  present: number,
  absent: number,
  onLeave: number
}

export interface GetAllAttendanceChart {
  month: number,
  year: 2025,
  data: GetAllAttendanceChartData[],
}

export interface GetAllAttendanceChartResponse {
  success: boolean;
  message: string;
  data: GetAllAttendanceChart;
}

// 1. Interface untuk Profil Guru
export interface GuruProfile {
  guru_id: string;
  created_at: string; // ISO Date string
  full_name: string;
  date_of_birth: string; // YYYY-MM-DD
  home_address: string | null; // Bisa null
  job_title: string | null;    // Bisa null
  company: string;
  gender: 'male' | 'female';   // Menggunakan Union Type agar lebih spesifik
  email_address: string;
  join_date: string; // ISO Date string
  subject_name: string | null; // Bisa null
}

// 2. Interface untuk Ringkasan Kehadiran
export interface AttendanceSummary {
  month: number;
  year: number;
  present: number;
  absent: number;
  onLeave: number;
}

// 3. Interface untuk Item Chart (Grafik)
export interface AttendanceChartItem {
  month: number;
  present: number;
  absent: number;
  onLeave: number;
}

// 4. Interface untuk Data Gaji
export interface SalaryInfo {
  base_salary: number;
  attendance_bonus: number;
  deduction: number;
  estimated_salary: number;
  last_updated: string; // ISO Date string
}

// 5. Interface untuk Objek "Data" Utama
export interface DashboardData {
  profile: GuruProfile;
  attendanceSummary: AttendanceSummary;
  attendanceChart: AttendanceChartItem[]; // Array of chart items
  salary: SalaryInfo;
}

// 6. Interface Utama (Root Response API)
export interface GuruDashboardResponse {
  success: boolean;
  guruId: string;
  data: DashboardData;
}

export interface UserPayrollCalculation {
  payroll_id: string;
  teacher_id: string;
  teacher_name: string;
  total_weekly_hours: number;
  total_hadir: number;
  bonus_tambahan: number;
  teaching_salary: number;
  transport_salary: number;
  total_salary: number;
  period_month: number;
  period_year: number;
  created_at: string;
}

export interface UserPayrollCalculationResponse {
  message: string | number;
  data: UserPayrollCalculation;
}