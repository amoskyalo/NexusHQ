import { UseQueryOptions } from "@tanstack/react-query";

export type APIResponse<TBody> = {
    status: boolean;
    message: string;
    body: TBody;
    current_page: number;
    pages: number;
};

export type MutationParams<TBody, TParams> = {
    body?: TBody;
    params?: TParams;
    url: string;
    id?: string | number | null;
};

export type GetParams<TBody, TParams> = {
    url: string;
    params?: TParams;
    options?: Omit<UseQueryOptions<APIResponse<TBody>>, "queryKey" | "queryFn">;
    id?: string | number | null;
};

export type MutationProps<TBody> = {
    body: TBody;
    cb: (arg: any) => void;
};
