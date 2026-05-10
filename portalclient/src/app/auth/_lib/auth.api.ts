import { useQueryPost } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import { SignInInitialValues, SignUpInitialValues } from "../_types/auth.types";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
    const { mutate: signIn, isPending } = useQueryPost({
        options: createMutationHandlers({
            successCallback: (data) => {
                console.log(data);
            },
        }),
    });

    const handleSignIn = (values: SignInInitialValues) => {
        signIn({
            url: "api/auth/login",
            data: values,
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
            data: {
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
