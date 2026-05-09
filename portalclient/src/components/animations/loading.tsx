import { Box, Stack } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const LoadingAnimation = () => {
    return (
        <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
            <Box sx={{ height: 50, mt: 4 }}>
                <DotLottieReact
                    src="/animations/loading.json"
                    loop
                    autoplay
                />
            </Box>
        </Stack>
    );
};
