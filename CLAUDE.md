# PayFlow Frontend — AI Context Document

## Project Overview
PayFlow adalah payroll web app full-stack.
Dibangun sebagai proyek UKOM SMK, dilanjutkan
post-wisuda sebagai personal project.

Saya adalah solo developer. Tolong ikuti semua
aturan di dokumen ini sebelum menulis kode apapun.

---

## Tech Stack
- Framework : Next.js 14 (App Router)
- Language  : TypeScript (strict)
- Styling   : Tailwind CSS + shadcn/ui
- HTTP      : Axios (custom instance)
- Forms     : React Hook Form + Zod
- State     : useState lokal (belum ada global state)
- Auth      : JWT di HTTPOnly Cookie

---

## Struktur Folder

src/
  app/
    (auth)/               ← halaman login, register
    (dashboard)/
      admin/              ← halaman role admin
        attendance/
        employee/
        payroll/
          manage/         ← kelola penggajian
          history/        ← riwayat penggajian
      employee/
        [companyId]/      ← semua halaman role employee
          attendance/
          me/
          payroll/
            live/         ← kalkulator gaji
            history/      ← riwayat gaji
      lobby/              ← list company user
  components/             ← reusable components
  lib/
    axios/
      userClient.ts       ← axios instance + interceptors
    services/
      admin/              ← service layer admin
      employee/           ← service layer employee
  types/                  ← TypeScript types
  utils/                  ← helper functions

---

## Transport Layer (PENTING)

File: src/lib/axios/userClient.ts

- Axios instance dengan withCredentials: true
- Auto refresh token via interceptor (401 handler)
- Error normalizer: server message di-attach
  ke error.message agar readable di catch block
- Semua request otomatis bawa HTTPOnly cookie

---

## Service Layer Pattern

Semua API call harus melalui service layer.
JANGAN query langsung di component atau page.

Pola yang benar:
  Component/Page
    → Service (src/lib/services/...)
      → userClient (axios instance)
        → Backend API

Contoh service:
  // Pendekatan A: throw error (untuk operasi mutation)
  export const joinCompany = async (payload) => {
    const response = await userClient.post("/company/join", payload)
    return response
  }

  // Pendekatan B: return object (untuk fetch data)
  export const getOwnCompany = async () => {
    try {
      const response = await userClient.get("/company")
      return { success: true, data: response.data.data }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

---

## Company Context

- Active company disimpan di URL params + cookie
- Route pattern: /employee/[companyId]/...
- companyId diambil dari useParams() di page
- Cookie key: "active_company_id"
- Saat user pilih company di lobby:
  setActiveCompany(companyId) → router.push(/employee/[companyId])

---

## Reusable Components (sudah ada)

- DataTable<T>        → tabel generik dengan column config
- MultiSelectGroup    → multi select + RHF compatible
- InputFileGroup      → file upload dengan avatar preview
- CompanyCard         → card display company di lobby
- InfoBadge           → badge dengan icon + className
- AttendanceBadge     → badge status absensi
- CollapsibleSidebar  → sidebar navigation collapsible
- SidebarNavLink      → single navigation link

---

## Coding Rules — WAJIB DIIKUTI

1. JANGAN ubah kode yang tidak diminta
2. JANGAN pakai `any` di TypeScript — define type proper
3. Semua komponen baru harus:
   - Reusable
   - forwardRef jika dipakai dengan RHF
   - Ada JSDoc comment per section
4. Ikuti Service Layer Pattern — tidak boleh
   query langsung di component
5. Gunakan cn() dari @/lib/utils untuk className merge
6. Tanya dulu jika ada ambiguitas sebelum eksekusi
7. Jangan install library baru tanpa konfirmasi

---

## Branch Structure

main     → production (deploy ke Vercel dari sini)
develop  → integration (gabungan fitur stable)
feature/ → per fitur (merge ke develop setelah selesai)

Contoh: feature/issue-3-payroll

---

## Current Progress

### Selesai ✅
- Auth: register, login, logout, refresh token
- Lobby: list company, add company, join via key
- Employee: dashboard, profile, attendance,
  payroll live (dummy), payroll history (dummy)
- Admin: dashboard, CRUD employee, attendance,
  payroll manage (dummy), payroll history (dummy)
- Sidebar: employee + admin (dengan dropdown user)
- Company card dengan industry badge mapping

### Belum selesai ⏳ (urutan prioritas)
1. Issue 3: Payroll real (connect ke backend)
2. Issue 4: Halaman owner & admin management
3. Issue 5: Transfer role / kepemilikan company

---

## Hal yang Perlu Diingat

- Semua halaman payroll saat ini masih DUMMY
  (data hardcoded, belum connect ke API)
- Route admin belum pakai [companyId] — masih /admin/...
  (akan dimigrate nanti ke /admin/[companyId]/...)
- shadcn/ui Combobox conflict dengan Dialog Radix —
  gunakan Popover + Command sebagai gantinya
- Extra usage di Pro plan bisa diaktifkan
  jika limit 5 jam habis