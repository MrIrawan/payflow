import { cookies } from "next/headers"

export async function getCookie(cookieName: string) {
    const cookie = await cookies();
    const getCookie = cookie.get(cookieName);

    if (getCookie) {
        return true;
    } else {
        return false;
    }
}