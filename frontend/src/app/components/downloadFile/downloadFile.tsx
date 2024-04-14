'use client'

import {DownloadRequestType} from "@/lib/models/weatherTypes";
import {FC, useEffect} from "react";
import Button from "@/app/components/ui/button/button";
import {weatherAPI} from "@/lib/services/WeatherService";

type Props = DownloadRequestType

const DownloadFile: FC<Props> = (
    {
        endpoint,
        fileType,
        dateTo,
        dateFrom,
        accessToken
    }) => {
    const [download, {isLoading, error, data}] = weatherAPI.useDownloadFileMutation()

    useEffect(() => {
        if (data && !error && !isLoading) {
            console.log(data)
            const contentType = fileType === 'csv'
                ? 'text/csv'
                : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

            const filename = endpoint + 'data.' + fileType;
            const a = document.createElement('a');
            a.setAttribute('href', `data:${contentType};base64,${data}`);
            a.setAttribute('download', filename);
            a.click();
        }
    }, [data]);

    return (
        <>
            <Button
                buttonType='button'
                text={`Загрузить ${fileType} файл`}
                small
                onClick={() => download({
                    endpoint,
                    fileType,
                    dateTo,
                    dateFrom,
                    accessToken
                })}
                disabled={isLoading}
            />
            {isLoading &&
                <img src="/loading.gif" alt="Загрузка" height={40}/>
            }
        </>
    );
};

export default DownloadFile;