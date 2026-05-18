"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { AuthContextProps, UserType } from "./types/auth.types";
import { LoadingAnimation } from "@/components/animations/loading";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useQueryGet } from "@/hooks/useQueryGet";

const AuthContext = createContext<AuthContextProps>({
    me: undefined,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const { data, isLoading, isFetching, isError, refetch } = useQueryGet<UserType, undefined>({ url: "/api/me" });
    const me = data?.body;

    useEffect(() => {
        if (isError) router.push("/auth/signin");
    }, [isError, router]);

    const value: AuthContextProps = useMemo(
        () => ({
            me,
            refetchProfile: async () => {
                await refetch();
            },
            state: {
                loadingProfile: isLoading || isFetching,
            },
        }),
        [me, isLoading, isFetching, refetch],
    );

    if (isLoading && !me) {
        return <LoadingAnimation />;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
            {isFetching && me && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        zIndex: (theme) => theme.zIndex.modal + 1,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(2px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ height: 50 }}>
                        <DotLottieReact src="/animations/loading.json" loop autoplay />
                    </Box>
                </Box>
            )}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return context;
};

export { AuthContextProvider, useAuth };
