import {FC} from "react";
import classes from "./authButtons.module.scss";
import Link from "next/link";

type Props = {
    isAuthenticated: boolean
}

const AuthButtons: FC<Props> = ({isAuthenticated}) => {

    return (
        <div className={classes.authButtons}>
            {isAuthenticated && <>
                <div className={classes.authButtons__icon}>
                    <img src='/userIcon.svg' alt='User'/>
                </div>
                <span>User</span> {/*TODO Имя пользователя*/}
                <button className={`${classes.authButtons__btn} ${classes.authButtons__btn__logout}`}>Выход</button>
            </>
            }
            {!isAuthenticated && <>
                <Link href='/auth' className={`${classes.authButtons__btn} ${classes.authButtons__btn__link}`}>
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