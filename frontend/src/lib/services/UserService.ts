import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    AccessType,
    AuthQueryType,
    RefreshQueryType,
    RegisterQueryType, TokenQueryType,
    UserInformationType,
    UserType
} from "@/lib/models/userType";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_LINK + 'auth/'
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<UserInformationType, RegisterQueryType>({
            query: (body) => ({
                url: 'users/',
                method: 'POST',
                body
            })
        }),
        authUser: build.mutation<UserType, AuthQueryType>({
            query: (body) => ({
                url: 'jwt/create/',
                method: 'POST',
                body
            })
        }),
        verifyUser: build.query<null, TokenQueryType>({
            query: (body) => ({
                url: 'jwt/verify/',
                method: 'POST',
                body
            })
        }),
        refreshUser: build.mutation<AccessType, RefreshQueryType>({
            query: (body) => ({
                url: 'jwt/refresh/',
                method: 'POST',
                body
            })
        }),
        logoutUser: build.mutation<UserType, RefreshQueryType>({
            query: (body) => ({
                url: 'jwt/logout/',
                method: 'POST',
                body
            })
        }),
        getUserInformation: build.query<UserInformationType, AccessType>({
            query: (params) => ({
                url: 'users/me/',
                headers: {'Authorization': `Bearer ${params.access}`}
            })
        })
    })
})
