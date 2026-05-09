"use client";

import { Tabs as MuiTabs, TabsProps, tabsClasses } from "@mui/material";
import { useResponsiveness } from "@/hooks/useResponsiveness";

export const Tabs = ({
    sx,
    ...rest
}: Omit<TabsProps, "sx" | "variant" | "allowScrollButtonsMobile" | "scrollButtons"> & {
    sx?: Omit<TabsProps["sx"], "borderBottom" | "borderColor">;
}) => {
    const { isMobile } = useResponsiveness();

    return (
        <MuiTabs
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                },
                ...sx,
            }}
            variant="scrollable"
            allowScrollButtonsMobile={isMobile}
            scrollButtons={isMobile ? "auto" : "auto"}
            {...rest}
        />
    );
};
