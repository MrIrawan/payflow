// Utility untuk manage active company di client-side cookie.
// Dipakai saat user pilih company di lobby → set cookie
// lalu redirect ke /dashboard/[companyId]

const COOKIE_KEY = "active_company_id"
const COOKIE_EXPIRES_DAYS = 7

// Set active company — dipanggil saat user klik company card di lobby
export function setActiveCompany(companyId: number): void {
    const expires = new Date()
    expires.setDate(expires.getDate() + COOKIE_EXPIRES_DAYS)

    document.cookie = [
        `${COOKIE_KEY}=${companyId}`,
        `expires=${expires.toUTCString()}`,
        `path=/`,
        `SameSite=Strict`,
        process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
        .filter(Boolean)
        .join("; ")
}

// Get active company dari cookie — dipakai di middleware
export function getActiveCompany(): number | null {
    if (typeof document === "undefined") return null

    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_KEY}=`))

    if (!match) return null

    const value = match.split("=")[1]
    const parsed = Number(value)

    return isNaN(parsed) ? null : parsed
}

// Clear active company — dipanggil saat logout atau leave company
export function clearActiveCompany(): void {
    document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}