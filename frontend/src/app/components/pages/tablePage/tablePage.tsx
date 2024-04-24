'use client'

import React, {FC} from 'react';

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import DownloadFile from "@/app/components/downloadFile/downloadFile";
import PaginationLinks from "@/app/components/paginationLinks/paginationLinks";
import Table from "@/app/components/table/table";
import Button from "@/app/components/ui/button/button";
import Container from "@/app/components/ui/container/container";
import Input from "@/app/components/ui/input/input";
import {Params} from "@/app/shared/types/types";
import { formatDateString} from "@/app/shared/utils/utils";
import {useAppSelector} from "@/lib/hooks";
import {EndpointType} from "@/lib/models/weatherTypes";
import {userAPI} from "@/lib/services/UserService";
import {weatherAPI} from "@/lib/services/WeatherService";

import classes from "./tablePage.module.scss";

type Props = {
    title: string,
    tableCols: Params
    endpoint: EndpointType
}

const fileTypes: ('csv' | 'xlsx')[] = ['csv', 'xlsx']

const TablePage: FC<Props> = ({title, tableCols, endpoint}) => {
    const searchParams = useSearchParams()
    const stringPage = searchParams.get('page')
    const page = stringPage ? +stringPage : 1
    const paramsDateFrom = searchParams.get('dateFrom')
    const dateFrom = formatDateString(paramsDateFrom)
    const dateFromRu = formatDateString(paramsDateFrom, true)
    const paramsDateTo = searchParams.get('dateTo')
    const dateTo = formatDateString(paramsDateTo)
    const dateToRu = formatDateString(paramsDateTo, true)
    const orderBy = searchParams.get('order_by') || 'date'
    const ascending = searchParams.get('ascending') || ''

    const {currentData} = weatherAPI.useGetTableQuery({
        endpoint,
        page,
        dateFrom,
        dateTo,
        orderBy,
        ascending
    })
    const {access} = useAppSelector(state => state.userReducer)
    const {isLoading, error} = userAPI.useVerifyUserQuery({token: access})
    const {replace} = useRouter()
    const pathname = usePathname()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const params = new URLSearchParams(searchParams)
        const formDateFrom = formData.get('dateFrom') as string
        const formDateTo = formData.get('dateTo') as string
        if (formDateFrom) {
            params.set('dateFrom', formDateFrom)
        }
        else {
            params.delete('dateFrom')
        }
        if (formDateTo) {
            params.set('dateTo', formDateTo)
        }
        else {
            params.delete('dateTo')
        }
        params.delete('page')
        replace(`${pathname}?${params.toString()}`)
    }

    const handleReset = () => {
        replace(pathname)
    }

    return (
        <Container title={title}>
            <form className={classes.tablePage__form} onSubmit={handleSubmit} onReset={handleReset}>
                <div className={classes.tablePage__form__inputs}>
                    <Input
                        name='dateFrom'
                        label='Начальная дата:'
                        inputType='datetime-local'
                        defaultValue={paramsDateFrom as string}
                    />
                    <Input
                        name='dateTo'
                        label='Конечная дата:'
                        inputType='datetime-local'
                        defaultValue={paramsDateTo as string}
                    />
                </div>
                <div className={classes.tablePage__form__buttons}>
                    <Button buttonType='reset' text='Сброс' small/>
                    <Button buttonType='submit' text='Поиск' small/>
                </div>
            </form>
            <div className={classes.tablePage__table}>
                <Table
                    cols={tableCols}
                    loading={isLoading}
                    data={currentData?.results}
                    contentCount={currentData?.count}
                />
            </div>
            <div className={classes.tablePage__footer}>
                <PaginationLinks contentCount={currentData?.count}/>
                {!isLoading && !error && !!currentData?.count &&
                    <div className={classes.tablePage__footer__buttons}>
                        {fileTypes.map((file) => (
                            <DownloadFile
                                key={file}
                                endpoint={endpoint}
                                fileType={file}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                dateFromRu={dateFromRu}
                                dateToRu={dateToRu}
                                accessToken={access}
                            />
                        ))}
                    </div>
                }
            </div>
        </Container>
    );
};

export default TablePage;
