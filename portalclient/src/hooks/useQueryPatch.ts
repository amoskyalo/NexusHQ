"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationParams } from "./types/hooks.types";

export const useQueryPatch = <TData, TParams>() => {
    return useMutation({
        mutationFn: async ({ data, params, url }: MutationParams<TData, TParams>) => {
            const response = await axiosInstance.patch(url, data, { params });
            return response.data;
        },
    });
};
