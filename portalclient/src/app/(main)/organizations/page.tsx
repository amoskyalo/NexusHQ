"use client";

import { useDataGrid } from "@/hooks/useDataGrid";
import { PageContainer } from "@/components/containers";

const OrganizationPage = () => {
    const { render } = useDataGrid({
        url: "/api/organizations",
        grid: {
            columns: [
                { field: "name", headerName: "Organization Name", flex: 1, minWidth: 200 },
                { field: "slug", headerName: "Slug", flex: 1, minWidth: 100, copiable: true },
                { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 150, formatValueTo: "date" },
            ],
            actions: ["delete", "edit"],
        },
    });

    return (
        <PageContainer
            title="Organizations"
            description="All your organizations, in one place. Create, manage, and keep track of every organization."
        >
            {render()}
        </PageContainer>
    );
};

export default OrganizationPage;
