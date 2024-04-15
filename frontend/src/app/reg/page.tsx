'use client'

import {InputsType} from "@/app/shared/types/types";
import AuthPage from "@/app/components/pages/authPage/authPage";
import React from "react";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch} from "@/lib/hooks";
import {setTokens} from "@/lib/reducers/userSlice";
import {useRouter} from "next/navigation";

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
    {
        label: 'Повтор пароля',
        name: 're_password',
        type: 'password',
    },
]

const Page = () => {
    const [register, {error: regError, isLoading: regLoading}] = userAPI.useRegisterUserMutation()
    const [auth, {error: authError, isLoading: authLoading}] = userAPI.useAuthUserMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const rePassword = formData.get('re_password') as string;
        const regResult = await register({username, password, re_password: rePassword})
        if (!('error' in regResult)) {
            const authResult = await auth({
                username, password
            })
            if (!('error' in authResult)) {
                dispatch(setTokens(authResult.data))
                router.push("/")
            }
        }
    }

    return (
        <AuthPage
            title='Регистрация'
            inputs={INPUTS}
            submitName='Зарегистрироваться'
            link='/login'
            linkName='Есть аккаунт?'
            onSubmit={handleSubmit}
            error={regError || authError}
            loading={regLoading || authLoading}
        />
    );
};

export default Page;