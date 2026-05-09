"use client";

import { Tooltip, Typography, TypographyProps } from "@mui/material";
import { Copy } from "lucide-react";
import { useState } from "react";

export const CopiableText = ({ children, copiable = true, ...props }: TypographyProps & { copiable?: boolean }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children as string);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Typography
            {...props}
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                ...props.sx,
            }}
        >
            {children}
            {copiable && (
                <Tooltip title={copied ? "Copied" : "Copy"}>
                    <Typography
                        variant="body2"
                        component="span"
                        sx={{ cursor: "pointer", mt: "6px !important", opacity: 0.8 }}
                        onClick={handleCopy}
                    >
                        <Copy size={14} />
                    </Typography>
                </Tooltip>
            )}
        </Typography>
    );
};
