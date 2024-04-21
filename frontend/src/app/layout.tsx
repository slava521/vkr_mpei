import React from "react";

import {Analytics} from "@vercel/analytics/react"
import type {Metadata} from "next";

import './globals.scss'
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import StoreProvider from "@/lib/storeProvider";

import classes from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Метеоданные НИУ МЭИ"
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="ru">
            <body>
                <div className={classes.wrapper}>
                    <StoreProvider>
                        <Header/>
                        <main className={classes.main}>
                            {children}
                        </main>
                        <Footer/>
                    </StoreProvider>
                    <Analytics/>
                </div>
            </body>
        </html>
    );
}
