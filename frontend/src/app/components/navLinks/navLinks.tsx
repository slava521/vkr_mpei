'use client'

import {FC} from "react";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {useUserVerify} from "@/app/hooks/useUserVerify";
import {LINKS} from "@/app/shared/consts/consts";

import classes from "./navLinks.module.scss";

const NavLinks: FC = () => {
    const pathname = usePathname()
    const [isAuthenticated] = useUserVerify()

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
