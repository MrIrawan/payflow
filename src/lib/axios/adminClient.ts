import axios from "axios";

// Base URL Backend
const BASE_URL = process.env.NEXT_PUBLIC_BASE_ADMIN_API_URL || "http://localhost:8800/api/v1";

const adminClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // WAJIB: Agar cookie 'admin_token' terbawa otomatis
    headers: {
        "Content-Type": "application/json",
    },
});

// =================================================================
// RESPONSE INTERCEPTOR (The "Strict" Guard)
// =================================================================
adminClient.interceptors.response.use(
    (response) => {
        // Jika sukses (2xx), loloskan saja
        return response;
    },
    (error) => {
        // Jika error 401 (Unauthorized)
        if (error.response?.status === 401) {

            // Cek apakah kita sedang di browser (bukan server side rendering)
            if (typeof window !== "undefined") {

                // PENTING: Cek URL saat ini agar tidak infinite loop redirect
                // Jika admin sudah di halaman login, jangan redirect lagi
                if (!window.location.pathname.includes("/admin/signIn")) {
                    // Tendang ke halaman Login Admin
                    window.location.href = "/admin/signIn";
                }
            }
        }

        // Teruskan error agar komponen bisa tau (misal untuk mematikan loading state)
        return Promise.reject(error);
    }
);

export default adminClient;