"use client";

import { useRef, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { InputLabel } from "./InputLabel";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface FileInputProps {
    label?: string;
    accept?: string;
    value?: File | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    overideLabelStyles?: any;
    placeholder?: string;
    compact?: boolean;
}

export const FileInput = ({ label, accept, value, onChange, error, helperText, overideLabelStyles, placeholder, compact }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.files?.[0]?.name || "");
        onChange?.(e);
    };

    const displayName = value?.name || fileName;

    return (
        <Box>
            {label && <InputLabel overideLabelStyles={overideLabelStyles}>{label}</InputLabel>}
            <TextField
                size="small"
                variant={compact ? "standard" : "outlined"}
                value={displayName}
                placeholder={placeholder || "Choose file..."}
                onClick={() => inputRef.current?.click()}
                error={error}
                helperText={helperText}
                sx={compact ? {
                    border: 1,
                    borderColor: "divider",
                    borderRadius: "50px",
                    px: 1,
                    pt: 0.7,
                    pb: 0.4,
                    "& .MuiInputBase-root": { height: "24px", fontSize: 14 },
                    "& .MuiInputBase-input": { fontSize: 14, cursor: "pointer" },
                } : undefined}
                slotProps={{
                    input: {
                        readOnly: true,
                        sx: { cursor: "pointer" },
                        ...(compact ? { disableUnderline: true } : {}),
                        endAdornment: (
                            <InputAdornment position="end">
                                <AttachFileIcon sx={{ fontSize: compact ? 16 : 18, color: "text.secondary", cursor: "pointer" }} />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <input ref={inputRef} type="file" accept={accept} onChange={handleChange} hidden />
        </Box>
    );
};
