export type TableCols = {
    id: string,
    description: string
}[]

export type TableData = Record<string, number>[]

export type links = {
    name: string,
    mainLink: string,
    graphLink?: string
}[]