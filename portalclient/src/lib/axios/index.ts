import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { sessionExpired } from "@/components/session/SessionExpiredDialog";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionExpired.emit();
        }
        return Promise.reject(error);
    },
);

export { axiosInstance };

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
        mutations: {
            retry: 0,
        },
    },
});
