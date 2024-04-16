'use client'

import {FC, useEffect} from "react";

import Button from "@/app/components/ui/button/button";
import {useConfirmModal} from "@/app/hooks/useConfirmModal";
import {DownloadRequestType} from "@/lib/models/weatherTypes";
import {weatherAPI} from "@/lib/services/WeatherService";

type Props = DownloadRequestType & {
    dateToRu: string,
    dateFromRu: string,
}

const DownloadFile: FC<Props> = (
    {
        endpoint,
        fileType,
        dateTo,
        dateFrom,
        dateToRu,
        dateFromRu,
        accessToken
    }) => {
    const [download, {isLoading, error, data}] = weatherAPI.useDownloadFileMutation()
    let confirmText = ', что хотите скачать все данные'
    if (dateFromRu) {
        confirmText += ` c ${dateFromRu}`
    }
    if (dateToRu) {
        confirmText += ` до ${dateToRu}`
    }
    const [ConfirmDownloadFile, openConfirmModal] = useConfirmModal(() => download({
        endpoint,
        fileType,
        dateTo,
        dateFrom,
        accessToken
    }), confirmText)

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
                onClick={openConfirmModal}
                disabled={isLoading}
            />
            {isLoading &&
                <img src="/loading.gif" alt="Загрузка" height={40}/>
            }
            <ConfirmDownloadFile/>
        </>
    );
};

export default DownloadFile;
