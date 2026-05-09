"use client";

import { Typography, Stack, Box } from "@mui/material";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";

type Props = {
    data: { id: number; value: number; label: string; color: string }[];
    height?: number;
    legend?: {
        placement?: "right" | "bottom";
        hidden?: boolean;
    };
};

export default function PieCharts({ data, height = 250, legend }: Props) {
    const legendPlacement = legend?.placement ?? "bottom";
    const legendVisibility = !legend?.hidden;

    return (
        <Stack sx={{ flex: 1, height: "100%" }}>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: legendPlacement === "right" ? "row" : "column",
                    justifyContent: legendPlacement === "right" ? "space-between" : "center",
                    position: "relative",
                }}
            >
                <MUIPieChart
                    series={[
                        {
                            data: data,
                            innerRadius: 60,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            highlightScope: { fade: "global", highlight: "item" },
                            faded: { additionalRadius: -5, },
                        },
                    ]}
                    skipAnimation={false}
                    height={height}
                    width={200}
                    margin={{ top: 0, left: 0, right: 0 }}
                    slotProps={{ legend: { sx: { display: "none" } } }}
                />

                {legendVisibility && legendPlacement === "right" && (
                    <Stack direction="column" columnGap={2} rowGap={2} flexWrap="wrap">
                        {data.map(({ color, id, label }) => (
                            <Stack direction="row" alignItems="center" columnGap={0.5} key={id}>
                                <Box
                                    sx={{
                                        height: 14,
                                        width: 14,
                                        borderRadius: 6,
                                        backgroundColor: color,
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" fontSize={11}>{label}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                )}
            </Box>

            {legendVisibility && legendPlacement === "bottom" && (
                <Box sx={{ borderTop: 1, borderColor: "divider", paddingTop: 1.5, paddingBottom: 1 }}>
                    <Stack direction="row" columnGap={1} rowGap={1} flexWrap="wrap">
                        {data.map(({ color, id, label }) => (
                            <Stack direction="row" alignItems="center" columnGap={0.5} key={id}>
                                <Box
                                    sx={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 6,
                                        backgroundColor: color,
                                    }}
                                />
                               <Typography variant="body2" color="text.secondary" fontSize={12}>{label}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}
