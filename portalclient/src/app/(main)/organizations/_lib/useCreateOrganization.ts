"use client";

import { useQueryPost } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import type { CreateOrganizationPayload, UseCreateOrganizationArgs } from "../_types/organization.types";

export const useCreateOrganization = ({ onSuccess }: UseCreateOrganizationArgs) => {
    const { mutate, isPending } = useQueryPost<CreateOrganizationPayload, undefined>({
        options: createMutationHandlers({
            successCallback: onSuccess,
        }),
    });

    const createOrganization = (body: CreateOrganizationPayload) => {
        mutate({ url: "/api/organizations/create", body });
    };

    return { createOrganization, loading: isPending };
};
