"use client";

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

type MultiSelectBarProps = {
    count: number;
    onClear: () => void;
    children: ReactNode;
};

export const MultiSelectBar = ({ count, onClear, children }: MultiSelectBarProps) => {
    if (count === 0) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 24,
                left: "60%",
                transform: "translateX(-50%)",
                zIndex: 1300,
                bgcolor: "#212B36",
                borderRadius: 16,
                pl: 2,
                pr: 0.9,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.24)",
            }}
        >
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>
                {count} item{count !== 1 ? "s" : ""} selected
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.24)" }} />

            <Stack direction="row" spacing={1} alignItems="center">
                {children}
            </Stack>

            <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.24)" }} />

            <IconButton size="small" onClick={onClear} sx={{ color: "#fff" }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};
