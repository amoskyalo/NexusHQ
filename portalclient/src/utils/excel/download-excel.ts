import * as XLSX from "xlsx-js-style";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { buildExportRow } from "./build-row";
import { calculateColumnWidth } from "./column-width";
import { HEADER_CELL_STYLE, HEADER_FREEZE_PANE } from "./header-style";

type ExportColumn = GridColDef & { formatValueTo?: "date" | "currency" };

export const downloadExcelFile = (rows: GridRowsProp, columns: ExportColumn[], filename: string = "data") => {
    try {
        const headers = columns.map((c) => c.headerName ?? c.field);
        const transformed = rows.map((row) => buildExportRow(columns, row));

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transformed, { header: headers });

        for (let colIdx = 0; colIdx < headers.length; colIdx++) {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIdx });
            if (worksheet[cellRef]) {
                (worksheet[cellRef] as any).s = HEADER_CELL_STYLE;
            }
        }

        worksheet["!cols"] = headers.map((h) => ({ wch: calculateColumnWidth(h, transformed) }));
        worksheet["!freeze"] = HEADER_FREEZE_PANE;

        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
        console.error("Error downloading XLSX file:", error);
        throw error;
    }
};
