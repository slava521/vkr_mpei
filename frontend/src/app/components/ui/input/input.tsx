"use client"

import {FC, HTMLInputTypeAttribute, useId} from "react";
import classes from "./input.module.scss";

type Props = {
    label: string,
    inputType: HTMLInputTypeAttribute
    placeholder?: string
}

const Input:FC<Props> = ({label,inputType, placeholder}) => {
    const id = useId()

    return (
        <div className={classes.input}>
            <input id={id} className={classes.input__field} type={inputType} placeholder={placeholder}/>
            <label htmlFor={id} className={classes.input__label}>{label}</label>
        </div>
    );
};

export default Input;