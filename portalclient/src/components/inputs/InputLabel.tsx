import { InputLabel as MuiInputLabel, InputLabelProps, Tooltip } from "@mui/material";
import { TextInputProps } from "../types/inputs.types";
import { Info } from "lucide-react";

type Props = InputLabelProps & Pick<TextInputProps, "overideLabelStyles" | "info">;

export const InputLabel = ({ overideLabelStyles, children, info, ...props }: Props) => {
    return (
        <MuiInputLabel
            sx={{
                mb: 0.5,
                color: "text.secondary",
                fontSize: 14,
                fontWeight: 500,
                textWrap: "wrap",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexDirection: "row",
                ...overideLabelStyles,
            }}
            {...props}
        >
            {children}
            {info && (
                <Tooltip title={info}>
                    <Info size={12} style={{ opacity: 0.8, cursor: "pointer" }} />
                </Tooltip>
            )}
        </MuiInputLabel>
    );
};
