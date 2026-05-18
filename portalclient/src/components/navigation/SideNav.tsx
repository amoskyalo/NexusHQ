"use client";

import { useState } from "react";
import {
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Stack,
    IconButton,
    Divider,
    Tooltip,
    Collapse,
} from "@mui/material";
import { PanelLeftClose, PanelLeftOpen, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import type { SideNavProps } from "../types/sidenav.types";

const DRAWER_WIDTH_EXPANDED = 275;
const DRAWER_WIDTH_COLLAPSED = 70;

export const SideNav = ({ routes }: SideNavProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const { isSmallScreen } = useResponsiveness();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const effectivePath = pathname === "/403" ? (searchParams.get("for") ?? pathname) : pathname;

    const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;

    const handleNavigate = (path: string) => {
        router.push(path);
        if (isSmallScreen) {
            setMobileOpen(false);
        }
    };

    const toggleCollapse = () => setCollapsed(!collapsed);
    const toggleMobileOpen = () => setMobileOpen(!mobileOpen);

    const toggleExpandItem = (title: string) => {
        setExpandedItems((prev) => ({
            [title]: !prev[title],
        }));
    };

    const handleItemClick = (route: any) => {
        if (route.children && route.children.length > 0) {
            toggleExpandItem(route.title);
        } else if (route.segment) {
            handleNavigate(route.segment);
        }
    };

    const isActiveParent = (route: any) => {
        if (effectivePath === route.segment) return true;
        if (route.children) {
            return route.children.some((child: any) => effectivePath === child.segment);
        }
        return false;
    };

    const drawerContent = (
        <>
            <Toolbar
                sx={{
                    paddingX: collapsed ? "8px !important" : "8px !important",
                    minHeight: "56px !important",
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent={collapsed ? "center" : "space-between"}
                    sx={{ height: "100%", width: "100%", py: 0.7 }}
                >
                    {collapsed ? (
                        <Tooltip title="Expand sidebar" placement="right">
                            <IconButton onClick={toggleCollapse} size="small">
                                <PanelLeftOpen size={20} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Image
                                src="/images/logo.png"
                                width={1440}
                                height={1440}
                                alt="Logo"
                                style={{ height: 40, width: 120 }}
                            />
                            <IconButton onClick={isSmallScreen ? toggleMobileOpen : toggleCollapse}>
                                <PanelLeftClose color="grey" />
                            </IconButton>
                        </>
                    )}
                </Stack>
            </Toolbar>

            <List sx={{ paddingX: 1, overflow: "auto", flex: 1 }} className="nav-links-container">
                {routes.map((route, index) => {
                    if (route.kind === "header") {
                        if (collapsed) {
                            return (
                                <Divider
                                    key={route.title}
                                    sx={{
                                        my: 1.5,
                                        mx: 0.5,
                                    }}
                                />
                            );
                        }

                        return (
                            <Typography
                                variant="caption"
                                key={route.title}
                                sx={{ mb: 2, textTransform: "uppercase", fontWeight: 700, opacity: 0.8 }}
                            >
                                {route.title}
                            </Typography>
                        );
                    }

                    const prevRoute = routes[index - 1];
                    const nextRoute = routes[index + 1];
                    const hasChildren = route.children && route.children.length > 0;
                    const isExpanded = expandedItems[route.title];
                    const isActive = isActiveParent(route);

                    const listItem = (
                        <ListItem
                            key={route.title}
                            disablePadding
                            sx={{
                                mb: nextRoute?.kind === "header" ? 2 : 0,
                                mt: prevRoute?.kind === "header" ? 1 : 0,
                            }}
                            onClick={() => handleItemClick(route)}
                        >
                            <ListItemButton
                                selected={isActive}
                                sx={{
                                    "&.Mui-selected": {
                                        color: "primary.main",
                                        backgroundColor: "action.selected",
                                        "& .MuiListItemIcon-root": {
                                            color: "primary.main",
                                        },
                                        "& .MuiIconButton-root": {
                                            color: "primary.main",
                                        },
                                        "& .MuiTypography-root": {
                                            opacity: 1,
                                        },
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: 3,
                                            height: "100%",
                                            backgroundColor: "primary.main",
                                            borderTopRightRadius: 16,
                                            borderBottomRightRadius: 16,
                                        },
                                    },
                                    "& .MuiTypography-root": {
                                        fontSize: "14px !important",
                                        opacity: 0.7,
                                    },
                                    "& .MuiListItemIcon-root": {
                                        color: "text.secondary",
                                    },
                                    "& .MuiIconButton-root": {
                                        color: "text.secondary",
                                    },
                                    paddingY: "2px !important",
                                    paddingLeft: collapsed ? "0px !important" : "12px !important",
                                    paddingRight: collapsed ? "0px !important" : "4px !important",
                                    borderRadius: 2,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    position: "relative",
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    minHeight: 40,
                                    mb: 0.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        width: "max-content !important",
                                        minWidth: "max-content !important",
                                        maxWidth: "max-content !important",
                                        mr: collapsed ? 0 : 1.5,
                                    }}
                                >
                                    {route.icon}
                                </ListItemIcon>
                                {!collapsed && (
                                    <>
                                        <ListItemText primary={route.title} />
                                        {hasChildren && (
                                            <IconButton
                                                size="small"
                                                color="inherit"
                                                sx={{
                                                    ml: "auto",
                                                    p: 0.5,
                                                    color: "inherit",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpandItem(route.title);
                                                }}
                                                disableFocusRipple
                                                disableRipple
                                                disableTouchRipple
                                            >
                                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </IconButton>
                                        )}
                                    </>
                                )}
                            </ListItemButton>
                        </ListItem>
                    );

                    const wrappedItem = collapsed ? (
                        <Tooltip key={route.title} title={route.title} placement="right" arrow>
                            {listItem}
                        </Tooltip>
                    ) : (
                        listItem
                    );

                    if (!hasChildren || collapsed) {
                        return wrappedItem;
                    }

                    return (
                        <div key={route.title}>
                            {wrappedItem}
                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {route.children?.map((child: any) => (
                                        <ListItem
                                            key={child.title}
                                            disablePadding
                                            sx={{ pl: 1 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (child.segment) {
                                                    handleNavigate(child.segment);
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                selected={effectivePath === child.segment}
                                                sx={{
                                                    "&.Mui-selected": {
                                                        color: "primary.main",
                                                        backgroundColor: "transparent",
                                                        "& .MuiListItemIcon-root": {
                                                            color: "primary.main",
                                                        },
                                                        "& .MuiTypography-root": {
                                                            opacity: 1,
                                                        },
                                                        "&::before": {
                                                            backgroundColor: "primary.main",
                                                        },
                                                    },
                                                    "& .MuiTypography-root": {
                                                        fontSize: "13px !important",
                                                        opacity: 0.7,
                                                    },
                                                    mb: 0.5,
                                                    paddingY: "2px !important",
                                                    paddingX: "12px !important",
                                                    paddingLeft: "44px !important",
                                                    borderRadius: 2,
                                                    position: "relative",
                                                    minHeight: 34,
                                                    "&::before": {
                                                        content: '""',
                                                        position: "absolute",
                                                        left: "24px",
                                                        top: "50%",
                                                        width: "10px",
                                                        height: "2px",
                                                        backgroundColor: "divider",
                                                        opacity: 0.5,
                                                    },
                                                }}
                                            >
                                                {child.icon && (
                                                    <ListItemIcon
                                                        sx={{
                                                            width: "max-content !important",
                                                            minWidth: "max-content !important",
                                                            maxWidth: "max-content !important",
                                                            mr: 1.5,
                                                        }}
                                                    >
                                                        {child.icon}
                                                    </ListItemIcon>
                                                )}
                                                <ListItemText primary={child.title} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    );
                })}
            </List>
        </>
    );

    return (
        <>
            {isSmallScreen && (
                <IconButton
                    onClick={toggleMobileOpen}
                    sx={{
                        position: "fixed",
                        top: 12,
                        left: 12,
                        zIndex: 1200,
                        backgroundColor: "background.paper",
                        boxShadow: 1,
                        "&:hover": {
                            backgroundColor: "background.paper",
                        },
                    }}
                >
                    <Menu size={20} />
                </IconButton>
            )}

            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                anchor="left"
                open={isSmallScreen ? mobileOpen : true}
                onClose={toggleMobileOpen}
                sx={{
                    width: isSmallScreen ? "75%" : drawerWidth,
                    flexShrink: 0,
                    boxShadow: "none",
                    transition: "width 0.2s ease-in-out",
                    [`& .MuiDrawer-paper`]: {
                        width: isSmallScreen ? "75%" : drawerWidth,
                        boxSizing: "border-box",
                        boxShadow: "none",
                        backgroundColor: "#f3f4f6",
                        overflow: "hidden",
                        transition: "width 0.2s ease-in-out",
                        borderRight: 0
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};
