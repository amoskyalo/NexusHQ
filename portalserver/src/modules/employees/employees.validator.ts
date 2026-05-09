import * as z from "zod";

export const createEmployeeValidator = z.object({
    body: z.object({
        email: z.email("Invalid email address"),
        firstName: z.string("First name should be a string").trim().min(1, "First name is required"),
        lastName: z.string("Last name should be a string").trim().min(1, "Last name is required"),
        phoneNumber: z.string("Phone number should be a string").trim().min(1, "Phone number is required"),
    }),
});

export type EmployeeType = z.infer<typeof createEmployeeValidator>["body"];
