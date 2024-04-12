'use client'

import {FC} from "react";
import classes from "./authButtons.module.scss";
import Link from "next/link";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setTokens, setUsername} from "@/lib/reducers/userSlice";

const AuthButtons: FC = () => {
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const {isLoading, error} = userAPI.useVerifyUserQuery({token: access},{
        pollingInterval: 60000
    })
    const {currentData} = userAPI.useGetUserInformationQuery({access})
    const [logout, {isLoading:logoutLoading}] = userAPI.useLogoutUserMutation()
    const dispatch = useAppDispatch()

    const handleLogout = ()=> {
        logout({refresh})
        dispatch(setTokens({access: '', refresh: ''}))
        dispatch(setUsername({username: ''}))
    }

    return (
        <div className={classes.authButtons}>
            {!error && <>
                <div className={classes.authButtons__icon}>
                    <img src='/userIcon.svg' alt='User'/>
                </div>
                <span>{currentData?.username}</span>
                <button className={`${classes.authButtons__btn} ${classes.authButtons__btn__logout} ${
                    logoutLoading ? classes.authButtons__btn__logout__loading : ''
                }`} onClick={()=>handleLogout}>Выход</button>
            </>
            }
            {!!error && <>
                <Link href='/login' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link}`}>
                    Войти
                </Link>
                <Link href='/reg' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link}`}>
                    Регистрация
                </Link>
            </>
            }
        </div>
    );
};

export default AuthButtons;