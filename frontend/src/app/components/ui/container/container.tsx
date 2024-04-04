import {FC, PropsWithChildren} from "react";
import classes from "./container.module.scss";

type Props = PropsWithChildren & {
    title?: string;
}

const Container:FC<Props> = ({title, children}) => {
    return (
        <div className={classes.container}>
            {title && <h1 className={classes.container__title}>{title}</h1>}
            {children}
        </div>
    );
};

export default Container;