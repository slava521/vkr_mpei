import {FC, PropsWithChildren} from "react";
import classes from "./container.module.scss";

const Container:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default Container;