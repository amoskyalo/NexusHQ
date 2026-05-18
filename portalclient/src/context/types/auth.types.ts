export type Permission = {
    controller: string;
    action: string;
};

export type OrganizationModule = "HR" | "FINANCE" | "TECH" | "AGILE";

export type OrganizationType = {
    id: string;
    userId: string;
    name: string;
    slug: string;
    industry: string;
    modules: OrganizationModule[];
    createdAt: string;
    updatedAt: string;
};

export type UserType = {
    id: string;
    phoneNumber: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    organizations: OrganizationType[];
    firstName: string;
    lastName: string;
    displayName: string;
};

export type OrganizationContextProps = {
    selectedOrg?: OrganizationType;
    setSelectedOrg: (org: OrganizationType) => void;
};

export type AuthStates = {
    loadingProfile: boolean;
};

export type AuthContextProps = {
    me?: UserType;
    state?: AuthStates;
    switchRole?: (role: string) => Promise<void>;
    logout?: () => Promise<void>;
    refetchProfile?: () => Promise<void>;
};
