import { AppBar, Box, Stack, Toolbar, IconButton, Divider, TextField, InputAdornment } from "@mui/material";
import { Bell, Mail, Search } from "lucide-react";
import { AuthContextProvider, OrganizationProvider } from "@/context";
import AccountMenu from "./_components/AccountMenu";
import OrgSwitcher from "./_components/OrgSwitcher";
import { SideNav } from "@/components/navigation";
import { ROUTES } from "@/constants/routes";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <OrganizationProvider>
                <Stack direction="row" sx={{ height: "100vh", backgroundColor: "#f3f4f6" }}>
                    <SideNav routes={ROUTES} />

                    <Stack sx={{ flex: 1, overflowX: "hidden", height: "100%", p: 1 }}>
                        <Stack
                            direction="column"
                            sx={{
                                flex: 1,
                                overflowX: "hidden",
                                height: "100%",
                                backgroundColor: "#ffffff",
                                borderRadius: 4,
                            }}
                        >
                            <AppBar
                                position="sticky"
                                sx={{
                                    backgroundColor: "transparent",
                                    color: "text.primary",
                                    boxShadow: "none",
                                    border: 0,
                                }}
                            >
                                <Toolbar sx={{ paddingX: "16px !important" }}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ width: "100%" }}
                                    >
                                        <OrgSwitcher />

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

                                            <Divider
                                                flexItem
                                                orientation="vertical"
                                                sx={{ height: 24, alignSelf: "center" }}
                                            />

                                            <AccountMenu />
                                        </Stack>
                                    </Stack>
                                </Toolbar>
                            </AppBar>

                            <Box sx={{ width: "100%", flex: 1, padding: 3 }}>{children}</Box>
                        </Stack>
                    </Stack>
                </Stack>
            </OrganizationProvider>
        </AuthContextProvider>
    );
};

export default MainLayout;
