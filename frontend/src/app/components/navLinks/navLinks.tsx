'use client'

import classes from "./navLinks.module.scss";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FC} from "react";
import {LINKS} from "@/app/shared/consts/consts";
import {useAppSelector} from "@/lib/hooks";
import {userAPI} from "@/lib/services/UserService";

const NavLinks: FC = () => {
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const {isLoading: verifyLoading, error} = userAPI.useVerifyUserQuery({token: access})
    const pathname = usePathname()
    const isAuthenticated = !verifyLoading && !error

    return (
        <nav className={classes.nav}>
            <ul className={classes.nav__list}>
                {LINKS.map(link => {
                    const isCurrentPage = link.mainLink === pathname || link.graphLink === pathname

                    return (
                        <li key={link.mainLink}>
                            <Link
                                className={
                                    `${classes.nav__link} ${
                                        !!link.graphLink && isAuthenticated ? classes.nav__link__sub : ''
                                    } ${isCurrentPage ? classes.nav__link__active : ''}`
                                }
                                href={link.mainLink}
                            >
                                {link.name}
                                <span></span>
                            </Link>
                            {!!link.graphLink && isAuthenticated && (
                                <ul className={classes.nav__sub_list}>
                                    <li>
                                        <Link href={link.mainLink} className={classes.nav__sub_list__link}>
                                            Таблица
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={link.graphLink} className={classes.nav__sub_list__link}>
                                            Графики
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default NavLinks;