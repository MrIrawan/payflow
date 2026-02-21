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