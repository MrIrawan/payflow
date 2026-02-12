import { UserLocation } from "./types";

export interface SignUpRequest {
  first_name: string;
  last_name?: string;
  date_of_birth: Date;
  gender: "male" | "female";
  email_address: string;
  password_email: string;
}

export interface SignInRequest {
  username?: string;
  email_address: string;
  password_email: string;
}

export interface AdminSignInRequest {
  username: string;
  password: string;
}

export interface StoreAttendanceRequest {
  teacher_name: string,
  attendance_date: Date,
  checkin_time: number,
  checkout_time: number,
  attendance_status: "present" | "absent" | "on leave",
  location?: UserLocation;
}

export interface StoreTeacherDataRequest {
  full_name: string | undefined;
  date_of_birth: Date | undefined;
  join_date: Date | undefined;
  email_address: string;
  password_email: string;
  home_address: string | undefined;
  subject_name: string[] | undefined;
  job_title: string[] | undefined;
  company: string | undefined;
  gender: string | undefined;
}

export interface UpdateAttendanceRequest {
  teacher_name: string,
  attendance_date: Date,
  checkin_time: number,
  checkout_time: number,
  attendance_status: "present" | "absent" | "on leave",
}

export interface UpdateTeacherDataRequest {
  guru_id: string;
  created_at: string;
  full_name: string;
  date_of_birth: Date;
  home_address: string;
  job_title: string[]; // Ini array
  company: string;
  gender: "male" | "female";
  join_date: Date;    // Tambahkan ini agar sinkron dengan API
  subject_name: string[]; // Ini array
}

export interface EditUserProfileRequest {
  full_name?: string | undefined;
  date_of_birth?: Date | undefined;
  join_date?: Date | undefined;
  home_address?: string | undefined;
  subject_name?: string[] | undefined;
  job_title?: string[] | undefined;
  company?: string | undefined;
  gender?: string | undefined;
}

export interface UserPayrollCalculationRequest {
  teacherId: string;
  totalWeeklyHours: number;
  month: number;
  year: number;
}
