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
                renderInput={(params) => (
                    <TextField error={error} helperText={helperText} {...params} placeholder={placeholder} />
                )}
            />
        </Stack>
    );
};
