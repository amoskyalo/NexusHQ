"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import { Step1CreateOrganization } from "./_components/Step1CreateOrganization";
import { Step2AssignModules } from "./_components/Step2AssignModules";
import { Step3InviteTeam } from "./_components/Step3InviteTeam";
import { useOnboarding } from "./_lib/onboarding.context";
import { getStepValidationSchema, initialOnboardingValues } from "./_lib/onboarding.form";
import { useFinishOnboarding } from "./_lib/useFinishOnboarding";
import type { OnboardingFormValues } from "./_types/onboarding.types";

const OnboardingPage = () => {
    const { currentStep, setCurrentStep } = useOnboarding();
    const { handleCreateOrganization, loading } = useFinishOnboarding();

    const handleSubmit = (values: OnboardingFormValues, helpers: FormikHelpers<OnboardingFormValues>) => {
        if (currentStep === 1) {
            setCurrentStep(2);
            helpers.setTouched({});
            helpers.setSubmitting(false);
            return;
        }

        if (currentStep === 2) {
            setCurrentStep(3);
            helpers.setTouched({});
            helpers.setSubmitting(false);
            return;
        }

        handleCreateOrganization(values);
    };

    return (
        <Formik
            initialValues={initialOnboardingValues}
            validationSchema={getStepValidationSchema(currentStep)}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            enableReinitialize
        >
            <Form noValidate style={{ height: "100%" }}>
                {currentStep === 1 && <Step1CreateOrganization />}
                {currentStep === 2 && <Step2AssignModules />}
                {currentStep === 3 && <Step3InviteTeam loading={loading}/>}
            </Form>
        </Formik>
    );
};

export default OnboardingPage;
