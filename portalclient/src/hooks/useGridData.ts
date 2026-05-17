"use client";

import { useQueryGet } from "./useQueryGet";
import { axiosInstance } from "@/lib/axios";

export type UseGridDataArgs = {
    url: string;
    params: Record<string, unknown>;
    enabled?: boolean;
};

export type UseGridDataResult<TRow = any> = {
    rows: TRow[];
    pages: number | undefined;
    currentPage: number | undefined;
    loading: boolean;
    refetch: () => Promise<unknown>;
    fetchAllForExport: () => Promise<TRow[]>;
};

export const useGridData = <TRow = any>(args: UseGridDataArgs): UseGridDataResult<TRow> => {
    const { url, params, enabled = true } = args;

    const { data: response, isLoading, isRefetching, refetch } = useQueryGet<TRow[], Record<string, unknown>>({
        url,
        params,
        options: { enabled },
    });

    const fetchAllForExport = async (): Promise<TRow[]> => {
        const { data } = await axiosInstance.get(url, {
            params: { ...params, page_size: 0, page: 1 },
        });
        const rows = data?.data;
        return Array.isArray(rows) ? (rows as TRow[]) : [];
    };

    return {
        rows: (response?.body ?? []) as TRow[],
        pages: response?.pages,
        currentPage: response?.current_page,
        loading: isLoading || isRefetching,
        refetch,
        fetchAllForExport,
    };
};
