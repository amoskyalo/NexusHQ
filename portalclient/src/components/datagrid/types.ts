import { DataGridProps, GridColDef, GridRowId, ToolbarPropsOverrides } from "@mui/x-data-grid";
import { ReactNode } from "react";

export type MultiSelectConfig = {
    children: (selectedRows: GridRowId[]) => ReactNode;
};

export type SearchConfig = {
    url_key?: string;
    api_key?: string;
    placeholder?: string;
};

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        renderAdditionalButtons?: () => React.ReactNode;
        showDateFilters?: boolean;
        searchConfig?: SearchConfig;
        filterContent?: React.ReactNode;
        onFilterApply?: () => void;
        onFilterClear?: () => void;
        buttons?: {
            download?: {
                hide?: boolean;
                label?: string;
                disabled?: boolean;
                loading?: boolean;
                /**
                 * Click handler for the toolbar download button.
                 * Default (set by Grid): fetch full dataset via Apollo + downloadExcelFile.
                 * Override on the page for server-side filtered downloads (date-range modal etc).
                 */
                onClick?: () => void;
            };
            add?: {
                hide?: boolean;
                label?: string;
                onClick?: () => void;
                renderAddButton?: () => React.ReactNode;
            };
            filter?: {
                hide?: boolean;
                label?: string;
                onClick?: (val: any) => void;
            };
        };
    }
}

export type DataGridToolbarProps = Pick<
    ToolbarPropsOverrides,
    | "renderAdditionalButtons"
    | "showDateFilters"
    | "searchConfig"
    | "buttons"
    | "filterContent"
    | "onFilterApply"
    | "onFilterClear"
>;

export type DataGridFooterProps = {
    loading?: boolean;
    pages?: number;
    justifyContent?: "flex-start" | "flex-end" | "center";
    hideRowSizeSelector?: boolean;
    size?: "small" | "medium";
    showFirstButton?: boolean;
    showLastButton?: boolean;
    shape?: "rounded" | "circular";
};

export type DataGridActionsProps = {
    actions?: Array<"edit" | "delete" | "options" | "custom">;
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: (args: any) => void;
};

export type GridOption = {
    name: string;
    onClick?: (args: any) => void;
    icon?: ReactNode;
    disabled?: boolean | ((args: any) => boolean);
    hidden?: boolean | ((args: any) => boolean);
    error?: boolean;
    children?: GridOption[];
};

type AppGridColumnBase = GridColDef & {
    mobileWidth?: number;
    copiable?: boolean;
    filterSelectOptions?: { label: string; value: string }[];
};

/**
 * Column variants are discriminated by `formatValueTo` so format-specific
 * props (e.g. `showTime` for dates) are only allowed on the matching variant.
 */
export type AppGridColumn =
    | (AppGridColumnBase & { formatValueTo?: undefined })
    | (AppGridColumnBase & { formatValueTo: "currency" })
    | (AppGridColumnBase & { formatValueTo: "date"; showTime?: boolean });

export type GridProps<_TData, TParams> = Omit<DataGridProps, "columns"> &
    DataGridToolbarProps &
    DataGridFooterProps & {
        hasActions?: boolean;
        columns: AppGridColumn[];
        params?: TParams;
        actions?: Array<"edit" | "delete" | "options" | "custom">;
        options?: GridOption[];
        actionsWidth?: number;
        actionsPosition?: "left" | "right";
        actionsHeaderAlign?: "left" | "center" | "right";
        renderCustomOption?: (args: { id: string; row: any }) => ReactNode;
        rowIdKey?: any;
        downloadFilename?: string;
        pages?: number;
        searchConfig?: SearchConfig;
        filter?: {
            content: ReactNode;
            onApply?: () => void;
            onClear?: () => void;
            /** Whitelist of URL keys this filter writes; kills the extraParams spread when set. */
            keys?: string[];
        };
        multiSelect?: MultiSelectConfig;
    };

export type QueryParams = {
    page_size: number;
    page: number;
    [key: string]: any;
};

export type GridModelProps<TData, TParams> = GridProps<TData, TParams> & {
    /** Page-owned action callbacks wired by useDataGrid. */
    onEdit?: (row: any) => void;
    onDelete?: (id: GridRowId, row: any) => void;
    onAction?: (row: any) => void;
    selectedRows?: GridRowId[];
    setSelectedRows?: (rows: GridRowId[]) => void;
    clearSelection?: () => void;
    /** Re-fetches the full dataset (no pagination) for Excel export. */
    fetchAllForExport?: () => Promise<any[]>;
};
