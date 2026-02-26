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

export interface EditEmployeeProfileRequest extends Omit<Teacher, "guru_id" | "created_at" | "email_address" | "date_of_birth" | "join_date"> {
  join_date: Date;
  date_of_birth: Date;
}

export interface StoreEmployeeAttendanceRequest extends Omit<Attendance, "attendance_id" | "created_at" | "teacher_id" | "attendance_date" | "checkin_time" | "checkout_time"> {
  attendance_date: Date;
  checkin_time: number;
  checkout_time: number;
}

export interface AddEmployeeRequest extends Omit<Teacher, "guru_id" | "created_at" | "date_of_birth" | "join_date"> {
  password_email: string;
  date_of_birth: Date;
}

export interface EditEmployeeRequest extends Omit<Teacher, "guru_id" | "created_at" | "date_of_birth" | "join_date" | "email_address"> {
  date_of_birth: Date;
}

export interface GetEmployeeByIdData extends Teacher { }

export interface GetEmployeeByIdResponse {
  success: boolean;
  message: string;
  data: GetEmployeeByIdData;
}