"use client";

import { Stack, Typography, Box, InputAdornment } from "@mui/material";
import { TextInput } from "@/components/inputs/TextInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Formik, Form } from "formik";
import { useSignIn } from "../_lib/auth.api";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { getValidationSchema } from "@/utils/validationSchema";
import { Mail, LockKeyhole } from "lucide-react";
import { SignInInitialValues } from "../_types/auth.types";
import Link from "next/link";

const SignInForm = () => {
    const { handleSignIn, loading } = useSignIn();

    const initialValues: SignInInitialValues = {
        email: "",
        password: "",
    };

    const validationSchema = getValidationSchema([
        { type: "string", name: "email", errorMessage: "Email address is required" },
        { type: "string", name: "password", errorMessage: "Password is required" },
    ]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
            validateOnBlur={false}
        >
            {(formik) => (
                <Box sx={{ width: "100%" }}>
                    <Form>
                        <Stack spacing={2}>
                            <TextInput
                                label="Email"
                                placeholder="Enter your email address"
                                startAdornment={<Mail />}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: "primary.main" }}>
                                                <Mail size={16} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                {...getFormikFieldProps({ formik, field: "email" })}
                            />
                            <Box sx={{ textAlign: "right" }}>
                                <TextInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    isPassword
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: "primary.main" }}>
                                                    <LockKeyhole size={16} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    {...getFormikFieldProps({ formik, field: "password" })}
                                />
                                <Typography variant="caption" sx={{ cursor: "pointer", color: "primary.light" }}>
                                    Forgot password?
                                </Typography>
                            </Box>
                        </Stack>

                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, color: "white" }}
                        >
                            Log In
                        </LoadingButton>

                        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                            Don't have an account?{" "}
                            <Typography
                                component={Link}
                                href="/auth/signup"
                                variant="body2"
                                sx={{ color: "primary.light", textDecoration: "none" }}
                            >
                                Sign Up
                            </Typography>
                        </Typography>
                    </Form>
                </Box>
            )}
        </Formik>
    );
};

export default SignInForm;
