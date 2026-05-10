import { Grid, Stack } from "@mui/material";
import { LoginsProvider } from "@/context/login-context";
import { MarketingPanel } from "./_components/MarketingPanel";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LoginsProvider>
            <Grid container sx={{ height: "100dvh", overflow: "hidden" }}>
                <Grid size={6} sx={{ height: "100%", py: 2 }}>
                    <Stack direction="column" sx={{ height: "100%" }}>
                        <Stack sx={{ flex: 1 }}>{children}</Stack>
                    </Stack>
                </Grid>
                <Grid size={6} sx={{ height: "100%" }}>
                    <MarketingPanel />
                </Grid>
            </Grid>
        </LoginsProvider>
    );
};

export default AuthLayout;
