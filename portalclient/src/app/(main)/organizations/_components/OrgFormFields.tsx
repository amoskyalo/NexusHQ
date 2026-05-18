"use client";

import { useRef } from "react";
import { Stack } from "@mui/material";
import { Form, useFormikContext } from "formik";
import { TextInput } from "@/components/inputs/TextInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { AutocompleteField } from "@/components/inputs/AutoCompleteInput";
import { FileUploadInput } from "@/components/inputs/FileUploadInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { INDUSTRY_OPTIONS, slugify } from "@/app/onboarding/_lib/onboarding.constants";
import { MODULE_OPTIONS } from "../_lib/organization.constants";
import type { ModuleOption, OrgFormFieldsProps, OrgFormValues } from "../_types/organization.types";

export const OrgFormFields = ({ loading, submitLabel }: OrgFormFieldsProps) => {
    const formik = useFormikContext<OrgFormValues>();
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

    const selectedModules = MODULE_OPTIONS.filter((m) => formik.values.modules.includes(m.value));
    const modulesError = formik.submitCount > 0 && Boolean(formik.errors.modules);

    return (
        <Form noValidate>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
                <FileUploadInput
                    label="Logo (optional)"
                    allowedFileTypes={["PNG", "JPG", "JPEG", "SVG"]}
                    {...getFormikFieldProps({ formik, field: "logo", isFile: true })}
                />

                <TextInput
                    label="Organization name"
                    placeholder="e.g. Acme Corp"
                    {...getFormikFieldProps({ formik, field: "name" })}
                    onChange={handleNameChange}
                />

                <TextInput
                    label="Slug"
                    placeholder="your-org"
                    {...getFormikFieldProps({ formik, field: "slug" })}
                    onChange={handleSlugChange}
                />

                <SelectInput
                    label="Industry"
                    placeholder="Select your industry"
                    options={INDUSTRY_OPTIONS}
                    {...getFormikFieldProps({ formik, field: "industry", isSelect: true })}
                />

                <AutocompleteField
                    label="Modules"
                    placeholder="Pick the modules to enable"
                    multiple
                    options={MODULE_OPTIONS}
                    getOptionLabel={(option: ModuleOption) => option.label}
                    isOptionEqualToValue={(option: ModuleOption, value: ModuleOption) => option.value === value.value}
                    value={selectedModules}
                    onChange={(_, next: ModuleOption[]) =>
                        formik.setFieldValue(
                            "modules",
                            next.map((m) => m.value),
                        )
                    }
                    error={modulesError}
                    helperText={modulesError ? (formik.errors.modules as string) : undefined}
                />

                <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white", marginTop: "24px !important" }}
                >
                    {submitLabel}
                </LoadingButton>
            </Stack>
        </Form>
    );
};
