import {FC, memo} from "react";
import classes from "./button.module.scss";

type Props = {
    buttonType: 'reset' | 'submit' | 'button',
    text: string,
    right?: boolean,
    small?: boolean,
    onClick?: VoidFunction,
    disabled?: boolean
}

const Button: FC<Props> = memo((
    {
        buttonType,
        text,
        right,
        small,
        onClick,
        disabled
    }) => {
    return (
        <div className={classes.button__loadingCursor}>
            <input
                type={buttonType}
                className={`${classes.button} ${right ? classes['button--right'] : ''} ${
                    small ? classes['button--small'] : ''
                } ${
                    disabled ? classes['button--disabled'] : ''
                }`}
                value={text}
                onClick={onClick}
                disabled={disabled}
            />
        </div>
    );
});

export default Button;