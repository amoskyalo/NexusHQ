"use client";

import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Building2, LayoutGrid, UserPlus, Boxes } from "lucide-react";
import { useOnboarding } from "../_lib/onboarding.context";
import type { OnboardingStepDef } from "../_types/onboarding.types";

const steps: OnboardingStepDef[] = [
    {
        step: 1,
        title: "Create Organization",
        description: "Add your company details so we can personalize your workspace and brand your portal.",
        icon: Building2,
    },
    {
        step: 2,
        title: "Assign Modules",
        description: "Pick the parts of NexusHQ your team will use. You can update this anytime.",
        icon: LayoutGrid,
    },
    {
        step: 3,
        title: "Invite Team",
        description: "Send invitations by email and set what each teammate can access.",
        icon: UserPlus,
    },
];

export const OnboardingStepsPanel = () => {
    const { currentStep } = useOnboarding();

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
                p: { xs: 3, md: 6 },
                borderRadius: 6,
                overflow: "hidden",
                background: (theme) =>
                    `linear-gradient(160deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(
                        theme.palette.primary.main,
                        0.14,
                    )} 100%)`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -28,
                    left: -28,
                    color: "primary.main",
                    opacity: 0.04,
                    pointerEvents: "none",
                    transform: "rotate(-8deg)",
                }}
            >
                <Boxes size={180} strokeWidth={1.25} />
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    top: 60,
                    left: 140,
                    color: "primary.main",
                    opacity: 0.04,
                    pointerEvents: "none",
                    transform: "rotate(12deg)",
                }}
            >
                <Boxes size={100} strokeWidth={1.25} />
            </Box>

            <Stack spacing={4} sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, lineHeight: 1.6 }}>
                    Get started by setting up your organization, choosing the modules you need, and inviting your
                    teammates.
                </Typography>

                <Stack spacing={0}>
                    {steps.map(({ step, title, description, icon: Icon }, idx) => {
                        const isActive = step === currentStep;
                        const isCompleted = step < currentStep;
                        const isLast = idx === steps.length - 1;

                        return (
                            <Stack
                                key={step}
                                direction="row"
                                spacing={2}
                                alignItems="stretch"
                                sx={{
                                    opacity: isActive || isCompleted ? 1 : 0.7,
                                    transition: "opacity 0.2s ease",
                                }}
                            >
                                <Stack alignItems="center" sx={{ flexShrink: 0 }}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            flexShrink: 0,
                                            borderRadius: 50,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: (theme) =>
                                                isActive || isCompleted
                                                    ? theme.palette.primary.main
                                                    : alpha(theme.palette.primary.main, 0.12),
                                            color: isActive || isCompleted ? "common.white" : "primary.main",
                                            boxShadow: (theme) =>
                                                isActive
                                                    ? `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`
                                                    : "none",
                                            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                                        }}
                                    >
                                        <Icon size={18} />
                                    </Box>
                                    {!isLast && (
                                        <Box
                                            sx={{
                                                width: "2px",
                                                flex: 1,
                                                my: 0.75,
                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                                            }}
                                        />
                                    )}
                                </Stack>

                                <Stack spacing={0.5} sx={{ pb: isLast ? 0 : 5, pt: 0.25 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: isActive ? 600 : 400,
                                            color: isActive ? "text.primary" : "text.secondary",
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.55, maxWidth: 320 }}
                                    >
                                        {description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>

            <Box
                sx={{
                    position: "absolute",
                    bottom: -28,
                    right: -28,
                    color: "primary.main",
                    opacity: 0.08,
                    pointerEvents: "none",
                    transform: "rotate(-8deg)",
                }}
            >
                <Boxes size={200} strokeWidth={1.25} />
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 60,
                    right: 140,
                    color: "primary.main",
                    opacity: 0.05,
                    pointerEvents: "none",
                    transform: "rotate(12deg)",
                }}
            >
                <Boxes size={120} strokeWidth={1.25} />
            </Box>
        </Box>
    );
};
