"use client"

import {FC, useId} from "react";
import classes from "./checkbox.module.scss";

type Props = {
    label: string,
    name: string,
}

const Checkbox:FC<Props> = ({label, name}) => {
    const id = useId()

    return (
        <div className={classes.checkbox}>
            <input id={id} type="checkbox" name={name} className={classes.checkbox__input}/>
            <label htmlFor={id} className={classes.checkbox__input__label}>{label}</label>
        </div>
    );
};

export default Checkbox;