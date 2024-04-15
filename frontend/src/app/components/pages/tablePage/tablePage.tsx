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
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import PaginationLinks from "@/app/components/paginationLinks/paginationLinks";
import {userAPI} from "@/lib/services/UserService";
import {useAppSelector} from "@/lib/hooks";
import DownloadFile from "@/app/components/downloadFile/downloadFile";
import {formatDate, formatDateString} from "@/app/shared/utils/utils";

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
    const dateFrom = paramsDateFrom ? formatDateString(paramsDateFrom) : ''
    const paramsDateTo = searchParams.get('dateTo')
    const dateTo = paramsDateTo ? formatDateString(paramsDateTo) : ''

    const {currentData} = weatherAPI.useGetTableQuery({
        endpoint,
        page,
        dateFrom,
        dateTo
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
        if (formDateTo) {
            params.set('dateTo', formDateTo)
        }
        params.delete('page')
        replace(`${pathname}?${params.toString()}`)
    }

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        replace(pathname)
    }

    return (
        <Container title={title}>
            <form className={classes.tableForm} onSubmit={handleSubmit} onReset={handleReset}>
                <div className={classes.tableForm__inputs}>
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
                <Button buttonType='reset' text='Сброс' small/>
                <Button buttonType='submit' text='Поиск' small/>
            </form>
            <Table
                cols={tableCols}
                loading={isLoading}
                data={currentData?.results}
                contentCount={currentData?.count}
            />
            <div className={classes.tableForm__footer}>
                <PaginationLinks contentCount={currentData?.count}/>
                {!isLoading && !error && !!currentData?.count &&
                    <div className={classes.tableForm__footer__buttons}>
                        {fileTypes.map((file) => (
                            <DownloadFile
                                key={file}
                                endpoint={endpoint}
                                fileType={file}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
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