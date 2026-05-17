"use client";

import type { OnboardingFormValues } from "../_types/onboarding.types";
import { useQueryPost } from "@/hooks";
import { createMutationHandlers } from "@/utils";

export const useFinishOnboarding = () => {
    const { mutate, isPending, isError } = useQueryPost({
        options: createMutationHandlers({
            successCallback: () => {
                window.location.replace("/settings");
            },
        }),
    });

    const handleCreateOrganization = ({ invites, ...body }: OnboardingFormValues) => {
        mutate({
            url: "/api/organizations/create",
            body,
        });

        void invites;
    };

    return {
        handleCreateOrganization,
        loading: isPending && !isError,
    };
};
