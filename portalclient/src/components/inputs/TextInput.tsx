"use client";

import { Box, InputAdornment, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { InputLabel } from "./InputLabel";
import { TextInputProps } from "../types/inputs.types";
import { Eye, EyeOff } from "lucide-react";

export const TextInput = ({
    label,
    isPassword,
    isCurrency,
    multiline,
    rows,
    overideLabelStyles,
    info,
    slotProps,
    value,
    sx,
    ...props
}: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box>
            <InputLabel overideLabelStyles={overideLabelStyles} info={info}>
                {label}
            </InputLabel>
            <TextField
                fullWidth
                type={isPassword && !showPassword ? "password" : props.type || "text"}
                size="small"
                value={value ?? ""}
                multiline={multiline}
                rows={multiline ? rows || 4 : undefined}
                slotProps={{
                    input: {
                        ...slotProps?.input,
                        endAdornment:
                            isPassword && !multiline ? (
                                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={20}/> : <Eye size={20} />}
                                    </IconButton>
                                </InputAdornment>
                            ) : (
                                (slotProps?.input as any)?.endAdornment
                            ),
                        startAdornment: isCurrency ? (
                            <InputAdornment position="start">KES</InputAdornment>
                        ) : (
                            (slotProps?.input as any)?.startAdornment
                        ),
                    },
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        minHeight: multiline ? "110px" : (sx as any)?.height,
                        height: (sx as any)?.height,
                        ...(multiline ? { borderRadius: "16px" } : {}),
                    },
                    ...sx,
                }}
                {...props}
            />
        </Box>
    );
};
