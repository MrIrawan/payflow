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
  nama_lengkap: string;
  date_of_birth: string;
  home_address: string | null;
  job_title: string | null;
  company: string | null;
  net_salary: number | null;
  jenis_kelamin: string | null;
}