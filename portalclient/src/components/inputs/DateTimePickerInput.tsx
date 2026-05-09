"use client";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { InputLabel } from "./InputLabel";
import { DateTimePickerFieldProps } from "../types/inputs.types";

export const DateTimePickerInput = ({ label, error, helperText, ...props }: DateTimePickerFieldProps) => {
    return (
        <Box>
            <InputLabel>{label}</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
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
                    // slotProps={{
                    //     openPickerButton: {
                    //         sx: {
                    //             padding: 0,
                    //             margin: 0,
                    //             "&:hover": {
                    //                 backgroundColor: "transparent",
                    //                 transform: "none",
                    //             },
                    //         },
                    //     },
                    //     textField: {
                    //         fullWidth: true,
                    //         error,
                    //         helperText,
                    //     },
                    // }}
                />
            </LocalizationProvider>
        </Box>
    );
};
