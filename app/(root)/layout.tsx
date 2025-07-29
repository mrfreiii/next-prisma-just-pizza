import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/shared/components/shared/header";

export const metadata: Metadata = {
    title: "Just Pizza | Main",
};

export default function RootLayout(
    {
        children,
        modal
    }: {
        children: ReactNode;
        modal: ReactNode
    }) {
    return (
        <main className={"min-h-screen"}>
            <Header/>
            {children}
            {modal}
        </main>
    );
}
