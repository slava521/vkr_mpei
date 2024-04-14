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
import {userAPI} from "@/lib/services/UserService";
import {useAppSelector} from "@/lib/hooks";
import DownloadFile from "@/app/components/downloadFile/downloadFile";

type Props = {
    title: string,
    tableCols: Params
    endpoint: EndpointType
}

const fileTypes:('csv' | 'xlsx')[] = ['csv', 'xlsx']

const TablePage: FC<Props> = ({title, tableCols, endpoint}) => {
    const searchParams = useSearchParams()
    const stringPage = searchParams.get('page')
    const page = stringPage ? +stringPage : 1
    const {currentData} = weatherAPI.useGetTableQuery({endpoint, page, dateFrom: '', dateTo: ''})
    const {access} = useAppSelector(state => state.userReducer)
    const {isLoading, error} = userAPI.useVerifyUserQuery({token: access})

    return (
        <Container title={title}>
            <form className={classes.tableForm}>
                <div className={classes.tableForm__inputs}>
                    <Input name='date_from' label='Начальная дата:' inputType='datetime-local'/>
                    <Input name='date_to' label='Конечная дата:' inputType='datetime-local'/>
                </div>
                <Button buttonType='reset' text='Сброс' small/>
                <Button buttonType='submit' text='Поиск' small/>
            </form>
            <Table cols={tableCols} data={currentData?.results}/>
            <div className={classes.tableForm__footer}>
                <PaginationLinks contentCount={currentData?.count}/>
                {!isLoading && !error &&
                    <div className={classes.tableForm__footer__buttons}>
                        {fileTypes.map((file) => (
                            <DownloadFile
                                key={file}
                                endpoint={endpoint}
                                fileType={file}
                                dateFrom={''}
                                dateTo={''}
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