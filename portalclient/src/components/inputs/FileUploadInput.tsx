"use client";

import { Stack, Box, Typography, SxProps, alpha, useTheme } from "@mui/material";
import { InputLabel } from "./InputLabel";
import { CloudUpload } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const FileUploadInput = ({
    inputSx,
    containerSx,
    label,
    allowedFileTypes,
    onChange,
    error,
    helperText,
    value,
}: {
    inputSx?: Omit<SxProps, "border" | "borderColor" | "borderRadius" | "borderStyle" | "p" | "pr">;
    containerSx?: SxProps;
    label?: string;
    allowedFileTypes?: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string | false;
    value?: File | null;
}) => {
    const { palette } = useTheme();
    const [internalName, setInternalName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;
    const fileName = isControlled ? (value?.name ?? "") : internalName;

    const allowedFiles = allowedFileTypes?.join(", ") || "PDF, JPG, PNG, JPEG";

    useEffect(() => {
        if (isControlled && !value && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [isControlled, value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!isControlled) setInternalName(file.name);
            onChange?.(event);
        }
    };

    return (
        <Box sx={containerSx}>
            {label && <InputLabel>{label}</InputLabel>}
            <Stack
                component="label"
                sx={{
                    border: 1,
                    borderColor: error ? "error.main" : "divider",
                    borderRadius: 3,
                    borderStyle: "dashed",
                    p: 1.5,
                    pl: 0.5,
                    pr: 1,
                    cursor: "pointer",
                    ...inputSx,
                }}
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <input
                    type="file"
                    hidden
                    ref={inputRef}
                    accept={allowedFiles}
                    onChange={handleFileChange}
                />
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: alpha(palette.primary.main, 0.2),
                        borderRadius: "50%",
                        height: 40,
                        width: 40,
                    }}
                >
                    <CloudUpload size={20} style={{ opacity: 0.7, color: palette.primary.main }} />
                </Stack>
                <Box sx={{ flex: 1 }}>
                    {fileName ? (
                        <Typography variant="body2" color="primary" fontWeight="medium">
                            {fileName}
                        </Typography>
                    ) : (
                        <Typography variant="body2">
                            <Typography variant="body2" fontWeight="medium" component="span" color="primary">
                                Choose file
                            </Typography>{" "}
                            or drag and drop
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mt: 0.2 }}>
                        Supported formats{" "}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500, fontSize: 12 }}
                            component="span"
                        >
                            {allowedFiles}.
                        </Typography>
                    </Typography>
                </Box>
            </Stack>
            {error && helperText && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};
