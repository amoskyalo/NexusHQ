"use client";

import { useState, useRef } from "react";
import {
    TextField,
    Stack,
    InputAdornment,
    Menu,
    MenuItem,
    MenuList,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { supportedCountries } from "../supported-countries";
import { PhoneInputProps } from "../types/inputs.types";
import { InputLabel } from "./InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const PhoneInput = ({
    label,
    size,
    onChange,
    info,
    overideLabelStyles,
    slotProps,
    ...rest
}: PhoneInputProps) => {
    const [country, setCountry] = useState<any>(supportedCountries[112]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState("");
    const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

    const textFieldRef = useRef<HTMLDivElement>(null);

    const handleCountryChange = (country: any) => {
        setCountry(country);
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            event,
            phone: country.phone,
            code: country.code,
            value: event.target.value,
        });
    };

    const inputSize = size ?? "small";
    const adornmentSize = inputSize === "small" ? "40px" : "56px";
    const paddingLeft = inputSize === "small" ? 1.5 : 2.5;
    const paddingRight = inputSize === "small" ? 0.5 : 1.5;

    const filteredCountries = supportedCountries.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Stack spacing={0.5} sx={{ width: "100%" }}>
            <InputLabel info={info} overideLabelStyles={overideLabelStyles}>
                {label}
            </InputLabel>
            <TextField
                fullWidth
                size={inputSize}
                onChange={handleChange}
                ref={textFieldRef}
                type="tel"
                slotProps={{
                    ...slotProps,
                    input: {
                        ...slotProps?.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Stack
                                    direction="row"
                                    alignItems={"center"}
                                    onClick={(e) => {
                                        setMenuWidth(textFieldRef.current?.offsetWidth);
                                        setAnchorEl(e.currentTarget);
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems={"center"}
                                        spacing={0.5}
                                        sx={{
                                            height: adornmentSize,
                                            paddingLeft,
                                            paddingRight,
                                            marginRight: 1,
                                            cursor: "pointer",
                                            borderRight: 1,
                                            borderColor: "divider",
                                        }}
                                    >
                                        <img
                                            src={`https://flagcdn.com/w20/${country?.code.toLowerCase()}.png`}
                                            alt={country?.label}
                                            width={25}
                                            height={25}
                                            style={{
                                                borderRadius: "50%",
                                                //objectFit: "contain",
                                            }}
                                        />
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    </Stack>
                                    {country?.phone}
                                </Stack>
                            </InputAdornment>
                        ),
                        style: {
                            paddingLeft: "0px",
                        },
                    },
                }}
                {...rest}
            />

            <Menu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                sx={{
                    "& .MuiPaper-root": {
                        marginTop: 1,
                        width: menuWidth,
                        maxHeight: 250,
                    },
                }}
            >
                <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                        placeholder="Search country..."
                        variant="standard"
                        slotProps={{ input: { disableUnderline: true, startAdornment: <SearchIcon /> } }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <Divider />

                <MenuList>
                    {filteredCountries?.map((country: any) => (
                        <MenuItem key={country.label} onClick={() => handleCountryChange(country)}>
                            <ListItemIcon>
                                <img
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={country.label}
                                    width={25}
                                    height={15}
                                    //priority
                                />
                            </ListItemIcon>
                            <ListItemText>
                                {country.label} ( {country.phone} )
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Stack>
    );
};
