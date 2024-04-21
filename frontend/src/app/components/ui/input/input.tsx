"use client"

import {FC, HTMLInputTypeAttribute, useId} from "react";

import classes from "./input.module.scss";

type Props = {
    label: string,
    inputType: HTMLInputTypeAttribute,
    name: string,
    iconSrc?: string,
    defaultValue?: string,
    required?: boolean
}

const Input: FC<Props> = (
    {
        label,
        inputType,
        name,
        iconSrc,
        defaultValue,
        required
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
                id={id}
                className={classes.input__field}
                name={name}
                type={inputType}
                placeholder={label}
                defaultValue={defaultValue}
                required={required}
                min={inputType === 'datetime-local' ? '1900-01-01T00:00' : undefined}
                max={inputType === 'datetime-local' ? '2100-12-31T23:59' : undefined}
            />
            <label htmlFor={id} className={classes.input__label}>{label}</label>
        </div>
    );
};

export default Input;
