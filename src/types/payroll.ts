// src/types/payroll.ts

// ==========================================
// 1. SHARED TYPES (Dipakai Admin & User)
// ==========================================

export interface BaseResponse {
    success: boolean;
    message: string;
}

// Interface ini merepresentasikan struktur tabel 'payroll_history' di database Supabase kamu
export interface PayrollHistoryItem {
    payroll_id: string;
    teacher_id: string;
    teacher_name: string;
    total_weekly_hours: number; // Jam ajar asli yang terkunci
    total_hadir: number;
    bonus_tambahan: number;
    teaching_salary: number;
    transport_salary: number;
    total_salary: number;
    period_month: number;
    period_year: number;
    created_at: string; // Otomatis dari Supabase (timestamptz)
}


// ==========================================
// 2. ADMIN PAYROLL TYPES
// ==========================================

// Item untuk tabel preview gaji admin (sebelum dikunci)
export interface AdminPayrollPreviewItem {
    teacher_id: string;
    teacher_name: string;
    total_weekly_hours: number; // Diambil dari data_guru
    total_hadir: number;        // Diambil dari filter absensi 'present'
    teaching_salary: number;
    transport_salary: number;
    total_salary: number;
}

// Response GET /api/admin/payroll/preview
export interface GetAdminPayrollPreviewResponse extends BaseResponse {
    data: AdminPayrollPreviewItem[];
}

// Request Body untuk POST /api/admin/payroll/generate
export interface GeneratePayrollRequest {
    month: number;
    year: number;
}

// Response GET /api/admin/payroll/history
export interface GetAdminPayrollHistoryResponse extends BaseResponse {
    data: PayrollHistoryItem[];
}


// ==========================================
// 3. USER PAYROLL TYPES
// ==========================================

// Objek tunggal untuk live kalkulator user
export interface UserLivePayrollData {
    teacher_id: string;
    teacher_name: string;
    period_month: number;
    period_year: number;
    total_weekly_hours: number;
    total_hadir: number;
    teaching_salary: number;
    transport_salary: number;
    total_salary: number;
}

// Response GET /api/user/payroll/live
export interface GetUserLivePayrollResponse extends BaseResponse {
    data: UserLivePayrollData | null; // Bisa null jika terjadi error
}

// Request Query Params untuk GET User Payroll (Opsional, biasa dipakai di Axios config)
export interface GetUserLivePayrollRequestParams {
    teacher_id: string;
    month: number;
    year: number;
}

export interface GetUserPayrollHistoryRequestParams {
    teacher_id: string;
    year: number;
}

// Response GET /api/user/payroll/history
export interface GetUserPayrollHistoryResponse extends BaseResponse {
    data: PayrollHistoryItem[];
}