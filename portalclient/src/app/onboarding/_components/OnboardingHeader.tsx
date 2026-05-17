"use client";

import { Divider, Stack, Typography } from "@mui/material";
import { CircleHelp, LogOut } from "lucide-react";
import type { OnboardingHeaderProps } from "../_types/onboarding.types";

export const OnboardingHeader = ({ onLogout, onHelp }: OnboardingHeaderProps) => {
    return (
        <Stack
            component="header"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                px: { xs: 3, md: 5 },
                py: 2,
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.default",
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: "-0.01em", color: "text.primary" }}>
                NexusHQ
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Stack
                    component="button"
                    type="button"
                    onClick={onHelp}
                    direction="row"
                    alignItems="center"
                    spacing={0.75}
                    sx={{
                        cursor: "pointer",
                        color: "text.primary",
                        background: "none",
                        border: 0,
                        p: 0,
                        font: "inherit",
                        "&:hover": { opacity: 0.75 },
                    }}
                >
                    <CircleHelp size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Help Assistance
                    </Typography>
                </Stack>

                <Divider flexItem orientation="vertical" sx={{ border: "1px solid", borderColor: "divider" }} />

                <Stack
                    component="button"
                    type="button"
                    onClick={onLogout}
                    direction="row"
                    alignItems="center"
                    spacing={0.75}
                    sx={{
                        cursor: "pointer",
                        color: "text.primary",
                        background: "none",
                        border: 0,
                        p: 0,
                        font: "inherit",
                        "&:hover": { opacity: 0.75 },
                    }}
                >
                    <LogOut size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Log out
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
