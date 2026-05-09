"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationParams } from "./types/hooks.types";

export const useQueryDelete = <TData, TParams>() => {
    return useMutation({
        mutationFn: async ({ params, url }: MutationParams<TData, TParams>) => {
            const response = await axiosInstance.delete(url, { params });
            return response.data;
        },
    });
};
