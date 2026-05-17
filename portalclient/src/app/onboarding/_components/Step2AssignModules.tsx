"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { Check, MoveLeft } from "lucide-react";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useOnboarding } from "../_lib/onboarding.context";
import type { OnboardingFormValues } from "../_types/onboarding.types";

type ModuleDef = {
    id: string;
    label: string;
    description: string;
};

const MODULES: ModuleDef[] = [
    {
        id: "HR",
        label: "HR",
        description: "Manage employees, time off, and people processes.",
    },
    {
        id: "FINANCE",
        label: "Finance",
        description: "Track expenses, payroll, invoices, and budgets.",
    },
    {
        id: "TECH",
        label: "Tech",
        description: "Asset tracking, IT requests, and tech operations.",
    },
    {
        id: "AGILE",
        label: "Agile",
        description: "Sprints, boards, backlogs, and team velocity.",
    },
];

export const Step2AssignModules = () => {
    const { setCurrentStep } = useOnboarding();
    const formik = useFormikContext<OnboardingFormValues>();

    const toggle = (id: string) => {
        const current = formik.values.modules;
        const next = current.includes(id) ? current.filter((m) => m !== id) : [...current, id];
        formik.setFieldValue("modules", next);
    };

    const showError = formik.submitCount > 0 && Boolean(formik.errors.modules);
    const errorText = formik.errors.modules as string | undefined;

    return (
        <Stack alignItems="center" sx={{ height: "100%", overflow: "auto" }}>
            <Box sx={{ maxWidth: 640, width: "100%", px: { xs: 3, md: 6 }, py: { xs: 4, md: 3 } }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: "primary.main",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    Step 2 of 3
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1.5, lineHeight: 1.2 }}>
                    Pick your modules
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 4, maxWidth: 480 }}>
                    Choose the parts of NexusHQ your organization will use. Each module unlocks a tailored section of
                    the portal — you&apos;ll only see what&apos;s relevant to your operations, and you can update this
                    anytime from settings.
                </Typography>

                <Grid container spacing={2}>
                    {MODULES.map(({ id, label, description }) => {
                        const selected = formik.values.modules.includes(id);

                        return (
                            <Grid size={{ xs: 12, sm: 6 }} key={id}>
                                <Box
                                    role="checkbox"
                                    aria-checked={selected}
                                    tabIndex={0}
                                    onClick={() => toggle(id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            toggle(id);
                                        }
                                    }}
                                    sx={{
                                        position: "relative",
                                        cursor: "pointer",
                                        p: 2,
                                        height: "100%",
                                        borderRadius: 3,
                                        border: 1,
                                        borderColor: selected ? "primary.main" : "divider",
                                        bgcolor: (theme) =>
                                            selected ? alpha(theme.palette.primary.main, 0.04) : "transparent",
                                        transition: "border-color 0.3s ease, background-color 0.15s ease",
                                        outline: "none",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                        },
                                        "&:focus-visible": {
                                            boxShadow: (theme) =>
                                                `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 14,
                                            right: 14,
                                            width: 16,
                                            height: 16,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: 1.5,
                                            borderColor: selected ? "primary.main" : "divider",
                                            bgcolor: selected ? "primary.main" : "transparent",
                                            color: "common.white",
                                            transition: "all 0.15s ease",
                                        }}
                                    >
                                        {selected && <Check size={12} strokeWidth={3} />}
                                    </Box>

                                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, pr: 2 }}>
                                        {description}
                                    </Typography>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>

                {showError && (
                    <Typography variant="caption" color="error" sx={{ mt: 1.5, display: "block", pl: 0.5 }}>
                        {errorText}
                    </Typography>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                    <LoadingButton
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        sx={{
                            minHeight: "1px !important",
                            maxHeight: "34px",
                            minWidth: "max-content",
                            fontSize: 13,
                            ":hover": { backgroundColor: "transparent" },
                        }}
                        startIcon={<MoveLeft size={18} />}
                        loading={false}
                    >
                        Back
                    </LoadingButton>
                    <LoadingButton
                        type="submit"
                        loading={false}
                        variant="contained"
                        sx={{
                            color: "white",
                            minHeight: "1px !important",
                            maxHeight: "34px",
                            minWidth: "max-content",
                            fontSize: 13,
                        }}
                    >
                        Continue
                    </LoadingButton>
                </Stack>
            </Box>
        </Stack>
    );
};
