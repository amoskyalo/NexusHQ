import { GridColDef, GridRowModel, GridRenderCellParams } from "@mui/x-data-grid";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import { formatters } from "./formatters";
import { CopiableText } from "@/components/typography";
import { GridProps } from "@/components/datagrid/types";
import { Stack } from "@mui/material";

export const useCustomizeGridColumns = (
    columns: Pick<GridProps<any, any>, "columns">["columns"],
    numbered?: boolean,
): GridColDef[] => {
    const { isDesktop, isMiniTablet, isMobile, isTablet } = useResponsiveness();
    const { formatDate, formatCurrency } = formatters();

    function getColumnDimensions(mobileWidth: number | undefined, width: number | undefined) {
        if (isDesktop) return { flex: 1 };
        if (width) return { width };
        if ((isMobile || isMiniTablet || isTablet) && mobileWidth) return { width: mobileWidth };
        return { flex: 1 };
    }

    return [
        ...(numbered ? [{ field: "no", headerName: "No.", width: 50, sortable: false }] : []),
        ...columns.map((column) => {
            const {
                mobileWidth,
                width,
                valueGetter: valueGetterFn,
                field,
                copiable,
                formatValueTo,
                showTime,
                renderCell: renderCellFn,
                ...rest
            } = column as any;

            let valueGetter;
            let renderCell;

            if (typeof valueGetterFn === "function") {
                valueGetter = valueGetterFn;
            } else if (formatValueTo === "date") {
                const hideTime = showTime === false;
                valueGetter = (__: any, row: GridRowModel) => formatDate(row[field], hideTime);
            } else if (formatValueTo === "currency") {
                valueGetter = (__: any, row: GridRowModel) => formatCurrency("KES", row[field]);
            } else {
                valueGetter = (__: any, row: GridRowModel) => row[field] || "--";
            }

            if (copiable) {
                renderCell = ({ value }: GridRenderCellParams) => (
                    <Stack sx={{ height: "100%" }} direction="column" justifyContent="center">
                        <CopiableText variant="body2">{value}</CopiableText>
                    </Stack>
                );
            } else {
                renderCell = renderCellFn;
            }

            return {
                ...rest,
                ...getColumnDimensions(mobileWidth, width),
                valueGetter,
                renderCell: renderCell as any,
                field,
            };
        }),
    ];
};
