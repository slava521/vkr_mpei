import classes from "./header.module.scss";
import NavLinks from "@/app/components/navLinks/navLinks";

const Header = () => {

    return (
        <header className={classes.header}>
            <div>
                <div className={classes.header__body}>
                    <div className={classes.header__logo}>
                        <img/>
                    </div>
                    <NavLinks/>
                    <div></div>
                </div>
            </div>
        </header>
    );
};

export default Header;