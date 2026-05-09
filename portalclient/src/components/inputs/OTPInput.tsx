"use client";

import { TextField, Stack, FormHelperText } from "@mui/material";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { OTPFieldProps } from "../types/inputs.types";
import { InputLabel } from "./InputLabel";

export const OTPInput = ({
    length,
    label,
    size,
    error,
    helperText,
    onChange,
    onAutoVerify,
    ...rest
}: OTPFieldProps & { onAutoVerify?: () => void }) => {
    const totalLength = useMemo(() => length ?? 4, [length]);
    const [otp, setOtp] = useState<string[]>(() => Array(totalLength).fill(""));
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const inputSize = size ?? "small";
    const inputWidth = inputSize === "small" ? "40px" : "56px";
    const helper = helperText ?? "Enter the verification code sent to you";

    const handleChange = useCallback(
        (index: number, value: string) => {
            const sanitizedValue = value.slice(-1);

            setOtp((prev) => {
                const newOtp = [...prev];
                newOtp[index] = sanitizedValue;
                return newOtp;
            });

            if (sanitizedValue !== "") {
                if (index !== totalLength - 1) {
                    inputRefs.current[index + 1]?.focus();
                    setFocusedIndex(index + 1);
                } else {
                    inputRefs.current[index]?.blur();
                    setFocusedIndex(0);
                }
            } else if (index !== 0) {
                inputRefs.current[index - 1]?.focus();
                setFocusedIndex(index - 1);
            }
        },
        [totalLength]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent, currentIndex: number) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData("text");
            const pastedChars = pastedData.split("").slice(0, totalLength);

            if (pastedChars.length > 0) {
                setOtp((prev) => {
                    const newOtp = [...prev];
                    pastedChars.forEach((char, index) => {
                        if (currentIndex + index < totalLength) {
                            newOtp[currentIndex + index] = char;
                        }
                    });
                    return newOtp;
                });

                const nextFocusIndex = Math.min(currentIndex + pastedChars.length, totalLength - 1);
                setTimeout(() => {
                    inputRefs.current[nextFocusIndex]?.focus();
                    setFocusedIndex(nextFocusIndex);
                }, 0);
            }
        },
        [totalLength]
    );

    const handleFocus = useCallback((index: number) => {
        setFocusedIndex(index);
    }, []);

    useEffect(() => {
        if (typeof onChange === "function") {
            const timeoutId = setTimeout(() => {
                onChange(otp.join(""));
            }, 50);
            return () => clearTimeout(timeoutId);
        }
    }, [otp, onChange]);

    useEffect(() => {
        const completeCode = otp.join("");
        if (completeCode.length === 6 && totalLength === 6 && onAutoVerify) {
            const hasAllDigits = otp.every((digit) => digit !== "");
            if (hasAllDigits) {
                setTimeout(() => {
                    onAutoVerify();
                }, 100);
            }
        }
    }, [otp, totalLength, onAutoVerify]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            const focusedInputEmpty = !otp[focusedIndex];
            const isFirstInput = focusedIndex === 0;
            const isLastInput = focusedIndex === totalLength - 1;
            const arrowLeftIndex = focusedIndex - 1;
            const arrowRightIndex = focusedIndex + 1;

            if (key === "ArrowLeft") {
                if (isFirstInput) {
                    e.preventDefault();
                    return;
                }

                const leftInput = inputRefs.current[arrowLeftIndex];
                if (leftInput) {
                    leftInput.focus();
                    setTimeout(() => {
                        leftInput.setSelectionRange(1, 1);
                    }, 0);
                    setFocusedIndex(arrowLeftIndex);
                }
            } else if (key === "ArrowRight" && !focusedInputEmpty && !isLastInput) {
                const rightInput = inputRefs.current[arrowRightIndex];
                if (rightInput) {
                    rightInput.focus();
                    setFocusedIndex(arrowRightIndex);
                }
            } else if (key === "Backspace" && focusedInputEmpty && !isFirstInput) {
                const leftInput = inputRefs.current[arrowLeftIndex];
                if (leftInput) {
                    leftInput.focus();
                    setFocusedIndex(arrowLeftIndex);
                    setOtp((prev) => {
                        const newOtp = [...prev];
                        newOtp[arrowLeftIndex] = "";
                        return newOtp;
                    });
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [focusedIndex, otp, totalLength]);

    return (
        <Stack spacing={1}>
            <InputLabel>{label}</InputLabel>

            <Stack direction="row" spacing={1}>
                {Array.from({ length: totalLength }).map((_, index) => (
                    <TextField
                        key={index}
                        value={otp[index]?.toUpperCase() || ""}
                        size={inputSize}
                        error={error}
                        placeholder="-"
                        inputRef={(ref) => ref && (inputRefs.current[index] = ref)}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onPaste={(e) => handlePaste(e, index)}
                        onFocus={() => handleFocus(index)}
                        onClick={(e) => e.currentTarget.blur()}
                        slotProps={{
                            htmlInput: {
                                maxLength: 1,
                                style: { textAlign: "center" },
                            },
                            input: {
                                style: {
                                    width: inputWidth,
                                    pointerEvents: index !== 0 && !otp[index - 1] ? "none" : "auto",
                                },
                            },
                        }}
                        {...rest}
                    />
                ))}
            </Stack>
            <FormHelperText error={error}>{helper}</FormHelperText>
        </Stack>
    );
};
