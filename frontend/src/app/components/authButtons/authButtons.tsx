'use client'

import React, {FC, useCallback, useEffect} from "react";

import Link from "next/link";

import {useConfirmModal} from "@/app/hooks/useConfirmModal";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setAccessToken, setTokens} from "@/lib/reducers/userSlice";
import {userAPI} from "@/lib/services/UserService";

import classes from "./authButtons.module.scss";

type Props = {
    closeMenu: () => void
}

const AuthButtons: FC<Props> = ({closeMenu}) => {
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const {isLoading: verifyLoading, error} = userAPI.useVerifyUserQuery({token: access}, {
        pollingInterval: 60000,
        skip: !access
    })
    const {currentData: userData, isLoading: userDataLoading} = userAPI.useGetUserInformationQuery({access})
    const [logoutRequest, {isLoading: logoutLoading}] = userAPI.useLogoutUserMutation()
    const [refreshToken, {error: refreshError, data: refreshData}] = userAPI.useRefreshUserMutation()
    const dispatch = useAppDispatch()

    const logout = useCallback(() => {
        closeMenu()
        logoutRequest({refresh})
        dispatch(setTokens({access: '', refresh: ''}))
    }, [refresh])
    const [ConfirmLogoutModal, openConfirmLogoutModal] = useConfirmModal(logout, ', что хотите выйти')

    useEffect(() => {
        if (access && refresh) {
            refreshToken({refresh})
        }
    }, [refresh])

    useEffect(() => {
        if (access && error) {
            refreshToken({refresh})
        }
    }, [access, error, verifyLoading])

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
            </>
            }
            {(!!error || !access) && <>
                <div className={classes.authButtons__loading}>
                    <Link href='/login' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link} ${
                        verifyLoading ? classes.authButtons__btn__link__loading : ''
                    }`} onClick={closeMenu}>
                        Войти
                    </Link>
                </div>
                <div className={classes.authButtons__loading}>
                    <Link href='/reg' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link} ${
                        verifyLoading ? classes.authButtons__btn__link__loading : ''
                    }`} onClick={closeMenu}>
                        Регистрация
                    </Link>
                </div>
            </>}
            <ConfirmLogoutModal/>
        </div>
    );
};

export default AuthButtons;
