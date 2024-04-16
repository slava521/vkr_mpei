export type UserType = {
    access: string,
    refresh: string
}

export type UserInformationType = {
    id: number,
    username: string
}

export type AuthQueryType = {
    username: string,
    password: string
}

export type RegisterQueryType = {
    username: string,
    password: string,
    re_password: string
}

export type RefreshQueryType = {
    refresh: string
}

export type AccessType = {
    access: string
}
export type TokenQueryType = {
    token: string
}
