export type SignInInitialValues = {
    email: string;
    password: string;
};

export type SignUpInitialValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password_confirm: string;
    phoneNumber: string;
    acceptPrivacy: boolean;
};

export type SignUpPayload = Omit<SignUpInitialValues, "password_confirm" | "acceptPrivacy">;
