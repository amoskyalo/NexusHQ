"use client";

import { createContext, useContext, useState } from "react";
import type { OnboardingContextProps, OnboardingStep } from "../_types/onboarding.types";

const OnboardingContext = createContext<OnboardingContextProps>({
    currentStep: 1,
    setCurrentStep: () => {},
});

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

    return (
        <OnboardingContext.Provider value={{ currentStep, setCurrentStep }}>{children}</OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
};
