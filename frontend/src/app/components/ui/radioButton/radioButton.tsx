"use client"

import React, {FC, useId} from 'react';
import classes from "./radioButton.module.scss";

type Props = {
    value: string,
    name: string,
    label: string,
    checked?: boolean
}

const RadioButton:FC<Props> = ({value, name, label, checked}) => {
    const id = useId()

    return (
        <div>
            <input id={id} type="radio" className={classes.radioButton} name={name} value={value} defaultChecked={!!checked}/>
            <label htmlFor={id} className={classes.radioButton__label}>{label}</label>
        </div>
    );
};

export default RadioButton;