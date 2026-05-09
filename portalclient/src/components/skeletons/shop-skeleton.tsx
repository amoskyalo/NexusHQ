import React from "react";
import { Stack, Skeleton, Box, Grid } from "@mui/material";

export const ShopSkeleton = () => {
    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 1.5,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                transition: "all 0.2s ease",
                "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
                <Skeleton variant="circular" sx={{ height: 40, width: 40 }} />
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" sx={{ height: 18, width: "95%" }} />
                    <Skeleton variant="text" sx={{ height: 20, width: "70%" }} />
                </Box>
            </Stack>

            <Grid container>
                <Grid size={6}>
                    <Skeleton variant="text" sx={{ height: 18, width: "75%" }} />
                    <Skeleton variant="text" sx={{ height: 20, width: "50%" }} />
                </Grid>
                <Grid size={6}>
                    <Skeleton variant="text" sx={{ height: 18, width: "50%" }} />
                    <Skeleton variant="text" sx={{ height: 20, width: "75%" }} />
                </Grid>
            </Grid>
        </Box>
    );
};
