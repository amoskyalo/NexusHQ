"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth-context";
import type { OrganizationContextProps, OrganizationType } from "./types/auth.types";

const STORAGE_KEY = "nexushq:selectedOrgId";

const readStoredId = (): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
};

const OrganizationContext = createContext<OrganizationContextProps>({
    selectedOrg: undefined,
    setSelectedOrg: () => {},
});

const OrganizationProvider = ({ children }: { children: React.ReactNode }) => {
    const { me } = useAuth();
    const organizations = me?.organizations ?? [];

    const [selectedId, setSelectedId] = useState<string | null>(() => readStoredId());

    useEffect(() => {
        if (organizations.length === 0) return;
        const exists = selectedId && organizations.some((o) => o.id === selectedId);
        if (!exists) {
            setSelectedId(organizations[0].id);
        }
    }, [organizations, selectedId]);

    const selectedOrg = useMemo<OrganizationType | undefined>(
        () => organizations.find((o) => o.id === selectedId) ?? organizations[0],
        [organizations, selectedId],
    );

    const setSelectedOrg = useCallback((org: OrganizationType) => {
        setSelectedId(org.id);
        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, org.id);
        }
    }, []);

    const value = useMemo<OrganizationContextProps>(
        () => ({ selectedOrg, setSelectedOrg }),
        [selectedOrg, setSelectedOrg],
    );

    return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};

const useOrganization = (): OrganizationContextProps => {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error("useOrganization must be used within an OrganizationProvider");
    }
    return context;
};

export { OrganizationProvider, useOrganization };
