import { Attendance, Teacher } from "./base";

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

export interface GetAllTeachers extends Teacher { };

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

export interface GetAllAttendance extends Omit<Attendance, "checkin_time" | "checkout_time"> {
  checkin_time: string;
  checkout_time: string;
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

export interface TeacherProfile extends Omit<Teacher, "home_address" | "job_title" | "subject_name"> {
  home_address: string | null;
  job_title: string[] | null;
  subject_name: string[] | null;
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
  month: string;
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
export interface GetTeacherInfo {
  profile: TeacherProfile;
  attendanceSummary: AttendanceSummary;
  attendanceChart: AttendanceChartItem[]; // Array of chart items
  salary: SalaryInfo;
}

// 6. Interface Utama (Root Response API)
export interface GuruDashboardResponse {
  success: boolean;
  guruId: string;
  data: GetTeacherInfo;
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