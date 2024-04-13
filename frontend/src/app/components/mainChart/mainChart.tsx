"use client"

import React, {FC, useEffect, useState} from "react";
import classes from "./mainChart.module.scss";
import Chart from "@/app/components/chart/chart";
import {EndpointType} from "@/lib/models/weatherTypes";
import {weatherAPI} from "@/lib/services/WeatherService";
import {formatDate} from "@/app/shared/utils/utils";

type Props = {
    title: string,
    endpoint: EndpointType,
    param: string,
    colors: string[]
}

type ActiveLink = 'Час' | 'День' | 'Неделя'

// const hourRange = new Date()
// hourRange.setHours(hourRange.getHours() - 1)
// const dayRange = new Date()
// dayRange.setDate(dayRange.getDate() - 1)
// const weekRange = new Date()
// weekRange.setDate(weekRange.getDate() - 7)
const hourDateFrom = new Date(2021, 11, 14, 0, 0, 0) // TODO поправить на нормальные даты, когда появился бд
const hourDateTo = new Date(2021, 11, 14, 1, 0, 0)
const dayDateFrom = new Date(2021, 11, 14, 0, 0, 0)
const dayDateTo = new Date(2021, 11, 15, 0, 0, 0)
const weekDateFrom = new Date(2021, 11, 14, 0, 0, 0)
const weekDateTo = new Date(2021, 11, 21, 0, 0, 0)

type Links = {
    name: ActiveLink,
    dateFrom: Date,
    dateTo: Date // TODO: убрать когда появится бд и оставить new Date()
}[]

const links: Links = [{
    name: 'Час',
    dateFrom: hourDateFrom,
    dateTo: hourDateTo
}, {
    name: 'День',
    dateFrom: dayDateFrom,
    dateTo: dayDateTo
}, {
    name: 'Неделя',
    dateFrom: weekDateFrom,
    dateTo: weekDateTo
}]

const MainChart: FC<Props> = ({title, endpoint, param, colors}) => {
    const [activeLink, setActiveLink] = useState<ActiveLink>('Час')
    const [getValues, {data: chartData, error}] = weatherAPI.useGetChartValuesMutation()

    useEffect(() => {
        getValues({endpoint, param, dateFrom: formatDate(hourDateFrom), dateTo: formatDate(hourDateTo)})
    }, []);

    const onLinkClick = async (event: React.MouseEvent<HTMLButtonElement>, newActive: ActiveLink, dateFrom: Date, dateTo: Date) => {
        event.preventDefault();
        await getValues({endpoint, param, dateFrom: formatDate(dateFrom), dateTo: formatDate(dateTo)})
        !error && setActiveLink(newActive)
    }

    return (
        <div className={classes.mainChart}>
            <h3 className={classes.mainChart__title}>{title}</h3>
            <div className={classes.mainChart__bg}>
                <Chart labels={chartData?.labels || []} values={chartData?.values || []} param={param}
                       colors={colors} width={500}/>
                <div className={classes.mainChart__nav}>
                    <span>Период:</span>
                    {links.map(link => (
                        <button
                            key={link.name}
                            className={`${classes.mainChart__nav__link} ${
                                activeLink === link.name ? classes.mainChart__nav__link__active : ''
                            }`}
                            onClick={(e) => onLinkClick(e, link.name, link.dateFrom, link.dateTo)}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainChart;