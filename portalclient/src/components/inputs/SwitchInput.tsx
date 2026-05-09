import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 40,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        marginLeft: 3,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#009fe3" : "#000000",
                opacity: 1,
                border: 0,
                ...theme.applyStyles("dark", {
                    backgroundColor: theme.palette.mode === "dark" ? "#009fe3" : "#000000",
                }),
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: theme.palette.mode === "dark" ? "#009fe3" : "#fff",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.palette.grey[100],
            ...theme.applyStyles("dark", {
                color: theme.palette.grey[600],
            }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.7,
            ...theme.applyStyles("dark", {
                opacity: 0.3,
            }),
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 19,
        height: 19,
    },
    "& .MuiSwitch-track": {
        borderRadius: 24 / 2,
        backgroundColor: "#E9E9EA",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
        ...theme.applyStyles("dark", {
            backgroundColor: "#39393D",
        }),
    },
}));

type SwitchInputProps = {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
};

export const SwitchInput = ({ label, checked, onChange }: SwitchInputProps) => {
    const switchElement = <IOSSwitch checked={checked} onChange={(_, val) => onChange?.(val)} />;

    if (!label) return switchElement;

    return <FormControlLabel control={switchElement} label={label} />;
};
