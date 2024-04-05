"use client"

import React, {FC, useState} from "react";
import classes from "./mainChart.module.scss";
import Chart from "@/app/components/chart/chart";

const test = {
    "labels": [
        "2021-12-13T21:00:49Z",
        "2021-12-13T21:01:49Z",
        "2021-12-13T21:02:49Z",
        "2021-12-13T21:03:49Z",
        "2021-12-13T21:04:49Z",
        "2021-12-13T21:05:49Z",
        "2021-12-13T21:06:49Z",
        "2021-12-13T21:07:49Z",
        "2021-12-13T21:08:49Z",
        "2021-12-13T21:09:49Z",
        "2021-12-13T21:10:49Z",
        "2021-12-13T21:11:49Z",
        "2021-12-13T21:12:49Z",
        "2021-12-13T21:13:49Z",
        "2021-12-13T21:14:49Z",
        "2021-12-13T21:15:49Z",
        "2021-12-13T21:16:49Z",
        "2021-12-13T21:17:49Z",
        "2021-12-13T21:18:49Z",
        "2021-12-13T21:19:49Z",
        "2021-12-13T21:20:49Z",
        "2021-12-13T21:21:49Z",
        "2021-12-13T21:22:49Z",
        "2021-12-13T21:23:49Z",
        "2021-12-13T21:24:49Z",
        "2021-12-13T21:25:49Z",
        "2021-12-13T21:26:49Z",
        "2021-12-13T21:27:49Z",
        "2021-12-13T21:28:49Z",
        "2021-12-13T21:29:49Z",
        "2021-12-13T21:30:49Z",
        "2021-12-13T21:31:49Z",
        "2021-12-13T21:32:49Z",
        "2021-12-13T21:33:49Z",
        "2021-12-13T21:34:49Z",
        "2021-12-13T21:35:49Z",
        "2021-12-13T21:36:49Z",
        "2021-12-13T21:37:49Z",
        "2021-12-13T21:38:49Z",
        "2021-12-13T21:39:49Z",
        "2021-12-13T21:40:49Z",
        "2021-12-13T21:41:49Z",
        "2021-12-13T21:42:49Z",
        "2021-12-13T21:43:49Z",
        "2021-12-13T21:44:49Z",
        "2021-12-13T21:45:49Z",
        "2021-12-13T21:46:49Z",
        "2021-12-13T21:47:49Z",
        "2021-12-13T21:48:49Z",
        "2021-12-13T21:49:49Z",
        "2021-12-13T21:50:49Z",
        "2021-12-13T21:51:49Z",
        "2021-12-13T21:52:49Z",
        "2021-12-13T21:53:49Z",
        "2021-12-13T21:54:49Z",
        "2021-12-13T21:55:49Z",
        "2021-12-13T21:56:49Z",
        "2021-12-13T21:57:49Z",
        "2021-12-13T21:58:49Z",
        "2021-12-13T21:59:49Z"
    ],
    "values": [
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.1,
        -2.2,
        -2.3,
        -2.3,
        -2.3,
        -2.3,
        -2.2,
        -2.2,
        -2.2,
        -2.3,
        -2.3,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.3,
        -2.3,
        -2.3,
        -2.3,
        -2.3,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.3,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.2,
        -2.3,
        -2.3,
        -2.2,
        -2.3,
        -2.3,
        -2.3,
        -2.3,
        -2.3,
        -2.4,
        -2.3,
        -2.4,
        -2.4,
        -2.4,
        -2.4,
        -2.4,
        -2.4,
        -2.4,
        -2.4,
        -2.4
    ],
    colors: ['#F5C05A', '#EB88B1', '#B965E4', '#8c7ede']
}

type Props = {
    title: string,
    apiLink?: string
}

type ActiveLink = 'hour' | 'day' | 'week'

const links = [{
    en: 'hour',
    ru: 'Час',
}, {
    en: 'day',
    ru: 'День'
}, {
    en: 'week',
    ru: 'Неделя'
}]

const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // TODO добавить обработку
}

const MainChart: FC<Props> = ({title, apiLink}) => {
    const [activeLink, setActiveLink] = useState<ActiveLink>('hour')

    return (
        <div className={classes.mainChart}>
            <h3 className={classes.mainChart__title}>{title}</h3>
            <div className={classes.mainChart__bg}>
                <Chart labels={test.labels} values={test.values} param={'TA'} colors={test.colors}/>
                <div className={classes.mainChart__nav}>
                    <span>Период:</span>
                    {links.map(link => (
                        <a
                            key={link.en}
                            href={`/${apiLink ?? ''}-${link.en}`}
                            className={`${classes.mainChart__nav__link} ${
                                activeLink === link.en ? classes.mainChart__nav__link__active : ''
                            }`}
                            onClick={onLinkClick}
                        >
                            {link.ru}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainChart;