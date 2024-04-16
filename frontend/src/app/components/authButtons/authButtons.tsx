'use client'

import React, {FC, useEffect} from "react";
import classes from "./authButtons.module.scss";
import Link from "next/link";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setAccessToken, setTokens} from "@/lib/reducers/userSlice";
import {UseConfirmModal} from "@/app/hooks/useConfirmModal";

const AuthButtons: FC = () => {
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const {isLoading: verifyLoading, error} = userAPI.useVerifyUserQuery({token: access}, {
        pollingInterval: 60000,
        skip: !access
    })
    const {currentData: userData, isLoading: userDataLoading} = userAPI.useGetUserInformationQuery({access})
    const [logoutRequest, {isLoading: logoutLoading}] = userAPI.useLogoutUserMutation()
    const [refreshToken, {error: refreshError, data: refreshData}] = userAPI.useRefreshUserMutation()
    const dispatch = useAppDispatch()

    const logout = () => {
        logoutRequest({refresh})
        dispatch(setTokens({access: '', refresh: ''}))
    }
    const [ConfirmLogoutModal, openConfirmLogoutModal] = UseConfirmModal(logout, ', что хотите выйти')

    useEffect(() => {
        if (access && refresh) {
            refreshToken({refresh})
        }
    }, [refresh])

    useEffect(() => {
        if (access && error) {
            refreshToken({refresh})
        }
    }, [error, verifyLoading])

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

    if (userDataLoading) {
        return <div className={classes.authButtons}>Загрузка...</div>
    }

    return (
        <div className={classes.authButtons}>
            {(!error && !!access) && <>
                <div className={classes.authButtons__icon}>
                    <img src='/userIcon.svg' alt='User'/>
                </div>
                <span>{userData?.username}</span>
                <div className={classes.authButtons__loading}>
                    <button className={`${classes.authButtons__btn} ${classes.authButtons__btn__logout} ${
                        logoutLoading || verifyLoading ? classes.authButtons__btn__logout__loading : ''
                    }`} onClick={openConfirmLogoutModal}>
                        Выход
                    </button>
                </div>
                <ConfirmLogoutModal/>
            </>
            }
            {(!!error || !access) && <>
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