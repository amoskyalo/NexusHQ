"use client";

import { Box, Stack } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const NotFoundAnimation = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Stack direction="column" justifyContent={"center"} alignItems={"center"}>
            <Box sx={{ height: 150, mt: 4 }}>
                <DotLottieReact src="/animations/404.json" loop autoplay />
            </Box>
            {children}
        </Stack>
    );
};
