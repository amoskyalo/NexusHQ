import React from "react";
import { Box, SxProps } from "@mui/material";
import { useTheme } from "@/context";

export const ContentContainer = ({
    children,
    sx,
}: Readonly<{
    children: React.ReactNode;
    sx?: Omit<SxProps, "boxShadow" | "backgroundColor" | "borderRadius">;
}>) => {
    const { isDark } = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                padding: 2,
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: isDark ? "rgba(30, 41, 59, 0.35)" : "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                boxShadow: isDark
                    ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)"
                    : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.03), 0 8px 32px rgba(0, 0, 0, 0.08)",
                border: "1px solid",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.7)",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};
