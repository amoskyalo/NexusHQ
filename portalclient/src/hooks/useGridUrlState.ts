"use client";

import { useSearchParams } from "./useSearchParams";

export type GridUrlConfig = {
    searchKey?: { url?: string; api?: string };
    /**
     * Filter URL keys this grid uses. When provided, only these keys are
     * forwarded to the query (whitelist). When absent, all unknown URL params
     * are forwarded — the legacy `extraParams` bleed (deprecated, removed
     * once every filter page declares its keys).
     */
    filterKeys?: string[];
    /** Page-default request fields (merged into params, not URL). */
    defaults?: Record<string, unknown>;
};

export type GridParams = {
    page: number;
    page_size: number;
    date: string;
    [key: string]: unknown;
};

export type GridUrlState = {
    params: GridParams;
    setSearch: (value: string | null) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setDate: (date: string | null) => void;
    setFilter: (key: string, value: string | number | null) => void;
    setFilters: (entries: Record<string, string | number | null>) => void;
    clearFilters: () => void;
};

const PAGINATION_KEYS = ["start", "limit"] as const;
const DATE_KEY = "date";

export const useGridUrlState = (config: GridUrlConfig = {}): GridUrlState => {
    const { searchKey, filterKeys, defaults } = config;
    const { setParams, getAllParams } = useSearchParams();

    const urlSearchKey = searchKey?.url ?? "search";
    const apiSearchKey = searchKey?.api ?? "search";

    const all = getAllParams() as Record<string, string>;

    const filterParams = readFilterParams(all, urlSearchKey, filterKeys);

    const params: GridParams = {
        page_size: parseIntOr(all.limit, 10),
        page: parseIntOr(all.start, 1),
        date: all.date ?? "",
        ...defaults,
        ...(all[urlSearchKey] ? { [apiSearchKey]: all[urlSearchKey] } : {}),
        ...filterParams,
    };

    const setSearch = (value: string | null) => setParams({ [urlSearchKey]: value });

    const setPage = (page: number) => setParams({ start: page });

    const setPageSize = (size: number) => setParams({ start: "", limit: size });

    const setDate = (date: string | null) => setParams({ [DATE_KEY]: date });

    const setFilter = (key: string, value: string | number | null) => setParams({ [key]: value });

    const setFilters = (entries: Record<string, string | number | null>) => setParams(entries);

    const clearFilters = () => {
        const cleared: Record<string, null> = {};
        const keys = filterKeys ?? Object.keys(all).filter((k) => !isReservedKey(k, urlSearchKey));
        for (const k of keys) cleared[k] = null;
        setParams(cleared);
    };

    return { params, setSearch, setPage, setPageSize, setDate, setFilter, setFilters, clearFilters };
};

function parseIntOr(value: string | undefined, fallback: number): number {
    if (value == null) return fallback;
    const n = Number.parseInt(value);
    return Number.isFinite(n) ? n : fallback;
}

function isReservedKey(key: string, urlSearchKey: string): boolean {
    return PAGINATION_KEYS.includes(key as any) || key === DATE_KEY || key === urlSearchKey;
}

function readFilterParams(
    all: Record<string, string>,
    urlSearchKey: string,
    filterKeys: string[] | undefined,
): Record<string, string> {
    if (filterKeys) {
        const out: Record<string, string> = {};
        for (const k of filterKeys) {
            if (all[k] != null) out[k] = all[k];
        }
        return out;
    }
    // Legacy fallback: spread all unknown keys.
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(all)) {
        if (!isReservedKey(k, urlSearchKey)) out[k] = v;
    }
    return out;
}
