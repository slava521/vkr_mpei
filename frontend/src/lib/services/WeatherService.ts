import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    ChartRequestType,
    ChartResponseType,
    DownloadRequestType,
    TableRequestType,
    TableResponseType
} from "@/lib/models/weatherTypes";

export const weatherAPI = createApi({
    reducerPath: 'weatherAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/'
    }),
    endpoints: (build) => ({
        getTable: build.query<TableResponseType, TableRequestType>({
            query: (requestParams) => ({
                url: `${requestParams.endpoint}/?page=${requestParams.page}&date_from=${requestParams.dateFrom}&date_to=${requestParams.dateTo}`,
            })
        }),
        getChartValues: build.mutation<ChartResponseType, ChartRequestType>({
            query: (requestParams) => ({
                url: `${requestParams.endpoint}/${requestParams.param}/?date_from=${requestParams.dateFrom}&date_to=${requestParams.dateTo}&every_second=${requestParams.everySecond ?? ''}`,
            })
        }),
        downloadFile: build.mutation<any, DownloadRequestType>({
            query: (requestParams) => ({
                url: `${requestParams.endpoint}-file/${requestParams.fileType}/?date_from=${requestParams.dateFrom}&date_to=${requestParams.dateTo}`,
                headers: {
                    'Authorization': `Bearer ${requestParams.accessToken}`,
                },
                responseHandler: 'content-type'
            })
        }),
    })
})