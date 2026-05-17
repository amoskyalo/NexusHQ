import type React from "react";

export type OnboardingStep = 1 | 2 | 3;

export type OnboardingContextProps = {
    currentStep: OnboardingStep;
    setCurrentStep: (step: OnboardingStep) => void;
};

export type OnboardingStepDef = {
    step: OnboardingStep;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number | string }>;
};

export type OnboardingHeaderProps = {
    onLogout?: () => void;
    onHelp?: () => void;
};

export type InviteRow = {
    email: string;
    role: string;
};

export type OnboardingFormValues = {
    name: string;
    industry: string;
    slug: string;
    modules: string[];
    invites: InviteRow[];
};
