export interface Teacher {
    employee_id: string;
    user_id: string;
    company_id: number;
    created_at: string;
    full_name: string;
    email: string;

    // Data Pribadi & Kontak
    date_of_birth: string; // Format YYYY-MM-DD
    address: string;
    gender: "male" | "female";

    // Data Pekerjaan
    company_name: string;
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
    company_id: number;
    employee_id: string;
    created_at: string;
    attendance_date: string; // YYYY-MM-DD

    checkin_time: string | null;
    checkout_time: string | null;

    // Sesuaikan dengan ENUM di database kamu
    status: "present" | "absent" | "late" | "permit";
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

export interface Companies {
    company_id: number;
    owner_id: string;
    company_name: string;
    company_key: string;
    company_field: string[];
    company_description: string;
    company_avatar: string;
    themeConfig: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        textColor: string;
    };
    total_employees: number;
    created_at: string;
    updated_at: string;
}