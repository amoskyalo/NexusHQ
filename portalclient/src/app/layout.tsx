import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppThemeProvider, QueryClientProvider } from "@/context";
import "./globals.css";
import { SnackbarContainer } from "@/components/snackbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NexusHQ",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body>
                <QueryClientProvider>
                    <AppThemeProvider>
                        <SnackbarContainer />
                        {children}
                    </AppThemeProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
