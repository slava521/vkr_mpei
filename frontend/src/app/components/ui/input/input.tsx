"use client"

import {FC, HTMLInputTypeAttribute, useId} from "react";
import classes from "./input.module.scss";
import Image from "next/image";

type Props = {
    label: string,
    inputType: HTMLInputTypeAttribute,
    name: string,
    placeholder?: string,
    inputId?: string,
    iconSrc?: string
}

const Input: FC<Props> = (
    {
        label,
        inputType,
        name,
        placeholder,
        inputId,
        iconSrc
    }) => {
    const id = useId()

    return (
        <div className={classes.input}>
            {iconSrc && (
                <div className={classes.input__icon}>
                    <img src={iconSrc} alt="Icon"/>
                </div>
            )}
            <input
                id={inputId ?? id}
                className={classes.input__field}
                name={name}
                type={inputType}
                placeholder={placeholder}
            />
            <label htmlFor={inputId ?? id} className={classes.input__label}>{label}</label>
        </div>
    );
};

export default Input;