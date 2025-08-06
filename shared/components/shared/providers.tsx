"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";

type Props = {
    children: ReactNode;
}

export const Providers: FC<Props> = ({children}) =>{
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>

            <Toaster />
            <NextTopLoader />
        </>
    )
}