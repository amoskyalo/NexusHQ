import { Box, Stack } from "@mui/material";
import { OnboardingHeader } from "./_components/OnboardingHeader";
import { OnboardingStepsPanel } from "./_components/OnboardingStepsPanel";
import { OnboardingProvider } from "./_lib/onboarding.context";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <OnboardingProvider>
            <Stack sx={{ height: "100dvh", overflow: "hidden", bgcolor: "background.default" }}>
                <OnboardingHeader />

                <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, overflow: "hidden" }}>
                    <Stack direction="row" sx={{ height: "100%" }}>
                        <Box sx={{ width: { xs: "40%", md: "36%" }, height: "100%" }}>
                            <OnboardingStepsPanel />
                        </Box>
                        <Box sx={{ flex: 1, height: "100%", overflow: "auto" }}>{children}</Box>
                    </Stack>
                </Box>
            </Stack>
        </OnboardingProvider>
    );
};

export default OnboardingLayout;
