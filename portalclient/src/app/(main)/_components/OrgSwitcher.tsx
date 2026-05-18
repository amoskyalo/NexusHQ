"use client";

import { useState } from "react";
import { Avatar, Box, ButtonBase, CircularProgress, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Building2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useOrganization } from "@/context";
import type { OrganizationType } from "@/context";
import { useQueryGet } from "@/hooks/useQueryGet";

const OrgSwitcher = () => {
    const { selectedOrg, setSelectedOrg } = useOrganization();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data, isLoading } = useQueryGet<OrganizationType[], undefined>({
        url: "/api/organizations",
        options: { enabled: open },
    });
    const organizations = data?.body ?? [];

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (org: OrganizationType) => {
        setSelectedOrg(org);
        handleClose();
    };

    return (
        <>
            <ButtonBase
                onClick={handleOpen}
                focusRipple
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 16,
                    px: 1,
                    py: 0.4,
                    transition: (theme) =>
                        theme.transitions.create(["background-color", "border-color"], {
                            duration: theme.transitions.duration.shortest,
                        }),
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                    "&.Mui-focusVisible": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                <Building2 size={20} />
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: 13, color: "text.primary" }}>
                        {selectedOrg?.name ?? "Select organization"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 11, mt: -0.5 }}>
                        {selectedOrg?.slug ?? "—"}
                    </Typography>
                </Box>
                <Stack direction="column" alignItems="center">
                    <ChevronUp size={12} style={{ marginBottom: "-0.1rem" }} />
                    <ChevronDown size={12} style={{ marginTop: "-0.1rem" }} />
                </Stack>
            </ButtonBase>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 280,
                            borderRadius: 5,
                            px: 1,
                        },
                    },
                }}
            >
                {isLoading && (
                    <Stack alignItems="center" sx={{ py: 2 }}>
                        <CircularProgress size={18} />
                    </Stack>
                )}

                {!isLoading && organizations.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1.5 }}>
                        No organizations found
                    </Typography>
                )}

                {!isLoading &&
                    organizations.map((org) => {
                        const active = org.id === selectedOrg?.id;
                        return (
                            <MenuItem
                                key={org.id}
                                onClick={() => handleSelect(org)}
                                selected={active}
                                sx={{ borderRadius: 4, px: 1, py: 1, "&.Mui-selected": { bgcolor: "action.hover" } }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: "100%" }}>
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            //bgcolor: "primary.main",
                                            fontSize: 13,
                                        }}
                                    >
                                        {org.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: 14 }} noWrap>
                                            {org.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }} noWrap>
                                            {org.slug}
                                        </Typography>
                                    </Box>
                                    {active && <Check size={16} />}
                                </Stack>
                            </MenuItem>
                        );
                    })}
            </Menu>
        </>
    );
};

export default OrgSwitcher;
