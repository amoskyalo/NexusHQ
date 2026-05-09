export type ThemeType = "light" | "dark" | "system";

export interface ThemeColors {
    primary?: {
        main: string;
    };
    secondary?: {
        main: string;
    };
    backgroundDark?: {
        default: string;
        paper: string;
    };
    backgroundLight?: {
        default: string;
        paper: string;
    };
}

export interface ThemeContextType {
    isDark: boolean;
    toggleTheme: (theme: ThemeType) => void;
    currentTheme: ThemeType;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    colors?: ThemeColors;
    forcedTheme?: "light" | "dark";
}
