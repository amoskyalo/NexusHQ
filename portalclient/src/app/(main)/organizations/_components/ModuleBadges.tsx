"use client";

import { Box, Stack, Tooltip } from "@mui/material";
import { MODULE_OPTIONS } from "../_lib/organization.constants";
import type { ModuleBadgesProps } from "../_types/organization.types";

const VISIBLE_COUNT = 2;

const labelFor = (value: string) => MODULE_OPTIONS.find((m) => m.value === value)?.label ?? value;

const badgeSx = {
    display: "inline-flex",
    alignItems: "center",
    border: 1,
    borderColor: "divider",
    borderRadius: 999,
    px: 0.8,
    py: 0.1,
    fontSize: 11,
    lineHeight: 1.7,
    color: "text.secondary",
    whiteSpace: "nowrap",
} as const;

export const ModuleBadges = ({ modules }: ModuleBadgesProps) => {
    if (!modules?.length) return null;

    const visible = modules.slice(0, VISIBLE_COUNT);
    const overflow = modules.slice(VISIBLE_COUNT);

    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            {visible.map((value) => (
                <Box key={value} component="span" sx={badgeSx}>
                    {labelFor(value)}
                </Box>
            ))}

            {overflow.length > 0 && (
                <Tooltip title={overflow.map(labelFor).join(", ")} arrow>
                    <Box component="span" sx={{ ...badgeSx, cursor: "default" }}>
                        +{overflow.length}
                    </Box>
                </Tooltip>
            )}
        </Stack>
    );
};
