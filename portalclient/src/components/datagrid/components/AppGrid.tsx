"use client";

import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const AppGrid = (props: DataGridProps) => {
    return (
        <Box>
            <DataGrid
                {...props}
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
                        fontWeight: "600 !important",
                        fontSize: 13,
                        color: "text.primary",
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
                        lineHeight: 1.5,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        display: "flex",
                        alignItems: "center",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    "& .MuiCheckbox-root": {
                        padding: "6px",
                        "& .MuiSvgIcon-root": {
                            fontSize: 20,
                        },
                    },
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                    height: "100%",
                    "--DataGrid-rowBorderColor": "rgba(0, 0, 0, 0.06)",
                }}
            />
        </Box>
    );
};
