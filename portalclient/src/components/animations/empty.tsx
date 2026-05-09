import { Box, Stack } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const EmptyAnimation = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Stack direction="column" justifyContent={"center"} alignItems={"center"}>
            <Box sx={{ height: 100 }}>
                <DotLottieReact src="/animations/empty.json" loop autoplay />
            </Box>
            {children}
        </Stack>
    );
};
