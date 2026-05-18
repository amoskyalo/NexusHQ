"use client";

import { Pagination, Box, Divider, Stack, Typography, MenuList, MenuItem, Menu } from "@mui/material";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useGridUrlState } from "@/hooks/useGridUrlState";
import { useEffect, useState } from "react";
import { DataGridFooterProps } from "../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DatagridFooter = (props: DataGridFooterProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const {
        loading,
        pages,
        justifyContent,
        hideRowSizeSelector,
        size,
        showFirstButton,
        showLastButton,
        shape = "rounded",
    } = props;
    const { isMobile } = useResponsiveness();
    const { getParam } = useSearchParams();
    const { setPage, setPageSize } = useGridUrlState();

    const [prevLoading, setPrevLoading] = useState(loading);
    const [stablePages, setStablePages] = useState(pages ?? 1);
    if (prevLoading !== loading) {
        setPrevLoading(loading);
        if (!loading && pages != null && pages !== stablePages) {
            setStablePages(pages);
        }
    }

    const limit = Number.parseInt(getParam("limit") ?? "10");
    const start = Number.parseInt(getParam("start") ?? "1");

    useEffect(() => {
        if (start && pages && start > pages) {
            setPage(1);
        }
    }, [start, pages, setPage]);

    return (
        <Box>
            {!hideRowSizeSelector && <Divider sx={{ borderColor: "var(--DataGrid-rowBorderColor)" }} />}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent={justifyContent ?? "flex-end"}
                spacing={3}
                sx={{ py: 1.5 }}
            >
                {!isMobile && !hideRowSizeSelector && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                            Rows per page:
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{ cursor: "pointer", color: "text.secondary" }}
                            spacing={1}
                        >
                            <Typography variant="body2">{limit}</Typography>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Stack>
                    </Stack>
                )}

                <Pagination
                    variant="outlined"
                    disabled={loading}
                    onChange={(_, page) => setPage(page)}
                    page={start}
                    defaultPage={1}
                    count={stablePages}
                    size={size}
                    showFirstButton={showFirstButton}
                    showLastButton={showLastButton}
                />
            </Stack>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuList>
                    {[5, 10, 25, 50, 75, 100].map((size) => (
                        <MenuItem onClick={() => setPageSize(size)} key={size}>
                            <Typography variant="body2">{size}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};
