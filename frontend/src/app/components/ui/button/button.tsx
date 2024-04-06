import {FC, memo} from "react";
import classes from "./button.module.scss";

type Props = {
    buttonType: 'reset' | 'submit' | 'button',
    text: string,
    right?: boolean
}

const Button: FC<Props> = memo(({buttonType, text, right}) => {
    return (
        <input type={buttonType} className={`${classes.button} ${right ? classes['button--right'] : ''}`} value={text}/>
    );
});

export default Button;