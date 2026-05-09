"use client";

import { Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { formatters } from "@/utils/formatters";
import { CircleDashed, CircleAlert, CloudCheck, ShieldCheck, ShieldAlert } from "lucide-react";

const WARNINGS = [
    "processing",
    "pending",
    "inprogress",
    "pending arrest",
    "pending approval",
    "pending consent",
    "pending refund",
    "pending investigation",
];
const ERRORS = ["failed", "rejected", "unprocessed", "unverified", "suspended", "invalid"];
const SUCCESS = ["success", "paid", "processed", "verified", "valid", "processed"];
const STATUS_ACTIVE = ["active"];
const STATUS_INACTIVE = ["inactive", "disabled", "barred"];

export const StatusButton = ({
    status,
    allLowerCase = true,
    size = "small",
}: {
    status: string;
    size?: "small" | "medium";
    allLowerCase?: boolean;
}) => {
    const { lowerCaseString } = formatters();
    const theme = useTheme();

    function getProps(): { color: "primary" | "warning" | "error" | "success"; icon: any } {
        const sts = status.toLowerCase();

        if (WARNINGS.includes(sts))
            return {
                color: "warning",
                icon: CircleDashed,
            };

        if (ERRORS.includes(sts))
            return {
                color: "error",
                icon: CircleAlert,
            };

        if (SUCCESS.includes(sts))
            return {
                color: "success",
                icon: CloudCheck,
            };

        if (STATUS_ACTIVE.includes(sts))
            return {
                color: "success",
                icon: ShieldCheck,
            };

        if (STATUS_INACTIVE.includes(sts))
            return {
                color: "error",
                icon: ShieldAlert,
            };

        return {
            color: "primary",
            icon: CloudCheck,
        };
    }

    const color = getProps().color;
    const Icon = getProps().icon;

    return (
        <Stack justifyContent="center" sx={{ height: "100%" }}>
            <Typography
                variant="caption"
                color={color}
                sx={{
                    backgroundColor: alpha(theme.palette[color].main, 0.1),
                    width: "max-content",
                    borderRadius: 4,
                    px: 1,
                    py: 0.5,
                    fontWeight: size === "small" ? "normal" : 500,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: size === "small" ? 10 : 12,
                }}
            >
                {<Icon color={theme.palette[color].main} size={size === "small" ? 12 : 16} />}
                {allLowerCase ? lowerCaseString(status) : status}
            </Typography>
        </Stack>
    );
};
