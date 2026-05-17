"use client";

import { isValidElement, useState } from "react";
import { Toolbar } from "@mui/x-data-grid";
import { Box, Button, Typography, Collapse, CircularProgress } from "@mui/material";
import { DataGridToolbarProps } from "../types";
import { DataGridSearchInput } from "../../inputs/DataGridSearchInput";
import { AdvancedDataFilter } from "../../advanced-filter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useGridUrlState } from "@/hooks/useGridUrlState";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import dayjs from "dayjs";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

export const DatagridToolbar = ({
    renderAdditionalButtons,
    showDateFilters,
    searchConfig,
    buttons,
    filterContent,
    onFilterApply,
    onFilterClear,
}: Readonly<DataGridToolbarProps>) => {
    const { getParam } = useSearchParams();
    const { setDate } = useGridUrlState();
    const { isMobile } = useResponsiveness();
    const date = getParam("date");

    const [filtersOpen, setFiltersOpen] = useState(false);
    const closeFilters = () => setFiltersOpen(false);

    return (
        <Toolbar
            render={
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            borderBottom: 1,
                            borderColor: "divider",
                            padding: "8px",
                            gap: 1,
                        }}
                    >
                        {/* {!isMobile && searchConfig !== null && (
                            <DataGridSearchInput placeholder={searchConfig?.placeholder ?? "Type to search..."} />
                        )} */}
                        {showDateFilters && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    value={date ? dayjs(date) : null}
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1.5,
                                        pt: 0.5,
                                        pl: 0.7,
                                        pr: 0.5,
                                        fontSize: "14px !important",
                                        "& .MuiPickersSectionList-section": {
                                            fontSize: "13px !important",
                                            color: "text.secondary",
                                            fontWeight: 500,
                                        },
                                    }}
                                    slots={{
                                        openPickerIcon: CalendarMonthOutlinedIcon,
                                    }}
                                    slotProps={{
                                        openPickerIcon: {
                                            color: "action",
                                            sx: { fontSize: 18 },
                                        },
                                        openPickerButton: {
                                            sx: {
                                                padding: 0,
                                                marginBottom: 0.5,
                                                "&:hover": {
                                                    backgroundColor: "transparent",
                                                    transform: "none",
                                                },
                                            },
                                        },
                                        textField: {
                                            variant: "standard",
                                            size: "small",
                                            placeholder: "Select Date",
                                            InputProps: {
                                                disableUnderline: true,
                                                style: {
                                                    height: "24px",
                                                    width: "130px",
                                                    fontSize: "14px !important",
                                                    color: "action",
                                                },
                                            },
                                            inputProps: {
                                                style: {
                                                    padding: 0,
                                                },
                                            },
                                        },
                                    }}
                                    onChange={(value) => {
                                        setDate(value ? value.format("YYYY-MM-DD HH:mm:ss") : null);
                                    }}
                                />
                            </LocalizationProvider>
                        )}

                        {!buttons?.filter?.hide && (
                            <Button
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: 8,
                                    py: 0.6,
                                    pl: 1,
                                    pr: 1.3,
                                    height: "max-content !important",
                                    gap: 0.5,
                                }}
                                onClick={() => setFiltersOpen((v) => !v)}
                            >
                                <FilterListIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    {buttons?.filter?.label ?? "Filters"}
                                </Typography>
                            </Button>
                        )}

                        {!buttons?.download?.hide && (
                            <Button
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: 8,
                                    py: 0.6,
                                    pl: 1,
                                    pr: 1.3,
                                    height: "max-content !important",
                                    gap: 0.5,
                                    minHeight: "30px",
                                    maxHeight: "30px",
                                }}
                                onClick={() => buttons?.download?.onClick?.()}
                                disabled={buttons?.download?.disabled}
                            >
                                {buttons?.download?.loading ? (
                                    <CircularProgress size={14} sx={{ color: "text.secondary" }} />
                                ) : (
                                    <CloudDownloadOutlinedIcon
                                        sx={{
                                            color: buttons?.download?.disabled ? "text.disabled" : "text.secondary",
                                            fontSize: 18,
                                        }}
                                    />
                                )}
                                <Typography
                                    variant="caption"
                                    color={buttons?.download?.disabled ? "text.disabled" : "text.secondary"}
                                    sx={{ fontWeight: 500 }}
                                >
                                    {buttons?.download?.label ?? "Export Excel"}
                                </Typography>
                            </Button>
                        )}

                        {renderAdditionalButtons &&
                            isValidElement(renderAdditionalButtons()) &&
                            renderAdditionalButtons()}

                        {!buttons?.add?.hide &&
                            (isValidElement(buttons?.add?.renderAddButton?.()) ? (
                                buttons?.add?.renderAddButton?.()
                            ) : (
                                <Button
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        borderRadius: 8,
                                        py: 0.6,
                                        pl: 1,
                                        pr: 1.3,
                                        height: "max-content !important",
                                        gap: 0.5,
                                        minHeight: "30px",
                                        maxHeight: "30px",
                                    }}
                                    onClick={buttons?.add?.onClick}
                                    variant="contained"
                                >
                                    <AddIcon sx={{ fontSize: 18, color: "white" }} />
                                    <Typography variant="caption" sx={{ fontWeight: 500, color: "white" }}>
                                        {!isMobile && buttons?.add?.label ? buttons?.add?.label : "New"}
                                    </Typography>
                                </Button>
                            ))}
                    </Box>

                    {filterContent && (
                        <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                            <Box
                                sx={{
                                    pt: 1,
                                    pb: 2,
                                    px: 2,
                                    borderBottom: 1,
                                    borderBottomColor: "divider",
                                    backgroundColor: "action.hover",
                                }}
                            >
                                <AdvancedDataFilter
                                    onClose={closeFilters}
                                    onApply={onFilterApply}
                                    onClear={onFilterClear}
                                >
                                    {filterContent}
                                </AdvancedDataFilter>
                            </Box>
                        </Collapse>
                    )}
                </Box>
            }
        />
    );
};
