import type { GridColDef } from "@mui/x-data-grid";
import { formatters } from "../formatters";

const { formatDate, formatCurrency } = formatters();

type ExportColumn = GridColDef & { formatValueTo?: "date" | "currency" };

export function getCellValue(column: ExportColumn, row: any): any {
    const raw = column.valueGetter
        ? (column.valueGetter as any)(row[column.field], row, column, null)
        : row[column.field];

    if (raw === null || raw === undefined) return "--";
    if (Array.isArray(raw)) return raw.join(", ");

    if (column.formatValueTo === "date") {
        try {
            return formatDate(raw);
        } catch {
            return raw;
        }
    }
    if (column.formatValueTo === "currency") {
        try {
            return formatCurrency("KES", raw);
        } catch {
            return raw;
        }
    }
    return raw;
}

export function buildExportRow(columns: ExportColumn[], row: any): Record<string, any> {
    const out: Record<string, any> = {};
    for (const col of columns) {
        const headerName = col.headerName ?? col.field;
        out[headerName] = getCellValue(col, row);
    }
    return out;
}
