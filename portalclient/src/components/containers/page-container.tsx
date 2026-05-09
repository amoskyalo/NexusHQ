"use client";

import { Stack, Box, Typography, Tab } from "@mui/material";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Tabs } from "../tabs";

type PageContainerProps = {
    title: string;
    description: string;
    tabs?: { label: string; value: string }[];
    children?: React.ReactNode;
};

export const PageContainer = ({ title, description, tabs, children }: PageContainerProps) => {
    const { getParam, setParams } = useSearchParams();
    const tab = getParam("tab");

    return (
        <Stack spacing={2} sx={{paddingX: 2, paddingTop: 2}}>
            <Box>
                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
            </Box>

            <Stack>
                {tabs && (
                    <Tabs value={tab} onChange={(e, value) => setParams({ tab: value })}>
                        {tabs.map((tab) => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </Tabs>
                )}

                {children}
            </Stack>
        </Stack>
    );
};
