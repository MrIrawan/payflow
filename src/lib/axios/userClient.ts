import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_EMPLOYEE_API_URL || "http://localhost:8800/api/v1";

const userClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // INI KUNCINYA: Browser otomatis bawa Cookie
    headers: {
        "Content-Type": "application/json",
    },
});

// =================================================================
// REFRESH GUARD (RESPONSE INTERCEPTOR)
// =================================================================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(); // Tidak perlu kirim token, cukup resolve signal retry
        }
    });
    failedQueue = [];
};

userClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Cek 401 & Belum Retry
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Cegah loop di endpoint auth
            if (originalRequest.url.includes("/signIn") || originalRequest.url.includes("/refresh")) {
                // Jika endpoint refresh sendiri yang 401, berarti session habis total.
                // REDIRECT (KILL SWITCH) DISINI
                if (typeof window !== "undefined" && !window.location.pathname.includes("/signIn")) {
                    window.location.href = "/signIn";
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Antrikan request lain yang datang bersamaan
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // Saat antrian dilepas, cookie browser sudah baru.
                        // Langsung retry request original.
                        return userClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 1. Panggil Endpoint Refresh
                // Backend akan validasi cookie refreshToken lama, dan Set-Cookie accessToken baru
                await userClient.post("/auth/refresh");

                // 2. Jika sukses (tidak error), berarti Cookie di browser SUDAH TERUPDATE otomatis.

                // 3. Proses antrian
                processQueue(null);

                // 4. Retry request awal
                // Axios akan kirim request baru, dan browser otomatis lampirkan cookie baru.
                return userClient(originalRequest);

            } catch (err) {
                processQueue(err);

                // KILL SWITCH: Refresh Gagal -> Logout Paksa
                if (typeof window !== "undefined" && !window.location.pathname.includes("/signIn")) {
                    window.location.href = "/signIn";
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default userClient;