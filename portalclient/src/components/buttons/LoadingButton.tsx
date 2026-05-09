import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

export const LoadingButton = ({
    loading,
    sx,
    ...props
}: ButtonProps & {
    loading: boolean;
}) => {
    return (
        <Button
            disabled={loading}
            {...props}
            startIcon={loading ? <CircularProgress size={14} color="inherit" /> : props.startIcon}
            sx={{
                minWidth: 100,
                fontWeight: 400,
                py: 1,
                ...sx,
            }}
        />
    );
};
