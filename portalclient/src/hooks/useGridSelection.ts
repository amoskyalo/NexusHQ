"use client";

import { useState } from "react";
import type { GridRowId } from "@mui/x-data-grid";

export type UseGridSelection = {
    selectedRows: GridRowId[];
    setSelectedRows: (rows: GridRowId[]) => void;
    clearSelection: () => void;
};

export const useGridSelection = (): UseGridSelection => {
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
    const clearSelection = () => setSelectedRows([]);
    return { selectedRows, setSelectedRows, clearSelection };
};
