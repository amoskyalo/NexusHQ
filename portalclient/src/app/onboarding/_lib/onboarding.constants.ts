export const INDUSTRY_OPTIONS = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance & Banking" },
    { value: "healthcare", label: "Healthcare" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "education", label: "Education" },
    { value: "real_estate", label: "Real Estate" },
    { value: "consulting", label: "Consulting" },
    { value: "media", label: "Media & Entertainment" },
    { value: "hospitality", label: "Hospitality" },
    { value: "logistics", label: "Logistics & Transport" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "other", label: "Other" },
];

export const ROLE_OPTIONS = [
    { value: "ADMIN", label: "Admin" },
    { value: "FINANCE", label: "Finance" },
    { value: "MARKETING", label: "Marketing" },
    { value: "IT", label: "IT" },
];

export const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
