import { ReactNode } from "react";
import { Nunito } from "next/font/google";

import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["cyrillic"],
    weight: ["400", "500", "600", "700", "800", "900",]
});

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <head>
                <link data-rh="true" rel="icon" href="/favicon.ico"/>
            </head>
            <body className={nunito.variable}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
