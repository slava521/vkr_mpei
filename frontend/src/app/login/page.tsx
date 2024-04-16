'use client'

import React from "react";

import {useRouter} from "next/navigation";

import AuthPage from "@/app/components/pages/authPage/authPage";
import {InputsType} from "@/app/shared/types/types";
import {useAppDispatch} from "@/lib/hooks";
import {setTokens} from "@/lib/reducers/userSlice";
import {userAPI} from "@/lib/services/UserService";

const INPUTS: InputsType = [
    {
        label: 'Имя пользователя',
        name: 'username',
        type: 'text',
    },
    {
        label: 'Пароль',
        name: 'password',
        type: 'password',
    },
]

const Page = () => {
    const [auth, {isLoading, error}] = userAPI.useAuthUserMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const authResult = await auth({username, password})
        if (!('error' in authResult)) {
            dispatch(setTokens(authResult.data))
            router.push("/")
        }
    }

    return (
        <AuthPage
            title='Авторизация'
            inputs={INPUTS}
            submitName='Войти'
            link='/reg'
            linkName='Зарегистрироваться'
            onSubmit={handleSubmit}
            loading={isLoading}
            error={error}
        />
    );
};

export default Page;
