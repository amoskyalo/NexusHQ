"use client";

import type { GridRowId } from "@mui/x-data-grid";
import { Grid as DataGridShell } from "@/components/datagrid/Grid";
import type { GridProps, GridModelProps, QueryParams } from "@/components/datagrid/types";
import { useGridData } from "./useGridData";
import { useGridUrlState } from "./useGridUrlState";
import { useGridSelection } from "./useGridSelection";

export type UseDataGridArgs<TData, TParams> = {
    url: string;
    grid?: GridProps<TData, TParams>;
    onAdd?: () => void;
    onEdit?: (row: any) => void;
    onDelete?: (id: GridRowId, row: any) => void;
    onAction?: (row: any) => void;
};

export type UseDataGridResult<TData, TParams> = {
    render: () => React.ReactElement | null;
    refetch: () => Promise<unknown>;
    queryparams: TParams & QueryParams;
    rows: TData[];
    pages: number | undefined;
    loading: boolean;
    selectedRows: GridRowId[];
    setSelectedRows: (rows: GridRowId[]) => void;
    clearSelection: () => void;
    fetchAllForExport: () => Promise<any[]>;
};

export const useDataGrid = <TData, TParams>(
    args: UseDataGridArgs<TData, TParams>,
): UseDataGridResult<TData, TParams> => {
    const { url, grid, onAdd, onEdit, onDelete, onAction } = args;

    const { params } = useGridUrlState({
        searchKey: { url: grid?.searchConfig?.url_key, api: grid?.searchConfig?.api_key },
        filterKeys: grid?.filter?.keys,
        defaults: grid?.params as Record<string, unknown> | undefined,
    });

    const queryparams = params as unknown as TParams & QueryParams;

    const { rows, pages, loading, refetch, fetchAllForExport } = useGridData<TData>({
        url,
        params: params as Record<string, unknown>,
    });

    const { selectedRows, setSelectedRows, clearSelection } = useGridSelection();

    const hasGrid = grid !== undefined;

    const gridProps: GridModelProps<TData, TParams> | undefined = hasGrid
        ? {
              ...grid,
              buttons: grid.buttons
                  ? {
                        ...grid.buttons,
                        add: grid.buttons.add
                            ? { ...grid.buttons.add, onClick: grid.buttons.add.onClick ?? onAdd }
                            : onAdd
                              ? { onClick: onAdd }
                              : undefined,
                    }
                  : onAdd
                    ? { add: { onClick: onAdd } }
                    : undefined,
              rows,
              onEdit,
              onDelete,
              onAction,
              selectedRows,
              setSelectedRows,
              clearSelection,
              pages,
              loading,
              fetchAllForExport,
          }
        : undefined;

    const render = () => (hasGrid && gridProps ? <DataGridShell {...gridProps} /> : null);

    return {
        render,
        refetch,
        queryparams,
        rows,
        pages,
        loading,
        selectedRows,
        setSelectedRows,
        clearSelection,
        fetchAllForExport,
    };
};
