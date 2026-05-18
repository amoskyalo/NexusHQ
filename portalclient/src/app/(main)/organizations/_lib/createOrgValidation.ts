import type { StringSchema, ArraySchema } from "yup";
import { getValidationSchema } from "@/utils";

export const createOrgValidationSchema = getValidationSchema([
    {
        name: "name",
        type: "string",
        errorMessage: "Organization name is required",
        extend: (schema) =>
            (schema as StringSchema).trim().min(2, "Organization name must be at least 2 characters"),
    },
    {
        name: "slug",
        type: "string",
        errorMessage: "Slug is required",
        extend: (schema) => (schema as StringSchema).trim().min(5, "Slug must be at least 5 characters"),
    },
    {
        name: "industry",
        type: "string",
        errorMessage: "Please select an industry",
    },
    {
        name: "modules",
        type: "array",
        errorMessage: "Pick at least one module",
        extend: (schema) => (schema as ArraySchema<string[], object>).min(1, "Pick at least one module"),
    },
]);
