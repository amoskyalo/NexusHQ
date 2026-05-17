import * as z from "zod";

export const createOrganizationValidator = z.object({
    body: z.object({
        name: z.string().trim().min(2, "Organization name is required"),
        slug: z.string().trim().min(5, "Organization slug is required"),
        modules: z.array(z.enum(["HR", "FINANCE", "TECH", "AGILE"])),
        industry: z.string().trim().min(1, "Industry category is required"),
    }),
});

export type OrganizationType = z.infer<typeof createOrganizationValidator>["body"];
