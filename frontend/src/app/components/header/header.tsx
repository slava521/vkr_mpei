import {FC} from "react";

import AuthButtons from "@/app/components/authButtons/authButtons";
import NavLinks from "@/app/components/navLinks/navLinks";
import Container from "@/app/components/ui/container/container";

import classes from "./header.module.scss";

const Header:FC = () => {
    return (
        <header className={classes.header}>
            <Container>
                <div className={classes.header__body}>
                    <div className={classes.header__logo}>
                        <img src='/logompei.svg' alt='MPEI'/>
                    </div>
                    <NavLinks/>
                    <AuthButtons/>
                </div>
            </Container>
        </header>
    );
};

export default Header;
