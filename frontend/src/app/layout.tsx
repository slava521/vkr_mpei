import type {Metadata} from "next";
import React from "react";
import './globals.scss'
import classes from "./layout.module.scss";
import Header from "@/app/components/header/header";

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
            <Header/>
            <main className={classes.main}>
                {children}
            </main>
            <div>
            </div>
        </div>
        </body>
        </html>
    );
}
