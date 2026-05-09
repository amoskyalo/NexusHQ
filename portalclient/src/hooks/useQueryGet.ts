"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { GetParams, APIResponse } from "./types/hooks.types";
import { snackbarToast } from "@/components/snackbar";

export const useQueryGet = <TData, TParams>(args: GetParams<TData, TParams>) => {
    const { url, params, options } = args;

    return useQuery<APIResponse<TData>>({
        queryKey: [url, JSON.stringify(params)],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(url, { params });
                return response.data;
            } catch (error: any) {
                if (error?.message === "Network Error" || error?.message?.includes("fetch")) {
                    snackbarToast.error("No internet connection.");
                }
                throw error;
            }
        },
        enabled: options?.enabled,
        refetchOnWindowFocus: false,
        refetchInterval: options?.refetchInterval,
        staleTime: options?.staleTime,
    });
};
