'use client'

import classes from "./navLinks.module.scss";
import Link from "next/link";
import {usePathname} from "next/navigation";

type links = {
    name: string,
    mainLink: string,
    graphLink?: string
}[]

const LINKS: links = [
    {
        name: 'Главная',
        mainLink: '/'
    },
    {
        name: 'Данные с метеостанции',
        mainLink: '/meteo-data',
        graphLink: '/meteo-data/chart'
    },
    {
        name: 'Данные с ветряного модуля',
        mainLink: '/wind-data',
        graphLink: '/wind-data/chart'
    },
    {
        name: 'Данные с инвертора',
        mainLink: '/invertor-data',
        graphLink: '/invertor-data/chart'
    }
]

const NavLinks = () => {
    const pathname = usePathname()
    console.log(pathname)

    return (
        <nav className={classes.nav}>
            <ul className={classes.nav__list}>
                {LINKS.map(link => {
                    const isCurrentPage = link.mainLink === pathname || link.graphLink === pathname
                    return (
                        <li key={link.mainLink}>
                            <Link
                                className={`${classes.nav__link} ${link.graphLink ? classes.nav__link__sub : ''} ${isCurrentPage ? classes.nav__link__active : ''}`}
                                href={link.mainLink}
                            >
                                {link.name}
                                <span></span>
                            </Link>
                            {link.graphLink && (
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