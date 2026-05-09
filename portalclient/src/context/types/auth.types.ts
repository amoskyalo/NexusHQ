export type Permission = {
    controller: string;
    action: string;
};

export type UserType = {
    userId: string;
    role: string;
    roles: string[];
    department: string;
    accessGroup: string;
    mobile: string;
    permissions: Permission[];
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
