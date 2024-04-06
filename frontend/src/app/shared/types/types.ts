export type TableCols = {
    id: string,
    description: string
}[]

export type TableData = Record<string, number>[]

export type Links = {
    name: string,
    mainLink: string,
    graphLink?: string
}[]

export type InputsType = {
    id: string,
    type: 'text' | 'password',
    placeholder: string
}[]