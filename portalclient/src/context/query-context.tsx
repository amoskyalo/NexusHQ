"use client";

import { QueryClientProvider as QueryClientProviderWrapper } from "@tanstack/react-query";
import { queryClient } from "@/lib/axios";

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProviderWrapper client={queryClient}>{children}</QueryClientProviderWrapper>;
};
