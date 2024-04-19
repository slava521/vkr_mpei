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
            query: (requestParams) => {
                const queryParams = new URLSearchParams()
                requestParams.page && queryParams.set('page', requestParams.page + '')
                requestParams.dateFrom && queryParams.set('date_from', requestParams.dateFrom)
                requestParams.dateTo && queryParams.set('date_to', requestParams.dateTo)
                requestParams.orderBy && queryParams.set('order_by', requestParams.orderBy)
                requestParams.ascending && queryParams.set('ascending', requestParams.ascending)
                return {
                    url: `${requestParams.endpoint}/?${queryParams.toString()}`,
                }
            }
        }),
        getChartValues: build.mutation<ChartResponseType, ChartRequestType>({
            query: (requestParams) => {
                const queryParams = new URLSearchParams()
                requestParams.everySecond && queryParams.set('every_second', requestParams.everySecond + '')
                queryParams.set('date_from', requestParams.dateFrom)
                queryParams.set('date_to', requestParams.dateTo)
                return {
                    url: `${requestParams.endpoint}/${requestParams.param}/?${queryParams.toString()}`,
                }
            }
        }),
        downloadFile: build.mutation<any, DownloadRequestType>({
            query: (requestParams) => {
                const queryParams = new URLSearchParams()
                requestParams.dateFrom && queryParams.set('date_from', requestParams.dateFrom)
                requestParams.dateTo && queryParams.set('date_to', requestParams.dateTo)
                return {
                    url: `${requestParams.endpoint}-file/${requestParams.fileType}/?${queryParams.toString()}`,
                    headers:
                        {
                            'Authorization':
                                `Bearer ${requestParams.accessToken}`,
                        }
                    ,
                    responseHandler: 'content-type'
                }
            }
        }),
    })
})
