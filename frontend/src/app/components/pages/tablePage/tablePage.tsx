'use client'

import React, {FC} from 'react';
import Container from "@/app/components/ui/container/container";
import classes from "./tablePage.module.scss";
import Input from "@/app/components/ui/input/input";
import Button from "@/app/components/ui/button/button";
import Table from "@/app/components/table/table";
import {Params} from "@/app/shared/types/types";
import {weatherAPI} from "@/lib/services/WeatherService";
import {EndpointType} from "@/lib/models/weatherTypes";
import {useSearchParams} from "next/navigation";
import PaginationLinks from "@/app/components/paginationLinks/paginationLinks";

type Props = {
    title: string,
    tableCols: Params
    endpoint: EndpointType
}

const TablePage:FC<Props> = ({title, tableCols, endpoint}) => {
    const searchParams = useSearchParams()
    const stringPage = searchParams.get('page')
    const page = stringPage ? +stringPage : 1
    const {currentData} = weatherAPI.useGetTableQuery({endpoint, page, dateFrom: '', dateTo: ''})

    return (
        <Container title={title}>
            <form className={classes.tableForm}>
                <div className={classes.tableForm__inputs}>
                    <Input name='date_from' label='Начальная дата:' inputType='datetime-local'/>
                    <Input name='date_to' label='Конечная дата:' inputType='datetime-local'/>
                </div>
                <Button buttonType='reset' text='Сброс'/>
                <Button buttonType='submit' text='Поиск'/>
            </form>
            <Table cols={tableCols} data={currentData?.results}/>
            <PaginationLinks contentCount={currentData?.count}/>
        </Container>
    );
};

export default TablePage;