"use client";

import { useState } from "react";
import { useDataGrid } from "@/hooks/useDataGrid";
import { PageContainer } from "@/components/containers";
import { OrgFormDialog } from "./_components/OrgFormDialog";
import { ModuleBadges } from "./_components/ModuleBadges";
import type { OrganizationType } from "@/context";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const OrganizationPage = () => {
    const [open, setOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<OrganizationType | undefined>(undefined);

    const openCreate = () => {
        setEditingOrg(undefined);
        setOpen(true);
    };

    const openEdit = (row: OrganizationType) => {
        setEditingOrg(row);
        setOpen(true);
    };

    const { render, refetch } = useDataGrid({
        url: "/api/organizations",
        onAdd: openCreate,
        onEdit: openEdit,
        grid: {
            columns: [
                {
                    field: "name",
                    headerName: "Organization Name",
                    flex: 1,
                    minWidth: 250,
                    renderCell: ({ row }) => {
                        return (
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Avatar sx={{ height: 28, width: 28, fontSize: 12 }}>AO</Avatar>
                                <Box>
                                    <Typography variant="body2">{row.name}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ lineHeight: 1, fontSize: 12, color: "text.secondary" }}
                                    >
                                        {`${row.slug}.nexushq.org`}
                                    </Typography>
                                </Box>
                            </Stack>
                        );
                    },
                },
                { field: "employees", headerName: "Total employees", flex: 1, minWidth: 100 },
                { field: "industry", headerName: "Industry", flex: 1, minWidth: 100 },
                {
                    field: "modules",
                    headerName: "Modules",
                    flex: 1,
                    minWidth: 200,
                    sortable: false,
                    renderCell: ({ row }) => <ModuleBadges modules={row.modules ?? []} />,
                },
                { field: "departments", headerName: "Total departments", flex: 1, minWidth: 100 },
                { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 150, formatValueTo: "date", showTime: false },
            ],
        },
    });

    return (
        <PageContainer
            title="Organizations"
            description="All your organizations, in one place. Create, manage, and keep track of every organization."
        >
            {render()}

            <OrgFormDialog
                open={open}
                editingOrg={editingOrg}
                onClose={() => setOpen(false)}
                onSubmitted={() => refetch()}
            />
        </PageContainer>
    );
};

export default OrganizationPage;
