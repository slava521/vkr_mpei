"use client"

import React, {FC, useEffect} from "react";

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import Chart from "@/app/components/chart/chart";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import Button from "@/app/components/ui/button/button";
import Checkbox from "@/app/components/ui/checkbox/checkbox";
import Container from "@/app/components/ui/container/container";
import Input from "@/app/components/ui/input/input";
import RadioButton from "@/app/components/ui/radioButton/radioButton";
import Select from "@/app/components/ui/select/select";
import {useUserVerify} from "@/app/hooks/useUserVerify";
import {TEMPERATURE_COLORS} from "@/app/shared/consts/consts";
import {Params} from "@/app/shared/types/types";
import {formatDateString} from "@/app/shared/utils/utils";
import {EndpointType} from "@/lib/models/weatherTypes";
import {weatherAPI} from "@/lib/services/WeatherService";

import classes from './chartPage.module.scss';

type Props = {
    title: string,
    params: Params,
    endpoint: EndpointType
}

const handleParamClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
}

const ChartPage: FC<Props> = ({title, params, endpoint}) => {
    const options = params.map(param => param.id)
    const searchParams = useSearchParams()
    const searchDateFrom = searchParams.get('date_from')
    const searchDateTo = searchParams.get('date_to')
    const searchEverySecond = searchParams.get('every_second')
    const searchWeatherParam = searchParams.get('param')
    const {replace} = useRouter()
    const pathname = usePathname()
    const [getValues, {data: chartData, error, isLoading}] = weatherAPI.useGetChartValuesMutation()
    const [isAuthorized, verifyLoading] = useUserVerify()

    useEffect(() => {
        if (searchDateFrom && searchDateTo && searchWeatherParam && isAuthorized) {
            getValues({
                endpoint,
                param: searchWeatherParam,
                dateFrom: formatDateString(searchDateFrom),
                dateTo: formatDateString(searchDateTo),
                everySecond: searchEverySecond === 'on'
            })
        }
    }, [searchDateFrom, searchDateTo, searchEverySecond, searchWeatherParam, isAuthorized]);

    useEffect(() => {
        if (!isAuthorized && !verifyLoading) {
            replace('/')
        }
    }, [isAuthorized, verifyLoading]);

    if (verifyLoading || !isAuthorized) {
        return <div>Загрузка...</div>
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const params = new URLSearchParams(searchParams)
        formData.forEach((value, key) => {
            params.set(key, value as string)
        })
        if (!formData.get('every_second')) {
            params.delete('every_second')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Container title={title}>
            <div className={classes.chartPage}>
                <div className={classes.chartPage__sidebar}>
                    <ErrorMessage error={error} loading={isLoading} className={classes.chartPage__sidebar__error}/>
                    <div className={classes.chartPage__sidebar__body}>
                        <div className={classes.chartPage__sidebar__text}>
                            Введите даты и выберите параметр:
                        </div>
                        <form className={classes.chartPage__sidebar__form} onSubmit={handleSubmit}>
                            <Input
                                label={'Начальная дата'}
                                inputType={'datetime-local'}
                                name={'date_from'}
                                defaultValue={searchDateFrom as string}
                                required
                            />
                            <Input
                                label={'Конечная дата'}
                                inputType={'datetime-local'}
                                name={'date_to'}
                                defaultValue={searchDateTo as string}
                                required
                            />
                            <div className={classes.chartPage__sidebar__form__param}>
                                <div className={classes.chartPage__sidebar__form__param__comment}>
                                    Введите <span
                                        className={classes.chartPage__sidebar__form__param__link}
                                        onClick={handleParamClick}
                                    >
                                        параметр
                                    </span> из таблицы
                                </div>
                                <Select name={'param'} options={options} defaultValue={searchWeatherParam as string}/>
                            </div>
                            <Checkbox
                                label='Построить график посекундно'
                                name='every_second'
                                checked={searchEverySecond === 'on'}
                            />
                            <div className={classes.chartPage__sidebar__form__radio}>
                                <div>Вид графика:</div>
                                <RadioButton label='Линейный' name='chartType' value='line' checked/>
                                <RadioButton label='Столбчатый' name='chartType' value='bar'/>
                            </div>
                            <Button buttonType='submit' text='Построить график' right/>
                        </form>
                    </div>
                </div>
                <div className={classes.chartPage__main}>
                    <div className={classes.chartPage__main__chart}>
                        <div
                            className={`${classes.chartPage__main__chart__header} ${
                                searchWeatherParam && chartData?.values.length
                                    ? classes.chartPage__main__chart__header__active
                                    : ''
                            }`}
                        >
                            График параметра {searchWeatherParam}
                        </div>
                        <div className={classes.chartPage__main__chart__bg}>
                            <Chart
                                labels={chartData?.labels || []}
                                values={chartData?.values || []}
                                param={searchWeatherParam}
                                colors={TEMPERATURE_COLORS}
                                width={700}
                                bar={searchParams.get('chartType') === 'bar'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ChartPage;
