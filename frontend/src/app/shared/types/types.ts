export type Params = {
    id: string,
    description: string
}[]

export type TableData = Record<string, string | number>[]

export type Links = {
    name: string,
    mainLink: string,
    graphLink?: string
}[]

export type InputsType = {
    name: string,
    type: 'text' | 'password',
    label: string
}[]