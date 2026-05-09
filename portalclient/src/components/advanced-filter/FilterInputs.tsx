"use client";

import { useState } from "react";
import { Box, Button, MenuItem, TextField, Menu } from "@mui/material";
import { ChevronDown, Check } from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import dayjs from "dayjs";
import { InputLabel } from "../inputs";

const containerSx = {
    border: 1,
    borderColor: "divider",
    borderRadius: "16px",
    px: 1,
};

// ── FilterSelect ────────────────────────────────────────────────────

type FilterSelectProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
    fullWidth?: boolean;
    overideLabelStyles?: any;
};

export const FilterSelect = ({ label, value, onChange, options, placeholder, fullWidth = true, overideLabelStyles }: FilterSelectProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder ?? "Select...";

    return (
        <Box sx={{ flex: fullWidth ? 1 : "none" }}>
            {label && <InputLabel overideLabelStyles={overideLabelStyles}>{label}</InputLabel>}
            <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                fullWidth={fullWidth}
                sx={{
                    ...containerSx,
                    justifyContent: "space-between",
                    textTransform: "none",
                    color: "text.primary",
                    fontSize: 14,
                    fontWeight: 400,
                    height: "34px",
                    px: 1.5,
                   // "&:hover": { borderColor: "text.secondary", backgroundColor: "action.hover" },
                }}
                endIcon={<ChevronDown size={16} strokeWidth={1.5} />}
            >
                {selectedLabel}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: anchorEl?.offsetWidth,
                            borderRadius: 2,
                            border: 1,
                            borderColor: "divider",
                            mt: 0.5,
                            maxHeight: 200,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
                {options.map((opt) => (
                    <Box sx={{ px: 0.5 }} key={opt.value}>
                        <MenuItem
                            selected={opt.value === value}
                            onClick={() => {
                                onChange(opt.value);
                                setAnchorEl(null);
                            }}
                            sx={{
                                fontSize: 14,
                                borderRadius: 1.5,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                        >
                            {opt.label}
                            {opt.value === value && <Check size={14} />}
                        </MenuItem>
                    </Box>
                ))}
            </Menu>
        </Box>
    );
};

// ── FilterTextInput ─────────────────────────────────────────────────

type FilterTextInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    fullWidth?: boolean;
    overideLabelStyles?: any;
};

export const FilterTextInput = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    fullWidth = true,
    overideLabelStyles,
}: FilterTextInputProps) => (
    <Box sx={{ flex: fullWidth ? 1 : "none" }}>
        {label && <InputLabel overideLabelStyles={overideLabelStyles}>{label}</InputLabel>}
        <TextField
            size="small"
            variant="standard"
            fullWidth={fullWidth}
            type={type}
            value={value}
            sx={{
                ...containerSx,
                pt: 0.7,
                pb: 0.4,
                "& .MuiInputBase-root": { height: "24px", fontSize: 14 },
                "& .MuiInputBase-input": { fontSize: 14 },
            }}
            slotProps={{ input: { disableUnderline: true } }}
            placeholder={placeholder}
            onChange={({ target }) => onChange(target.value)}
        />
    </Box>
);

// ── FilterDateInput ─────────────────────────────────────────────────

type FilterDateInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    fullWidth?: boolean;
    overideLabelStyles?: any;
};

export const FilterDateInput = ({ label, value, onChange, fullWidth = true, overideLabelStyles }: FilterDateInputProps) => (
    <Box sx={{ flex: 1 }}>
        {label && <InputLabel overideLabelStyles={overideLabelStyles}>{label}</InputLabel>}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value ? dayjs(value) : null}
                onChange={(newValue) => onChange(newValue ? newValue.format("YYYY-MM-DD") : "")}
                sx={{
                    width: fullWidth ? "100%" : "auto",
                    ...containerSx,
                    pt: 0.5,
                    pr: 0.7,
                    "& .MuiPickersSectionList-section": { fontSize: 14 },
                }}
                slots={{ openPickerIcon: CalendarMonthOutlinedIcon }}
                slotProps={{
                    openPickerIcon: { sx: { fontSize: 18, color: "text.secondary", mb: 0.5 } },
                    openPickerButton: {
                        sx: { padding: 0, "&:hover": { backgroundColor: "transparent" } },
                    },
                    textField: {
                        variant: "standard",
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                            disableUnderline: true,
                            style: { height: "28px", fontSize: 18 },
                        },
                        inputProps: { style: { padding: 0 } },
                    },
                }}
            />
        </LocalizationProvider>
    </Box>
);
