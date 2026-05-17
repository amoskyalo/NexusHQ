export type Permission = {
    controller: string;
    action: string;
};

export type UserType = {
    id: string;
    phoneNumber: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    organizations: [];
    firstName: string;
    lastName: string;
    displayName: string;
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
