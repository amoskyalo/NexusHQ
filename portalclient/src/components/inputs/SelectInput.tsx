"use client";

import React from "react";
import { SelectFieldProps } from "../types/inputs.types";
import { Select, FormHelperText, MenuItem, Stack, Typography, CircularProgress, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { InputLabel } from "./InputLabel";
import { Check } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export const SelectInput = (props: SelectFieldProps) => {
    const {
        size: inputSize,
        label,
        error,
        options = [],
        helperText,
        placeholder,
        overideLabelStyles,
        loading,
        showSearch,
        onChange,
        info,
        ...otherProps
    } = props;

    const size = inputSize ?? "small";

    function getLabel(selected: any) {
        return options.find((el) => el.value === selected)?.label;
    }

    const [searchValue, setSearchValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const filteredOptions = options.filter((option) => {
        if (searchValue) {
            return (
                option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                option.value.toString().includes(searchValue)
            );
        }
        return true;
    });

    return (
        <Stack>
            <InputLabel overideLabelStyles={overideLabelStyles} info={info}>
                {label}
            </InputLabel>
            <Select
                error={error}
                fullWidth
                size={size}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => {
                    setOpen(false);
                    setSearchValue("");
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            //minHeight: 200,
                            maxHeight: 200,
                            marginTop: 4,
                            borderRadius: 12,
                        },
                        elevation: 7,
                    },
                }}
                displayEmpty
                {...(placeholder && {
                    renderValue: (selected: unknown) => {
                        if (loading || !selected) {
                            return <Typography sx={{ fontSize: 16, color: grey[500] }}>{placeholder}</Typography>;
                        }
                        return getLabel(selected) as React.ReactNode;
                    },
                })}
                {...otherProps}
            >
                {loading ? (
                    <Stack sx={{ padding: 2 }} alignItems="center" justifyContent="center">
                        <CircularProgress size={24} />
                    </Stack>
                ) : (
                    <Stack direction="column" sx={{ overflow: "hidden", height: "100%" }}>
                        {showSearch && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    borderBottom: 1,
                                    borderColor: "divider",
                                    pt: 0.5,
                                    pb: 1,
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <SearchIcon fontSize="small" color="action" />
                                    <TextField
                                        value={searchValue ?? ""}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        autoFocus
                                        variant="standard"
                                        sx={{
                                            width: "100%",
                                            height: "20px",
                                        }}
                                        slotProps={{
                                            input: {
                                                placeholder: "Search...",
                                                disableUnderline: true,
                                                sx: {
                                                    fontSize: "14px",
                                                    height: "20px",
                                                    margin: 0,
                                                    lineHeight: 0,
                                                    padding: 0,
                                                },
                                            },
                                            htmlInput: {
                                                style: {
                                                    padding: 0,
                                                    margin: 0,
                                                },
                                            },
                                        }}
                                    />
                                </Stack>
                            </Box>
                        )}

                        <Box sx={{ flex: 1, overflow: "auto" }}>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const isSelected = option.value === otherProps.value;

                                    return (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                            onClick={() => onChange?.(option.value)}
                                            sx={{
                                                fontSize: 15,
                                            }}
                                        >
                                            {option.description ? (
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    sx={{ width: "100%" }}
                                                >
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography fontWeight={500}>{option.label}</Typography>
                                                        <Typography color="text.secondary" variant="body2">
                                                            {option?.description}
                                                        </Typography>
                                                    </Box>

                                                    {isSelected && <Check size={18} />}
                                                </Stack>
                                            ) : (
                                                option.label
                                            )}
                                        </MenuItem>
                                    );
                                })
                            ) : (
                                <Stack
                                    sx={{ paddingX: 2, paddingTop: 1, paddingBottom: 2 }}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography color="textSecondary" variant="body2">
                                        No options available!
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                )}
            </Select>
            {helperText && (
                <FormHelperText error sx={{ pl: 2 }}>
                    {helperText}
                </FormHelperText>
            )}
        </Stack>
    );
};
