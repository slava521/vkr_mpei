export type EndpointType = 'meteo' | 'wind' | 'invertor'

export type TableRequestType = {
    endpoint: EndpointType,
    page: number,
    dateFrom: string,
    dateTo: string,
}

export type TableResponseType = Record<string, string>[]

export type ChartRequestType = {
    endpoint: EndpointType
    param: string
    dateFrom: string,
    dateTo: string,
}

export type ChartResponseType = {
    labels: string[]
    values: number[]
}

export type DownloadRequestType = {
    endpoint: EndpointType
    fileType: 'csv' | 'xlsx'
    dateFrom: string,
    dateTo: string,
}