import { useQueryPost } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import { SignInInitialValues, SignUpInitialValues } from "../_types/auth.types";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
    const router = useRouter();

    const { mutate: signIn, isPending } = useQueryPost({
        options: createMutationHandlers<{ role: string; organizations: string[] }>({
            successCallback: ({ body: { organizations, role } }) => {
                if (role == "ADMIN" && organizations.length == 0) {
                    router.push("/onboarding");
                } else {
                    router.push("/dashboard");
                }
            },
        }),
    });

    const handleSignIn = (values: SignInInitialValues) => {
        signIn({
            url: "api/auth/login",
            body: values,
        });
    };

    return {
        loading: isPending,
        handleSignIn,
    };
};

export const useSignUp = () => {
    const router = useRouter();

    const { mutate: signUp, isPending } = useQueryPost({
        options: createMutationHandlers({
            successCallback: () => {
                router.push("/auth/signin");
            },
        }),
    });

    const handleSignUp = (values: SignUpInitialValues) => {
        const { password_confirm, acceptPrivacy, phoneNumber, ...payload } = values;
        void password_confirm;
        void acceptPrivacy;
        const phone = phoneNumber.replace(/\s/g, "");

        signUp({
            url: "api/auth/signup",
            body: {
                phoneNumber: `254${phone}`,
                ...payload,
            },
        });
    };

    return {
        loading: isPending,
        handleSignUp,
    };
};
