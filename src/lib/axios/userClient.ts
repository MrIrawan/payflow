import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_EMPLOYEE_API_URL || "http://localhost:8800/api/v1";

const userClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// =================================================================
// REFRESH GUARD (RESPONSE INTERCEPTOR)
// =================================================================
let isRefreshing = false;

// Ganti any[] dengan type yang proper untuk queue item
interface QueueItem {
    resolve: () => void;
    reject: (error: unknown) => void;
}
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

userClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message?: string }>) => {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest?._retry) {

            if (originalRequest?.url?.includes("/signIn") || originalRequest?.url?.includes("/refresh")) {
                if (typeof window !== "undefined" && !window.location.pathname.includes("/signIn")) {
                    window.location.href = "/signIn";
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise<void>(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return userClient(originalRequest!);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest!._retry = true;
            isRefreshing = true;

            try {
                await userClient.post("/refresh");
                processQueue(null);
                return userClient(originalRequest!);

            } catch (err) {
                processQueue(err);
                if (typeof window !== "undefined" && !window.location.pathname.includes("/signIn")) {
                    window.location.href = "/signIn";
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        // Error normalizer — attach server message ke error.message
        const serverMessage = error.response?.data?.message;
        if (serverMessage) {
            error.message = serverMessage;
        }

        return Promise.reject(error);
    }
);

export default userClient;