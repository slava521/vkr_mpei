'use client'

import React, {FC, useState} from "react";

import AppThemeButton from "@/app/components/appThemeButton/appThemeButton";
import AuthButtons from "@/app/components/authButtons/authButtons";
import NavLinks from "@/app/components/navLinks/navLinks";
import Container from "@/app/components/ui/container/container";
import {useScrollLock} from "@/app/hooks/useScrollLock";

import classes from "./header.module.scss";

const Header: FC = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    useScrollLock(isMenuOpened)

    const closeMenu = () => setIsMenuOpened(false)
    const openMenu = () => setIsMenuOpened(true)

    return (
        <header className={classes.header}>
            <Container>
                <div className={classes.header__body}>
                    <div className={classes.header__body__logo}>
                        <img src='/logompei.svg' alt='MPEI'/>
                    </div>
                    <div className={`${classes.header__body__menu} ${
                        isMenuOpened ? classes['header__body__menu--opened'] : ''
                    }`}>
                        <NavLinks closeMenu={closeMenu}/>
                        <AuthButtons closeMenu={closeMenu}/>
                    </div>
                    <AppThemeButton/>
                    <button className={classes.header__body__menu_img} onClick={openMenu}>
                        <img src="/menu.svg" alt="Меню"/>
                    </button>
                    <div className={classes.header__body__menu__bg} onClick={closeMenu}/>
                </div>
            </Container>
        </header>
    );
};

export default Header;
