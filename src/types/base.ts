export interface Teacher {
    guru_id: string;
    created_at: string;
    full_name: string;
    email_address: string;

    // Data Pribadi & Kontak
    date_of_birth: string; // Format YYYY-MM-DD
    home_address: string;
    gender: "male" | "female";

    // Data Pekerjaan
    company: string;
    join_date: string;     // ISO String

    // Array Data (Pastikan di DB tipenya text[] atau jsonb)
    job_title: string[];
    subject_name: string[];

    // Opsional (jika ada kemungkinan null di DB)
    total_weekly_hours?: number;
}

/**
 * REPRESENTASI TABEL 'absensi'
 */
export interface Attendance {
    attendance_id: string;
    created_at: string;
    attendance_date: string; // YYYY-MM-DD

    checkin_time: string | null;
    checkout_time: string | null;

    // Sesuaikan dengan ENUM di database kamu
    attendance_status: "present" | "absent" | "on leave";

    // Relasi (Biasanya nama, tapi idealnya ID)
    teacher_name: string;
    teacher_id?: string; // Opsional jika belum migrasi kolom ID
}

/**
 * REPRESENTASI TABEL 'payroll_history'
 */
export interface PayrollHistory {
    payroll_id: string;
    created_at: string;

    teacher_id: string;
    teacher_name: string;

    period_month: number;
    period_year: number;

    total_weekly_hours: number;
    total_hadir: number;

    // Financials
    teaching_salary: number;
    transport_salary: number;
    bonus_tambahan: number;
    total_salary: number;
}