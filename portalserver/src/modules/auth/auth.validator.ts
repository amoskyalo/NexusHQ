import * as z from "zod";

export const loginValidator = z.object({
    body: z.object({
        email: z.string().trim().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
    }),
});

export const signupValidator = z.object({
    body: z.object({
        firstName: z.string().trim().min(1, "First name is required"),
        lastName: z.string().trim().min(1, "Last name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        phoneNumber: z.string().optional(),
    }),
});

export type UserType = z.infer<typeof signupValidator>["body"];
