import type { OrganizationModule, OrganizationType } from "@/context";

export type CreateOrganizationPayload = {
    name: string;
    slug: string;
    industry: string;
    modules: OrganizationModule[];
};

export type OrgFormValues = CreateOrganizationPayload & {
    logo: File | null;
};

export type ModuleOption = {
    value: OrganizationModule;
    label: string;
};

export type UseCreateOrganizationArgs = {
    onSuccess: () => void;
};

export type OrgFormDialogProps = {
    open: boolean;
    editingOrg?: OrganizationType;
    onClose: () => void;
    onSubmitted: () => void;
};

export type OrgFormFieldsProps = {
    loading: boolean;
    submitLabel: string;
};

export type ModuleBadgesProps = {
    modules: OrganizationModule[];
};
