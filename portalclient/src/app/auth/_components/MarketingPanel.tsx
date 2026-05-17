"use client";

import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Quote } from "lucide-react";

const logos = [
    [
        { name: "Discord", sizing: { width: 100, height: 30 } },
        { name: "Mailchimp", sizing: { width: 100, height: 30 } },
        { name: "Grammarly", sizing: { width: 110, height: 30 } },
        { name: "Attentive", sizing: { width: 90, height: 30 } },
    ],
    [
        { name: "HelloSign", sizing: { width: 100, height: 30 } },
        { name: "Intercom", sizing: { width: 90, height: 30 } },
        { name: "Square", sizing: { width: 100, height: 30 } },
        { name: "Dropbox", sizing: { width: 100, height: 30 } },
    ],
];

export const MarketingPanel = () => {
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
                height: "100%",
                overflow: "hidden",
                px: { xs: 4, md: 12 },
                color: "common.white",
                background: (theme) =>
                    `radial-gradient(circle at 80% 10%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 35%)`,
            }}
        >
            <Stack spacing={5} direction="column" justifyContent="center" sx={{ flex: 1, py: { xs: 4, md: 6 } }}>
                <Typography
                    variant="h2"
                    sx={{ fontWeight: 700, lineHeight: 1.15, fontSize: { xs: "2.25rem", md: "2rem" } }}
                >
                    Revolutionize Your Workforce <br /> with Smarter Operations
                </Typography>

                <Stack spacing={3}>
                    <Quote size={32} fill="currentColor" strokeWidth={0} style={{ transform: "scaleX(-1)" }} />
                    <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.95, maxWidth: 520, lineHeight: 1.5 }}>
                        &ldquo;NexusHQ has completely transformed how we manage our people and processes. Onboarding,
                        payroll, and project tracking — all in one place, finally.&rdquo;
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1 }}>
                        <Avatar src="/images/testimonial-avatar.png" alt="Sarah Mwangi" sx={{ width: 48, height: 48 }}>
                            SM
                        </Avatar>
                        <Stack>
                            <Typography sx={{ fontWeight: 600 }}>Sarah Mwangi</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.75 }}>
                                Head of People & Culture at TechBridge Africa
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack spacing={3} sx={{ pb: { xs: 4, md: 6 } }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="caption" sx={{ letterSpacing: 2, opacity: 0.75, fontWeight: 600 }}>
                        JOIN 1K TEAMS
                    </Typography>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", flex: 1 }} />
                </Stack>

                <Stack columnGap={0} rowGap={3}>
                    {logos.map((row, idx) => (
                        <Stack
                            key={idx}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ opacity: 0.9 }}
                        >
                            {row.map((logo) => (
                                <Box
                                    key={logo.name}
                                    component="img"
                                    src={`/images/logos/${logo.name.toLowerCase()}.png`}
                                    alt={logo.name}
                                    sx={{
                                        ...logo.sizing,
                                        objectFit: "contain",
                                        filter: "brightness(0) invert(1)",
                                    }}
                                />
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};
