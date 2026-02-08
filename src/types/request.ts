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
  full_name: string;
  date_of_birth: Date;
  gender: "male" | "female";
  email_address: string;
  home_address: string;
  net_salary: number;
  job_title: string;
  company: string;
}

export interface UpdateAttendanceRequest {
  teacher_name: string,
  attendance_date: Date,
  checkin_time: number,
  checkout_time: number,
  attendance_status: "present" | "absent" | "on leave",
}

export interface UpdateTeacherDataRequest {
  full_name: string | undefined;
  date_of_birth: Date | undefined;
  gender: "male" | "female" | undefined;
  email_address: string | undefined;
  home_address: string | undefined;
  net_salary: number | undefined;
  job_title: string | undefined;
  company: string | undefined;
}