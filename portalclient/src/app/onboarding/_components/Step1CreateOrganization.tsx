"use client";

import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useRef } from "react";
import { TextInput } from "@/components/inputs/TextInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { INDUSTRY_OPTIONS, slugify } from "../_lib/onboarding.constants";
import type { OnboardingFormValues } from "../_types/onboarding.types";

export const Step1CreateOrganization = () => {
    const formik = useFormikContext<OnboardingFormValues>();
    const slugTouched = useRef(formik.values.slug.length > 0);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        formik.setFieldValue("name", next);
        if (!slugTouched.current) {
            formik.setFieldValue("slug", slugify(next));
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        slugTouched.current = true;
        formik.setFieldValue("slug", slugify(e.target.value));
    };

    return (
        <Stack alignItems="center" sx={{ height: "100%", overflow: "auto" }}>
            <Box sx={{ maxWidth: 560, px: { xs: 3, md: 6 }, py: { xs: 4, md: 3 } }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: "primary.main",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    Step 1 of 3
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1.5, lineHeight: 1.2 }}>
                    Create your organization
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 4, maxWidth: 480 }}>
                    Tell us a little about your company. We&apos;ll use these details to personalize your workspace,
                    brand your portal, and shape what your team sees when they sign in.
                </Typography>

                <Stack spacing={3}>
                    <TextInput
                        label="Organization name"
                        placeholder="e.g. Acme Corp"
                        {...getFormikFieldProps({ formik, field: "name" })}
                        onChange={handleNameChange}
                    />

                    <SelectInput
                        label="Industry"
                        placeholder="Select your industry"
                        options={INDUSTRY_OPTIONS}
                        {...getFormikFieldProps({ formik, field: "industry", isSelect: true })}
                    />

                    <TextInput
                        label="Slug"
                        placeholder="your-org"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ color: "text.secondary" }}>
                                        <Typography variant="body2" color="text.secondary">
                                            .nexushq.com
                                        </Typography>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        info="A unique short name used in your portal URL. Lowercase letters, numbers, and hyphens only."
                        {...getFormikFieldProps({ formik, field: "slug" })}
                        onChange={handleSlugChange}
                    />
                </Stack>

                <LoadingButton
                    type="submit"
                    loading={false}
                    variant="contained"
                    sx={{
                        mt: 5,
                        color: "white",
                        minHeight: "1px !important",
                        maxHeight: "34px",
                        minWidth: "max-content",
                        fontSize: 13,
                    }}
                >
                    Continue
                </LoadingButton>
            </Box>
        </Stack>
    );
};
