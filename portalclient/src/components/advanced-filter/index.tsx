"use client";

import { Box, Stack, Typography, IconButton, Button } from "@mui/material";
import { X } from "lucide-react";

type AdvancedFiltersProps = {
    children?: React.ReactNode;
    onClose?: () => void;
    onApply?: () => void;
    onClear?: () => void;
};

export const AdvancedDataFilter = ({ children, onClose, onApply, onClear }: AdvancedFiltersProps) => {
    return (
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500}>
                    Filter by
                </Typography>
                {onClose && (
                    <IconButton onClick={onClose} size="small">
                        <X size={18} />
                    </IconButton>
                )}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-end" flexWrap="wrap">
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        "& > *": { flex: "0 0 150px", minWidth: 150, maxWidth: 200 },
                    }}
                >
                    {children}
                </Box>
                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ color: "white", borderRadius: 99, py: 0.6 }}
                        onClick={() => onApply?.()}
                        size="small"
                    >
                        Apply
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: 99, py: 0.6 }}
                        onClick={() => onClear?.()}
                        size="small"
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
