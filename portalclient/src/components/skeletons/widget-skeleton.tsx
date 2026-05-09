import { Skeleton, Stack, Box } from "@mui/material";

export const WidgetSkeleton = () => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
        }}
    >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Skeleton variant="text" width={100} height={20} />

            <Skeleton
                variant="rectangular"
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 50,
                }}
            />
        </Stack>

        <Stack>
            <Skeleton variant="text" sx={{ width: "75%", height: 24, mb: 1 }} />

            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={100} height={20} />
            </Stack>
        </Stack>
    </Box>
);
