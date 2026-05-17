"use client";

import { Alert, Box, IconButton, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useOnboarding } from "../_lib/onboarding.context";
import { ROLE_OPTIONS } from "../_lib/onboarding.constants";
import type { InviteRow, OnboardingFormValues } from "../_types/onboarding.types";

const emptyInvite: InviteRow = { email: "", role: "" };

export const Step3InviteTeam = ({ loading }: { loading: boolean }) => {
    const { setCurrentStep } = useOnboarding();
    const formik = useFormikContext<OnboardingFormValues>();
    const { values, errors, touched, setFieldValue, submitCount } = formik;

    const setInvites = (next: InviteRow[]) => setFieldValue("invites", next);

    const updateRow = (idx: number, patch: Partial<InviteRow>) => {
        const next = values.invites.map((row, i) => (i === idx ? { ...row, ...patch } : row));
        setInvites(next);
    };

    const addRow = () => setInvites([...values.invites, { ...emptyInvite }]);

    const removeRow = (idx: number) => {
        if (values.invites.length === 1) return;
        setInvites(values.invites.filter((_, i) => i !== idx));
    };

    const rowError = (idx: number, field: keyof InviteRow): string | undefined => {
        const rowTouched = (touched.invites as any)?.[idx]?.[field];
        const rowErr = (errors.invites as any)?.[idx]?.[field];
        const showAfterSubmit = submitCount > 0 && rowErr;
        return rowTouched || showAfterSubmit ? rowErr : undefined;
    };

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
                    Step 3 of 3
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1.5, lineHeight: 1.2 }}>
                    Invite your team
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 4, maxWidth: 480 }}>
                    Bring your teammates on board. Send invitations by email and assign each person a role that controls
                    what they can access. Prefer to do this later? You can skip this step and invite people anytime.
                </Typography>

                <Alert severity="info" sx={{ mb: 4, boxShadow: 0, borderRadius: 3 }}>
                    Invited members will need to verify their identity and complete security onboarding before accessing
                    organization resources.
                </Alert>

                <Stack spacing={2.5}>
                    {values.invites.map((row, idx) => {
                        const isOnly = values.invites.length === 1;
                        return (
                            <Stack
                                key={idx}
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                alignItems={{ xs: "stretch", sm: "flex-start" }}
                            >
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <TextInput
                                        label={idx === 0 ? "Email" : ""}
                                        placeholder="teammate@company.com"
                                        value={row.email}
                                        onChange={(e) => updateRow(idx, { email: e.target.value })}
                                        error={Boolean(rowError(idx, "email"))}
                                        helperText={rowError(idx, "email")}
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", sm: 200 } }}>
                                    <SelectInput
                                        label={idx === 0 ? "Role" : ""}
                                        placeholder="Select role"
                                        options={ROLE_OPTIONS}
                                        value={row.role}
                                        onChange={(value) => updateRow(idx, { role: value })}
                                        error={Boolean(rowError(idx, "role"))}
                                        helperText={rowError(idx, "role")}
                                    />
                                </Box>
                                <Box sx={{ pt: { xs: 0, sm: idx === 0 ? "26px" : 0 } }}>
                                    <IconButton
                                        aria-label="Remove invite"
                                        onClick={() => removeRow(idx)}
                                        disabled={isOnly}
                                        sx={{
                                            color: "text.secondary",
                                            "&:hover": { color: "secondary.main" },
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </IconButton>
                                </Box>
                            </Stack>
                        );
                    })}
                </Stack>

                <Stack
                    component="button"
                    type="button"
                    onClick={addRow}
                    direction="row"
                    alignItems="center"
                    spacing={0.75}
                    sx={{
                        mt: 2.5,
                        cursor: "pointer",
                        color: "primary.main",
                        background: "none",
                        border: 0,
                        p: 0,
                        font: "inherit",
                        "&:hover": { opacity: 0.75 },
                    }}
                >
                    <Plus size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Add another
                    </Typography>
                </Stack>

                <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2} sx={{ mt: 5 }}>
                    <LoadingButton
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        sx={{
                            minHeight: "1px !important",
                            maxHeight: "34px",
                            minWidth: "max-content",
                            fontSize: 13,
                            ":hover": { backgroundColor: "transparent" },
                        }}
                        startIcon={<MoveLeft size={18} />}
                        loading={false}
                        disabled={loading}
                    >
                        Back
                    </LoadingButton>

                    <LoadingButton
                        type="submit"
                        loading={loading}
                        variant="contained"
                        sx={{
                            color: "white",
                            minHeight: "1px !important",
                            maxHeight: "34px",
                            minWidth: "max-content",
                            fontSize: 13,
                        }}
                    >
                        Finish setup
                    </LoadingButton>
                </Stack>
            </Box>
        </Stack>
    );
};
