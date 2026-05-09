"use client";

import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const AppGrid = (props: DataGridProps) => {
    return (
        <Box>
            <DataGrid
                {...props}
                getRowHeight={() => "auto"}
                getRowClassName={({ indexRelativeToCurrentPage }) =>
                    indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
                }
                sx={{
                    fontSize: 13,
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "transparent !important",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "transparent !important",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "700 !important",
                    },
                    "&>.MuiDataGrid-main": {
                        "& .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                            border: "none",
                        },
                        "& .MuiDataGrid-columnHeader:focus-within": {
                            outline: "none !important",
                        },
                    },
                    "& .MuiDataGrid-cell": {
                        py: 1,
                        lineHeight: 1.5,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        display: "flex",
                        alignItems: "center",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                    height: "100%",
                }}
            />
        </Box>
    );
};
