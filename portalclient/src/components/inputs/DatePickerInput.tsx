"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputLabel, Stack } from "@mui/material";
import { DatePickerFieldProps } from "../types/inputs.types";

export const DatePickerInput = ({ label, error, helperText, ...props }: DatePickerFieldProps) => {
    return (
        <Stack spacing={0.5} sx={{ width: "100%" }}>
            <InputLabel
                sx={{
                    mb: 1,
                    opacity: 0.9,
                    fontSize: 14,
                }}
            >
                {label}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    {...props}
                    sx={{
                        ".MuiPickersInputBase-root": {
                            borderRadius: "3.125rem !important",
                            minHeight: "2.5rem !important",
                            boxShadow: "0 0 0 0 transparent !important",
                            transition: "box-shadow 0.2s ease-in-out, border-color 0.15s ease-in-out !important",
                            "&:hover *": {
                                borderColor: "rgba(0, 0, 0, 0.2) !important",
                            },
                            "&.Mui-focused": {
                                boxShadow:
                                    "0 0 0 0.0625rem rgba(0, 0, 0, 0.23), 0 0 0 0.25rem rgba(0, 0, 0, 0.1) !important",
                            },
                            "&.Mui-focused *": {
                                borderColor: "transparent !important",
                                borderWidth: "0.0625rem !important",
                            },
                        },
                    }}
                    slotProps={{
                        openPickerIcon: {
                            color: "action",
                            sx: { fontSize: 18 },
                        },
                        openPickerButton: {
                            sx: {
                                padding: 0,
                                margin: 0,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    transform: "none",
                                },
                            },
                        },
                        textField: {
                            size: "small",
                            fullWidth: true,
                            error,
                            helperText,
                        },
                    }}
                />
            </LocalizationProvider>
        </Stack>
    );
};