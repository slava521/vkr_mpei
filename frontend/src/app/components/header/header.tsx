import classes from "./header.module.scss";
import NavLinks from "@/app/components/navLinks/navLinks";
import {FC} from "react";
import AuthButtons from "@/app/components/authButtons/authButtons";
import Container from "@/app/components/ui/container/container";

const Header:FC = () => {
    const isAuthenticated = true //TODO авторизация

    return (
        <header className={classes.header}>
            <Container>
                <div className={classes.header__body}>
                    <div className={classes.header__logo}>
                        <img src='/logompei.png' alt='MPEI'/>
                    </div>
                    <NavLinks isAuthenticated={isAuthenticated}/>
                    <AuthButtons isAuthenticated={isAuthenticated}/>
                </div>
            </Container>
        </header>
    );
};

export default Header;