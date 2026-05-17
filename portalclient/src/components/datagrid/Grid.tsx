import React, { useMemo, useState } from "react";
import { Box, MenuItem, Stack, Menu, Typography } from "@mui/material";
import { AppGrid } from "./components/AppGrid";
import { DatagridActions } from "./components/DatagridActions";
import { GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";
import { DatagridFooter } from "./components/DatagridFooter";
import { DatagridToolbar } from "./components/DatagridToolbar";
import { GridModelProps } from "./types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { downloadExcelFile } from "@/utils/excel";
import { useGridUrlState } from "@/hooks/useGridUrlState";
import { useCustomizeGridColumns } from "@/utils/customize-columns";
import { MultiSelectBar } from "./components/MultiSelectBar";

export const Grid = <TData, TParams>(gridProps: GridModelProps<TData, TParams>) => {
    const {
        options,
        columns,
        renderCustomOption,
        renderAdditionalButtons,
        hasActions = true,
        actionsWidth = 100,
        actionsPosition = "right",
        actionsHeaderAlign,
        checkboxSelection = true,
        showToolbar = true,
        downloadFilename,
        actions = ["edit", "delete"],
        buttons,
        onEdit,
        onDelete,
        onAction,
        rowIdKey,
        loading,
        rows,
        showDateFilters,
        searchConfig,
        pages,
        filter: filterConfig,
        multiSelect,
        selectedRows: controlledSelectedRows,
        setSelectedRows: controlledSetSelectedRows,
        clearSelection: controlledClearSelection,
        fetchAllForExport,
        ...otherProps
    } = gridProps;

    const [internalSelectedRows, setInternalSelectedRows] = useState<GridRowId[]>([]);
    const effectiveSelectedRows = controlledSelectedRows ?? internalSelectedRows;
    const effectiveSetSelectedRows = controlledSetSelectedRows ?? setInternalSelectedRows;
    const effectiveClearSelection = controlledClearSelection ?? (() => setInternalSelectedRows([]));

    const [menuRecord, setMenuRecord] = useState<any>(null);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [subAnchorEl, setSubAnchorEl] = useState<HTMLElement | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const { setSearch } = useGridUrlState({ searchKey: { url: searchConfig?.url_key } });

    const actionsColumn: (GridColDef & { mobileWidth?: number })[] = hasActions
        ? [
              {
                  field: "actions",
                  headerName: "Actions",
                  type: "actions" as const,
                  width: actionsWidth,
                  ...(actionsHeaderAlign && { headerAlign: actionsHeaderAlign }),
                  getActions: ({ id, row }: any) => [
                      ...(actions.includes("custom")
                          ? [
                                <Stack
                                    key="actions"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAction?.(row);
                                    }}
                                >
                                    {renderCustomOption?.({ id, row })}
                                </Stack>,
                            ]
                          : [
                                <DatagridActions
                                    key="actions"
                                    actions={actions}
                                    onDelete={() => onDelete?.(id, row)}
                                    onEdit={() => onEdit?.(row)}
                                    onOptions={(event: any) => {
                                        setAnchorEl(event.currentTarget);
                                        setMenuRecord(row);
                                    }}
                                />,
                            ]),
                  ],
              },
          ]
        : [];

    const updatedColumns: (GridColDef & { mobileWidth?: number })[] = useMemo(
        () => (actionsPosition === "left" ? [...actionsColumn, ...columns] : [...columns, ...actionsColumn]),
        [columns, hasActions, actionsWidth, actions, renderCustomOption, actionsPosition],
    );

    const customizedColumns = useCustomizeGridColumns(updatedColumns);

    const footer = () => <DatagridFooter loading={loading} pages={pages} />;

    const [exporting, setExporting] = useState(false);

    const handleDownload = async () => {
        if (!fetchAllForExport) {
            downloadExcelFile(rows as GridRowsProp, columns, downloadFilename);
            return;
        }
        setExporting(true);
        try {
            const allRows = await fetchAllForExport();
            downloadExcelFile((allRows.length > 0 ? allRows : rows) as GridRowsProp, columns, downloadFilename);
        } catch (err) {
            console.error("Export fetch failed; falling back to current page:", err);
            downloadExcelFile(rows as GridRowsProp, columns, downloadFilename);
        } finally {
            setExporting(false);
        }
    };

    const { download, add, ...otherBtnProps } = buttons ?? {};

    const isClientSideSearch = !searchConfig?.api_key;

    const buttonProps = {
        download: {
            ...download,
            onClick: download?.onClick ?? handleDownload,
            loading: exporting,
            disabled: rows?.length === 0 || loading || exporting,
        },
        add: {
            ...add,
        },
        filter: filterConfig?.content ? {} : { hide: true },
        ...otherBtnProps,
    };

    return (
        <>
            <Box sx={{ borderRadius: 4, backgroundColor: '#fff' }}>
                <AppGrid
                    {...otherProps}
                    loading={loading}
                    disableRowSelectionOnClick
                    disableColumnMenu={true}
                    columns={customizedColumns}
                    rows={rows}
                    getRowId={(row) => row.id ?? row?.[rowIdKey]}
                    checkboxSelection={checkboxSelection}
                    density="standard"
                    onFilterModelChange={
                        isClientSideSearch
                            ? undefined
                            : ({ quickFilterValues }) => setSearch(quickFilterValues?.[0] ?? null)
                    }
                    filterMode={isClientSideSearch ? "client" : "server"}
                    filterDebounceMs={isClientSideSearch ? 300 : 1000}
                    getRowClassName={({ indexRelativeToCurrentPage }) =>
                        indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
                    }
                    slots={{ footer, toolbar: DatagridToolbar }}
                    slotProps={{
                        toolbar: {
                            buttons: buttonProps,
                            searchConfig,
                            renderAdditionalButtons,
                            showDateFilters,
                            filterContent: filterConfig?.content,
                            onFilterApply: filterConfig?.onApply,
                            onFilterClear: filterConfig?.onClear,
                        },
                    }}
                    showToolbar={showToolbar}
                    {...(multiSelect && {
                        rowSelectionModel: { type: "include" as const, ids: new Set(effectiveSelectedRows) },
                        onRowSelectionModelChange: (model: any) => {
                            effectiveSetSelectedRows(Array.from(model.ids) as GridRowId[]);
                        },
                    })}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={() => {
                    setAnchorEl(null);
                    setSubAnchorEl(null);
                    setActiveSubmenu(null);
                    setMenuRecord(null);
                }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 150,
                            overflow: "visible",
                            border: 1,
                            borderColor: "divider",
                            mt: 0.5,
                            borderRadius: 3,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {options
                    ?.filter((item) => {
                        if (item.hidden == null) return true;
                        return typeof item.hidden === "function" ? !item.hidden(menuRecord) : !item.hidden;
                    })
                    .map((item) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const iconEl = item.icon
                            ? React.cloneElement(item.icon as any, {
                                  sx: { fontSize: 16, mr: 0.5 },
                                  ...(!(item.icon as any).props?.sx && { stroke: "currentColor", size: 16 }),
                              })
                            : null;

                        return (
                            <Box
                                sx={{
                                    paddingX: 1,
                                    borderTop: item.error ? 1 : 0,
                                    borderColor: "divider",
                                    pt: item.error ? 1 : 0,
                                    mt: item.error ? 1 : 0,
                                }}
                                key={item.name}
                            >
                                <MenuItem
                                    onClick={(e) => {
                                        if (hasChildren) {
                                            setSubAnchorEl(e.currentTarget);
                                            setActiveSubmenu(item.name);
                                        } else {
                                            setAnchorEl(null);
                                            setSubAnchorEl(null);
                                            setActiveSubmenu(null);
                                            item.onClick?.(menuRecord);
                                        }
                                    }}
                                    sx={{ px: 1, borderRadius: 2, color: item.error ? "error.main" : "inherit" }}
                                    disabled={
                                        typeof item.disabled === "function" ? item.disabled(menuRecord) : item.disabled
                                    }
                                >
                                    {iconEl}
                                    <Typography
                                        variant="body2"
                                        color={item.error ? "error" : "inherit"}
                                        sx={{ flex: 1 }}
                                    >
                                        {item.name}
                                    </Typography>
                                    {hasChildren && (
                                        <ChevronRightIcon sx={{ fontSize: 16, ml: 1, color: "text.secondary" }} />
                                    )}
                                </MenuItem>

                                {hasChildren && (
                                    <Menu
                                        anchorEl={subAnchorEl}
                                        open={activeSubmenu === item.name && Boolean(subAnchorEl)}
                                        onClose={() => {
                                            setSubAnchorEl(null);
                                            setActiveSubmenu(null);
                                        }}
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    minWidth: 120,
                                                    overflow: "visible",
                                                    border: 1,
                                                    borderColor: "divider",
                                                    borderRadius: 3,
                                                    ml: 0.5,
                                                },
                                            },
                                        }}
                                        anchorOrigin={{ horizontal: "right", vertical: "top" }}
                                        transformOrigin={{ horizontal: "left", vertical: "top" }}
                                    >
                                        {item.children!.map((child) => (
                                            <Box sx={{ paddingX: 1 }} key={child.name}>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorEl(null);
                                                        setSubAnchorEl(null);
                                                        setActiveSubmenu(null);
                                                        child.onClick?.(menuRecord);
                                                    }}
                                                    sx={{
                                                        px: 1,
                                                        borderRadius: 2,
                                                        color: child.error ? "error.main" : "inherit",
                                                    }}
                                                    disabled={
                                                        typeof child.disabled === "function"
                                                            ? child.disabled(menuRecord)
                                                            : child.disabled
                                                    }
                                                >
                                                    {child.icon &&
                                                        React.cloneElement(child.icon as any, {
                                                            sx: { fontSize: 16, mr: 0.5 },
                                                        })}
                                                    <Typography
                                                        variant="body2"
                                                        color={child.error ? "error" : "inherit"}
                                                    >
                                                        {child.name}
                                                    </Typography>
                                                </MenuItem>
                                            </Box>
                                        ))}
                                    </Menu>
                                )}
                            </Box>
                        );
                    })}
            </Menu>

            {multiSelect && effectiveSelectedRows.length > 0 && (
                <MultiSelectBar count={effectiveSelectedRows.length} onClear={effectiveClearSelection}>
                    {multiSelect.children(effectiveSelectedRows)}
                </MultiSelectBar>
            )}
        </>
    );
};
