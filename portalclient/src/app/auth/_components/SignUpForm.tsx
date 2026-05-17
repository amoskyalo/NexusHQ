"use client";

import { Stack, Typography, Box, InputAdornment, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { TextInput } from "@/components/inputs/TextInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Formik, Form } from "formik";
import { useSignUp } from "../_lib/auth.api";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { getValidationSchema } from "@/utils/validationSchema";
import { Mail, LockKeyhole, User } from "lucide-react";
import { PhoneInput } from "@/components/inputs";
import type { SignUpInitialValues } from "../_types/auth.types";
import type React from "react";
import Link from "next/link";

const startIcon = (Icon: React.ComponentType<{ size?: number }>) => ({
    input: {
        startAdornment: (
            <InputAdornment position="start" sx={{ color: "primary.main" }}>
                <Icon size={16} />
            </InputAdornment>
        ),
    },
});

const SignUpForm = () => {
    const { handleSignUp, loading } = useSignUp();

    const initialValues: SignUpInitialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirm: "",
        phoneNumber: "",
        acceptPrivacy: false,
    };

    const validationSchema = getValidationSchema([
        { type: "string", name: "firstName", errorMessage: "First name is required" },
        { type: "string", name: "lastName", errorMessage: "Last name is required" },
        { type: "email", name: "email", errorMessage: "Email address is required" },
        { type: "phone_number", name: "phoneNumber", errorMessage: "Phone number is required" },
        { type: "password", name: "password", errorMessage: "Password is required" },
        {
            type: "password",
            name: "password_confirm",
            errorMessage: "Please confirm your password",
            extend: (schema, yup) =>
                (schema as any).oneOf([yup.ref("password")], "Passwords do not match"),
        },
    ]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
            validateOnBlur={false}
        >
            {(formik) => (
                <Box sx={{ width: "100%" }}>
                    <Form>
                        <Stack spacing={2}>
                            <Grid container rowSpacing={3} columnSpacing={2}>
                                <Grid size={6}>
                                    <TextInput
                                        label="First Name"
                                        placeholder="Enter your first name"
                                        slotProps={startIcon(User)}
                                        {...getFormikFieldProps({ formik, field: "firstName" })}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <TextInput
                                        label="Last Name"
                                        placeholder="Enter your last name"
                                        slotProps={startIcon(User)}
                                        {...getFormikFieldProps({ formik, field: "lastName" })}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <TextInput
                                        label="Email"
                                        placeholder="Enter your email address"
                                        slotProps={startIcon(Mail)}
                                        {...getFormikFieldProps({ formik, field: "email" })}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <PhoneInput
                                        label="Phone Number"
                                        placeholder=""
                                        {...getFormikFieldProps({ formik, field: "phoneNumber", isPhone: true })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <TextInput
                                        label="Password"
                                        placeholder="Enter your password"
                                        isPassword
                                        slotProps={startIcon(LockKeyhole)}
                                        {...getFormikFieldProps({ formik, field: "password" })}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <TextInput
                                        label="Confirm Password"
                                        placeholder="Re-enter your password"
                                        isPassword
                                        slotProps={startIcon(LockKeyhole)}
                                        {...getFormikFieldProps({ formik, field: "password_confirm" })}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={formik.values.acceptPrivacy}
                                                onChange={(e) =>
                                                    formik.setFieldValue("acceptPrivacy", e.target.checked)
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" color="text.secondary">
                                                I have read and agreed to the{" "}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: "primary.light", cursor: "pointer" }}
                                                >
                                                    Privacy Policy
                                                </Typography>
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Stack>

                        <LoadingButton
                            type="submit"
                            loading={loading}
                            disabled={loading || !formik.values.acceptPrivacy}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 4, color: "white" }}
                        >
                            Sign Up
                        </LoadingButton>

                        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                            Already have an account?{" "}
                            <Typography
                                component={Link}
                                href="/auth/signin"
                                variant="body2"
                                sx={{ color: "primary.light", textDecoration: "none" }}
                            >
                                Sign In
                            </Typography>
                        </Typography>
                    </Form>
                </Box>
            )}
        </Formik>
    );
};

export default SignUpForm;
