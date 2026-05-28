import { Attendance, Companies, PayrollHistory, Teacher } from "./base";

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

export interface SignInAdminResponse {
  success: boolean;
  message: string;
}

// Diganti dari "extends Teacher {}" ke type alias
// untuk menghindari no-empty-object-type error
export type GetEmployeeProfileData = Teacher;

export interface GetEmployeeProfileResponse {
  success: boolean;
  message: string;
  data: GetEmployeeProfileData;
}

export type EditEmployeeProfileData = Teacher;

export interface EditEmployeeProfileResponse {
  success: boolean;
  message: string;
  data: EditEmployeeProfileData;
}

export interface LogOutEmployeeResponse {
  success: boolean;
  message: string;
}

export type GetEmployeeAttendanceData = Attendance;

export interface GetEmployeeAttendanceResponse {
  success: boolean;
  message: string;
  data: GetEmployeeAttendanceData;
}

export type StoreEmployeeAttendanceData = Attendance;

export interface StoreEmployeeAttendanceResponse {
  success: boolean;
  message: string;
  data: StoreEmployeeAttendanceData;
}

export interface GetAdminInfoData {
  teachers: Teacher[];
  attendances: Attendance[];
}

export interface GetAdminInfoResponse {
  success: boolean;
  message: string;
  data: GetAdminInfoData;
}

export type GetPayrollHistoryData = PayrollHistory;

export interface GetPayrollHistoryResponse {
  success: boolean;
  message: string;
  data: GetPayrollHistoryData[];
}

export interface LogOutAdminResponse {
  success: boolean;
  message: string;
}

export type GetAllEmployeesData = Teacher;

export interface GetAllEmployeesResponse {
  success: boolean;
  message: string;
  data: GetAllEmployeesData[];
}

export interface GetAllEmployeesOnCompanyData {
  employees: Teacher[];
  companyName: string;
  currentUser: string;
}

export interface GetAllEmployeesOnCompanyResponse {
  success: boolean;
  message: string;
  data: GetAllEmployeesOnCompanyData;
}

export type AddEmployeeData = Teacher;

export interface AddEmployeeResponse {
  success: boolean;
  message: string;
  data: AddEmployeeData;
}

export type EditEmployeeData = Teacher;

export interface EditEmployeeResponse {
  success: boolean;
  message: string;
  data: EditEmployeeData;
}

export interface DeleteEmployeeResponse {
  success: boolean;
  message: string;
}

export type GetAllAttendances = Attendance;

export interface GetAllAttendancesResponse {
  success: boolean;
  message: string;
  data: GetAllAttendances[];
}

export type AddAttendanceData = Attendance;

export interface AddAttendanceResponse {
  success: boolean;
  message: string;
  data: AddAttendanceData;
}

export type EditAttendanceData = Attendance;

export interface EditAttendanceResponse {
  success: boolean;
  message: string;
  data: EditAttendanceData;
}

export interface DeleteAttendanceResponse {
  success: boolean;
  message: string;
}

export interface GetEmployeeInfoData {
  profile: Teacher;
  attendance: Attendance[];
  payslips: PayrollHistory[];
}

export interface GetEmployeeInfoResponse {
  success: boolean;
  message: string;
  data: GetEmployeeInfoData;
}

export interface GetOwnCompanyResponse {
  success: boolean;
  message: string;
  data: GetOwnCompanyData;
}

export type GetOwnCompanyData = Companies;

export interface AddNewCompanyResponse {
  success: boolean;
  message: string;
  data: AddNewCompanyData;
}

export type AddNewCompanyData = Companies;

export interface JoinCompanyData {
  company_id: number;
  company_name: string;
  role: string;
  is_new: boolean;
}

export interface JoinCompanyResponse {
  success: boolean;
  message: string;
  data: JoinCompanyData;
}