"use client";

import { useSearchParams as useSearchParamsHook, useRouter } from "next/navigation";

export const useSearchParams = () => {
    const searchParams = useSearchParamsHook();
    const router = useRouter();

    const isDefaultPagination = (param: string, value: any) => {
        return (param === "start" && value === 1) || (param === "limit" && value === 10) || value === "all";
    };

    const setParams = (params: Record<string, string | null | undefined | number>) => {
        const p = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value && !isDefaultPagination(key, value)) {
                p.set(key, String(value));
            } else {
                p.delete(key);
            }
        });

        router.push(`?${p.toString()}`);
    };

    const getSearchParams = (params: string[]) => {
        return params.reduce(
            (acc, param) => ({
                ...acc,
                [param]: searchParams.get(param),
            }),
            {}
        );
    };

    const getParam = (key: string) => searchParams.get(key);

    const getAllParams = (): Record<string, string> => {
        const out: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            out[key] = value;
        });
        return out;
    };

    return { setParams, getParam, getSearchParams, getParams: getSearchParams, getAllParams };
};
