"use client";

import { Box } from "@mui/material";
import { axisClasses } from "@mui/x-charts";
import { LineChart as MUILineChart } from "@mui/x-charts/LineChart";

type Props = {
    labels: string[];
    data: number[];
};

export default function LineChart({ data, labels }: Props) {
    return (
        <Box sx={{ flex: 1, minHeight: 300, width: "100%" }}>
            <MUILineChart
                xAxis={[
                    {
                        data: labels,
                        scaleType: "point",
                        tickLabelStyle: {
                            fontSize: 10,
                        },
                        tickLabelInterval: () => true,
                    },
                ]}
                yAxis={[
                    {
                        valueFormatter: (value: number | null) => `${value ?? 0}`,
                    },
                ]}
                series={[
                    {
                        data,
                        area: true,
                        color: "#00A76F",
                        showMark: true,
                        curve: "catmullRom",
                    },
                ]}
                grid={{ horizontal: true }}
                margin={{ bottom: 50, left: 0, right: 10, top: 10 }}
                sx={{
                    "& .MuiLineElement-root": {
                        strokeWidth: 2,
                        strokeLinecap: "round",
                    },
                    "& .MuiAreaElement-root": {
                        fillOpacity: 0.2,
                    },
                    "& .MuiChartsAxis-line": {
                        stroke: "transparent",
                    },
                    "& .MuiChartsAxis-tick": {
                        stroke: "transparent",
                    },
                    "& .MuiChartsGrid-line": {
                        stroke: "rgba(0, 0, 0, 0.08)",
                        strokeDasharray: "3 3",
                    },
                    [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                        transform: "rotateZ(-45deg) translateY(5px)",
                        textAnchor: "end",
                    },
                }}
                height={400}
            />
        </Box>
    );
}
