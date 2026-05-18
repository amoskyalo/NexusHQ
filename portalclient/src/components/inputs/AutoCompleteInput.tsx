"use client";

import { Autocomplete, TextField, Stack } from "@mui/material";
import { AutocompleteFieldProps } from "../types/inputs.types";
import { InputLabel } from "./InputLabel";

export const AutocompleteField = ({
    label,
    error,
    helperText,
    size,
    placeholder,
    ...props
}: AutocompleteFieldProps) => {
    return (
        <Stack spacing={0.5}>
            <InputLabel>{label}</InputLabel>
            <Autocomplete
                {...props}
                fullWidth
                size={size ?? "small"}
                slotProps={{
                    paper: {
                        elevation: 7,
                        sx: {
                            mt: 0.5,
                            borderRadius: 3,
                            overflow: "hidden",
                        },
                    },
                    listbox: {
                        sx: {
                            maxHeight: 200,
                            py: 0,
                            "& .MuiAutocomplete-option": {
                                fontSize: 14,
                                py: 1,
                                px: 1.5,
                            },
                        },
                    },
                }}
                renderInput={(params) => (
                    <TextField error={error} helperText={helperText} {...params} placeholder={placeholder} />
                )}
            />
        </Stack>
    );
};
