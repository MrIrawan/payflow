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
  home_address: string | null;
  job_title: string | null;
  company: string | null;
  net_salary: number | null;
  gender: string | null;
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