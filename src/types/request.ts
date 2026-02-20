import { Attendance, Teacher } from "./base";
import { UserLocation } from "./types";

export interface SignUpEmployeeRequest {
  first_name: string;
  last_name?: string;
  date_of_birth: Date;
  gender: "male" | "female";
  email_address: string;
  password_email: string;
}

export interface SignInEmployeeRequest {
  username?: string;
  email_address: string;
  password_email: string;
}

export interface SignInAdminRequest {
  username: string;
  password: string;
}

export interface StoreAttendanceRequest extends Omit<Attendance, "attendance_id" | "created_at" | "attendance_date" | "checkin_time" | "checkout_time"> {
  attendance_date: Date;
  checkin_time: number;
  checkout_time: number;
  location?: UserLocation;
}

export interface StoreTeacherDataRequest extends Omit<Teacher, "guru_id" | "created_at" | "date_of_birth" | "join_date"> {
  password_email: string;
  date_of_birth: Date;
  join_date: Date;
}

export interface UpdateAttendanceRequest extends Omit<Attendance, "attendance_id" | "created_at" | "attendance_date" | "checkin_time" | "checkout_time"> {
  attendance_date: Date;
  checkin_time: number;
  checkout_time: number;
}

export interface UpdateTeacherDataRequest extends Omit<Teacher, "created_at" | "email_address" | "date_of_birth" | "join_date"> {
  date_of_birth: Date;
  join_date: Date;
}

export interface EditUserProfileRequest extends Omit<Teacher, "guru_id" | "created_at" | "email_address" | "date_of_birth" | "join_date"> {
  date_of_birth: Date;
  join_date: Date;
}

export interface UserPayrollCalculationRequest {
  teacherId: string;
  totalWeeklyHours: number;
  month: number;
  year: number;
}
