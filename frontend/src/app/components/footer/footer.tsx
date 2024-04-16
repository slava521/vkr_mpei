import Container from "@/app/components/ui/container/container";

import classes from "./footer.module.scss";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.footer__body}>
                    <div className={classes['footer__body--left']}>
                        <span>© 2023-2024 НИУ МЭИ, кафедра ВМСС</span>
                        <span>|</span>
                        <span>Токмаков Матвей, Семенов Святослав</span>
                    </div>
                    <div className={classes['footer__body--right']}>
                        <a
                            className={classes.footer__logo}
                            href="https://mpei.ru/Structure/Universe/avti/Pages/default.aspx"
                            target='_blank'
                        >
                            <img src="/ivti.png" alt="IVTI"/>
                        </a>
                        <a
                            className={classes.footer__logo}
                            href="https://mpei.ru/structure/universe/IHRE/Pages/default.aspx"
                            target='_blank'
                        >
                            <img src="/igvie.png" alt="IHRE"/>
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
