import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname === "/employee" || pathname === "/employee/") {

        const activeCompany = req.cookies.get("active_company_id")?.value

        if (activeCompany && !isNaN(Number(activeCompany))) {
            // Ada cookie → redirect ke company terakhir
            return NextResponse.redirect(
                new URL(`/employee/${activeCompany}`, req.url)
            )
        }

        // Tidak ada cookie → kembali ke lobby
        return NextResponse.redirect(new URL("/lobby", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/employee", "/employee/"],
}