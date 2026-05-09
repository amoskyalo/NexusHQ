"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationParams } from "./types/hooks.types";

export const useQueryPost = <TData, TParams>() => {
    return useMutation({
        mutationFn: async ({ data, params, url }: MutationParams<TData, TParams>) => {
            const response = await axiosInstance.post(url, data, { params });
            return response.data;
        },
    });
};
