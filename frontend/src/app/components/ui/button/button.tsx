import {FC, memo} from "react";
import classes from "./button.module.scss";

type Props = {
    buttonType: 'reset' | 'submit' | 'button',
    text: string
}

const Button: FC<Props> = memo(({buttonType, text}) => {
    return (
        <input type={buttonType} className={classes.button} value={text}/>
    );
});

export default Button;