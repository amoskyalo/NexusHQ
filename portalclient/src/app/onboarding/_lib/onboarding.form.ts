import * as Yup from "yup";
import type { OnboardingFormValues, OnboardingStep } from "../_types/onboarding.types";

export const initialOnboardingValues: OnboardingFormValues = {
    name: "",
    industry: "",
    slug: "",
    modules: [],
    invites: [{ email: "", role: "" }],
};

export const getStepValidationSchema = (step: OnboardingStep) => {
    if (step === 1) {
        return Yup.object({
            name: Yup.string().required("Organization name is required"),
            industry: Yup.string().required("Please select an industry"),
            slug: Yup.string().required("Slug is required"),
        });
    }

    if (step === 2) {
        return Yup.object({
            modules: Yup.array().of(Yup.string()).min(1, "Pick at least one module to continue"),
        });
    }

    // return Yup.object({
    //     invites: Yup.array()
    //         .of(
    //             Yup.object({
    //                 email: Yup.string().email("Enter a valid email").required("Email is required"),
    //                 role: Yup.string().required("Pick a role"),
    //             }),
    //         )
    //         .min(1, "Add at least one teammate to send invitations"),
    // });
};
