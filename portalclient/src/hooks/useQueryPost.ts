"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationParams } from "./types/hooks.types";

export const useQueryPost = <TData, TParams>(args: { options?: any }) => {
    return useMutation({
        mutationFn: async ({ body, params, url }: MutationParams<TData, TParams>) => {
            const response = await axiosInstance.post(url, body, { params });
            return response.data;
        },
        ...args.options,
    });
};
