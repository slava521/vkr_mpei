import React, {FC} from 'react';
import classes from "./select.module.scss";

type Props = {
    name: string,
    options: string[],
    defaultValue?: string
}

const Select: FC<Props> = ({options, name, defaultValue}) => {
    if (options.length === 0) {
        return <div>Добавь опций!!!!</div>
    }

    return (
        <select name={name} className={classes.select} defaultValue={defaultValue}>
            {options.map(option => (
                <option key={option} className={classes.select__option} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default Select;