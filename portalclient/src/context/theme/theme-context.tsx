"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useSyncExternalStore } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createLightTheme, createDarkTheme } from "./theme-def";
import type { ThemeType, ThemeContextType, ThemeProviderProps } from "../types/theme.types";

export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {},
    currentTheme: "system",
});

const noopSubscribe = () => () => {};

const readInitialIsDark = (forcedTheme?: "light" | "dark") => {
    if (typeof window === "undefined") return forcedTheme === "dark";
    if (forcedTheme) return forcedTheme === "dark";
    return localStorage.getItem("theme") === "dark";
};

const readInitialTheme = (forcedTheme?: "light" | "dark"): ThemeType => {
    if (forcedTheme) return forcedTheme;
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as ThemeType) ?? "system";
};

export const AppThemeProvider = ({ children, colors, forcedTheme }: Readonly<ThemeProviderProps>) => {
    const [isDark, setIsDark] = useState(() => readInitialIsDark(forcedTheme));
    const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => readInitialTheme(forcedTheme));

    const mounted = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false,
    );

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", isDark);
        }
    }, [isDark]);

    const toggleTheme = useCallback((theme: ThemeType) => {
        const apply = (dark: boolean, persisted: "light" | "dark" | null) => {
            setIsDark(dark);
            if (typeof window !== "undefined") {
                if (persisted) {
                    localStorage.setItem("theme", persisted);
                } else {
                    localStorage.removeItem("theme");
                }
            }
        };

        if (theme === "system") {
            const prefersDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
            apply(prefersDark, null);
            setCurrentTheme("system");
            return;
        }

        if (theme === "light") {
            apply(false, "light");
            setCurrentTheme("light");
            return;
        }

        if (theme === "dark") {
            apply(true, "dark");
            setCurrentTheme("dark");
        }
    }, []);

    const value = useMemo(() => ({ isDark, toggleTheme, currentTheme }), [isDark, toggleTheme, currentTheme]);
    const theme = useMemo(
        () => (isDark ? createDarkTheme(colors) : createLightTheme(colors)),
        [isDark, colors]
    );

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
