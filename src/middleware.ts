import { NextRequest, NextResponse } from "next/server"

// Decode sessionCtx tanpa library tambahan — edge runtime compatible
function decodeSessionCtx(token: string) {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));

        // Expired check
        if (decoded.exp < Math.floor(Date.now() / 1000)) return null;

        return decoded as { role: string; company_id: string; exp: number };
    } catch {
        return null;
    }
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const sessionCtxToken = req.cookies.get("sessionCtx")?.value
    const session = sessionCtxToken ? decodeSessionCtx(sessionCtxToken) : null

    // ─── /signIn dan /signUp ──────────────────────────────────────
    // Kalau sudah punya session valid, tidak perlu ke login/register lagi
    if (pathname.startsWith("/signIn") || pathname.startsWith("/signUp")) {
        if (session) {
            if (session.role === "employee") {
                return NextResponse.redirect(new URL(`/employee/${session.company_id}/dashboard`, req.url))
            }
            return NextResponse.redirect(new URL(`/admin/${session.company_id}/dashboard`, req.url))
        }
        return NextResponse.next()
    }

    // ─── /lobby ────────────────────────────────────────────────────
    // Semua boleh akses lobby — untuk pilih atau switch company
    if (pathname.startsWith("/lobby")) {
        return NextResponse.next()
    }

    // ─── / (root) ──────────────────────────────────────────────────
    if (pathname === "/") {
        // Tidak ada session → landing page, biarkan lanjut
        if (!session) return NextResponse.next()

        // Sudah login → redirect ke dashboard sesuai role
        if (session.role === "employee") {
            return NextResponse.redirect(new URL(`/employee/${session.company_id}/dashboard`, req.url))
        }
        return NextResponse.redirect(new URL(`/admin/${session.company_id}/dashboard`, req.url))
    }

    // ─── /employee/* ───────────────────────────────────────────────
    if (pathname.startsWith("/employee")) {

        // Handle /employee dan /employee/ — logic lama dipertahankan
        if (pathname === "/employee" || pathname === "/employee/") {
            const activeCompany = req.cookies.get("active_company_id")?.value
            if (activeCompany && !isNaN(Number(activeCompany))) {
                return NextResponse.redirect(new URL(`/employee/${activeCompany}`, req.url))
            }
            return NextResponse.redirect(new URL("/lobby", req.url))
        }

        // Tidak ada session → ke login
        if (!session) return NextResponse.redirect(new URL("/signIn", req.url))

        // Role bukan employee → redirect ke admin
        if (session.role === "admin" || session.role === "owner") {
            return NextResponse.redirect(new URL(`/admin/${session.company_id}/dashboard`, req.url))
        }

        return NextResponse.next()
    }

    // ─── /admin/* ──────────────────────────────────────────────────
    if (pathname.startsWith("/admin")) {

        // Tidak ada session → ke login
        if (!session) return NextResponse.redirect(new URL("/signIn", req.url))

        // Role employee → redirect ke employee
        if (session.role === "employee") {
            return NextResponse.redirect(new URL(`/employee/${session.company_id}/dashboard`, req.url))
        }

        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/employee/:path*",
        "/admin/:path*",
    ]
}