'use client'

import {FC, useEffect} from "react";
import classes from "./authButtons.module.scss";
import Link from "next/link";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setAccessToken, setTokens} from "@/lib/reducers/userSlice";

const AuthButtons: FC = () => {
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const {isLoading: verifyLoading, error} = userAPI.useVerifyUserQuery({token: access}, {
        pollingInterval: 60000
    })
    const {currentData: userData, isLoading: userDataLoading} = userAPI.useGetUserInformationQuery({access})
    const [logout, {isLoading: logoutLoading}] = userAPI.useLogoutUserMutation()
    const [refreshToken, {error: refreshError, data: refreshData}] = userAPI.useRefreshUserMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (access && refresh) {
            refreshToken({refresh})
        }
    }, [refresh])

    useEffect(() => {
        if (!!refreshError) {
            dispatch(setTokens({access: '', refresh: ''}))
        }
    }, [refreshError])

    useEffect(() => {
        if (!refreshError && refreshData?.access) {
            dispatch(setAccessToken({access: refreshData?.access}))
            setTimeout(() => refreshToken({refresh}), 240000)
        }
    }, [refreshData])

    const handleLogout = () => {
        logout({refresh})
        dispatch(setTokens({access: '', refresh: ''}))
    }

    if (userDataLoading) {
        return <div className={classes.authButtons}>Загрузка...</div>
    }

    return (
        <div className={classes.authButtons}>
            {!error && <>
                <div className={classes.authButtons__icon}>
                    <img src='/userIcon.svg' alt='User'/>
                </div>
                <span>{userData?.username}</span>
                <div className={classes.authButtons__loading}>
                    <button className={`${classes.authButtons__btn} ${classes.authButtons__btn__logout} ${
                        logoutLoading || verifyLoading ? classes.authButtons__btn__logout__loading : ''
                    }`} onClick={handleLogout}>
                        Выход
                    </button>
                </div>
            </>
            }
            {!!error && <>
                <div className={classes.authButtons__loading}>
                    <Link href='/login' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link} ${
                        verifyLoading ? classes.authButtons__btn__link__loading : ''
                    }`}>
                        Войти
                    </Link>
                </div>
                <div className={classes.authButtons__loading}>
                    <Link href='/reg' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link} ${
                        verifyLoading ? classes.authButtons__btn__link__loading : ''
                    }`}>
                        Регистрация
                    </Link>
                </div>
            </>
            }
        </div>
    );
};

export default AuthButtons;