"use client";

import { useState } from "react";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { downloadExcelFile } from "@/utils/excel";

export type UseGridDownloadArgs = {
    rows: GridRowsProp;
    columns: GridColDef[];
    filename?: string;
    /** Re-fetches the full unpaginated dataset before exporting (Apollo network-only). */
    fetchAll?: () => Promise<any[]>;
};

export type UseGridDownload = {
    handleDownload: () => Promise<void>;
    exporting: boolean;
};

export const useGridDownload = (args: UseGridDownloadArgs): UseGridDownload => {
    const { rows, columns, filename, fetchAll } = args;
    const [exporting, setExporting] = useState(false);

    const handleDownload = async () => {
        if (!fetchAll) {
            downloadExcelFile(rows, columns, filename);
            return;
        }
        setExporting(true);
        try {
            const all = await fetchAll();
            const exportRows = (all.length > 0 ? all : rows) as GridRowsProp;
            downloadExcelFile(exportRows, columns, filename);
        } catch (err) {
            console.error("Export fetch failed; falling back to current page:", err);
            downloadExcelFile(rows, columns, filename);
        } finally {
            setExporting(false);
        }
    };

    return { handleDownload, exporting };
};
