import { AppBar, Box, Stack, Toolbar, IconButton, Divider, TextField, InputAdornment, Typography } from "@mui/material";
import { Bell, Building2, ChevronDown, ChevronUp, Mail, Search } from "lucide-react";
import { AuthContextProvider } from "@/context";
import AccountMenu from "./_components/AccountMenu";
import { SideNav } from "@/components/navigation";
import { ROUTES } from "@/constants/routes";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <Stack direction="row" sx={{ height: "100vh" }}>
                <SideNav routes={ROUTES} />

                <Stack direction="column" sx={{ flex: 1, overflowX: "hidden", height: "100%" }}>
                    <AppBar
                        position="sticky"
                        sx={{
                            backgroundColor: "transparent",
                            color: "text.primary",
                            boxShadow: "none",
                            borderBottom: 1,
                            borderColor: "divider",
                            borderLeft: 0,
                        }}
                    >
                        <Toolbar sx={{ paddingX: "16px !important" }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{
                                        color: "text.secondary",
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 16,
                                        px: 0.7,
                                        py: 0.3,
                                        cursor: "pointer",
                                    }}
                                >
                                    <Building2 size={20} />
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            sx={{ fontSize: 13, color: "text.primary" }}
                                        >
                                            Acme org
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontSize: 11, mt: -0.5 }}
                                        >
                                            acme-org
                                        </Typography>
                                    </Box>
                                    <Stack direction="column" alignItems="center">
                                        <ChevronUp size={12} style={{ marginBottom: "-0.1rem" }} />
                                        <ChevronDown size={12} style={{ marginTop: "-0.1rem" }} />
                                    </Stack>
                                </Stack>

                                <TextField
                                    size="small"
                                    fullWidth
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            maxHeight: "36px !important",
                                            minHeight: "36px !important",
                                            height: "36px !important",
                                            paddingLeft: "10px !important",
                                            fontSize: 14,
                                        },
                                        maxWidth: 500,
                                    }}
                                    placeholder="Search..."
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search size={16} style={{ opacity: 0.7 }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <IconButton sx={{ border: 1, borderColor: "divider" }}>
                                        <Bell size={20} />
                                    </IconButton>
                                    <IconButton sx={{ border: 1, borderColor: "divider" }}>
                                        <Mail size={20} />
                                    </IconButton>

                                    <Divider flexItem orientation="vertical" sx={{ height: 24, alignSelf: "center" }} />

                                    <AccountMenu />
                                </Stack>
                            </Stack>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ width: "100%", flex: 1, padding: 3, backgroundColor: "#f3f4f6" }}>{children}</Box>
                </Stack>
            </Stack>
        </AuthContextProvider>
    );
};

export default MainLayout;
