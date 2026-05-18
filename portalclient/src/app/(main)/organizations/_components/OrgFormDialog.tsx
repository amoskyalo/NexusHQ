"use client";

import { useMemo } from "react";
import { Formik, type FormikHelpers } from "formik";
import { FormDialog } from "@/components/dialogs";
import { useCreateOrganization } from "../_lib/useCreateOrganization";
import { createOrgValidationSchema } from "../_lib/createOrgValidation";
import { OrgFormFields } from "./OrgFormFields";
import type { OrgFormDialogProps, OrgFormValues } from "../_types/organization.types";

const emptyValues: OrgFormValues = {
    name: "",
    slug: "",
    industry: "",
    modules: [],
    logo: null,
};

export const OrgFormDialog = ({ open, editingOrg, onClose, onSubmitted }: OrgFormDialogProps) => {
    const isEdit = Boolean(editingOrg);

    const { createOrganization, loading } = useCreateOrganization({
        onSuccess: () => {
            onSubmitted();
            onClose();
        },
    });

    const initialValues = useMemo<OrgFormValues>(() => {
        if (!editingOrg) return emptyValues;
        return {
            name: editingOrg.name,
            slug: editingOrg.slug,
            industry: editingOrg.industry,
            modules: editingOrg.modules,
            logo: null,
        };
    }, [editingOrg]);

    const handleSubmit = (values: OrgFormValues, helpers: FormikHelpers<OrgFormValues>) => {
        if (isEdit) {
            // TODO: wire PATCH /api/organizations/:id once the backend endpoint is ready.
            helpers.setSubmitting(false);
            onClose();
            return;
        }

        // TODO: include `logo` once the backend accepts multipart uploads.
        const { logo: _logo, ...payload } = values;
        createOrganization(payload);
        helpers.setSubmitting(false);
    };

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            dialogTitle={isEdit ? "Edit organization" : "Create organization"}
            dialogSubTitle={
                isEdit ? "Update this organization's details." : "Add a new organization to your workspace."
            }
        >
            <Formik
                initialValues={initialValues}
                validationSchema={createOrgValidationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                enableReinitialize
            >
                <OrgFormFields loading={loading} submitLabel={isEdit ? "Save changes" : "Create"} />
            </Formik>
        </FormDialog>
    );
};
