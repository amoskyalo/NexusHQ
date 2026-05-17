"use client";

import React, { useState } from "react";
import { IconButton, Stack, Avatar, Box, Typography, Menu, Divider, Tooltip } from "@mui/material";
import { LogOut } from "lucide-react";
import { red } from "@mui/material/colors";
import { useAuth } from "@/context";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { me } = useAuth();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        try {
            await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ action: "logout" }),
            });
        } catch (error) {
            console.log(error);
        }
        window.location.href = "/auth/login";
    };
    
    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 16,
                    width: 38,
                    height: 38,
                    ":hover": {
                        transform: "none",
                    },
                }}
            >
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 13,
                        bgcolor: "primary.main",
                    }}
                >
                    MK
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 320,
                            borderRadius: 3,
                            border: 1,
                            borderColor: "divider",
                        },
                    },
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pl: 2, pr: 1.5, pb: 1.3, pt: 0.6 }}
                >
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {me?.displayName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 12 }} color="text.secondary">
                            {me?.email}
                        </Typography>
                    </Box>

                    <Tooltip title="Logout">
                        <IconButton
                            color="error"
                            onClick={handleLogout}
                            sx={{
                                bgcolor: red[100],
                                ":hover": {
                                    bgcolor: red[100],
                                },
                            }}
                        >
                            <LogOut size={16} />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Divider sx={{ mb: 1 }} />
            </Menu>
        </>
    );
};

export default AccountMenu;
