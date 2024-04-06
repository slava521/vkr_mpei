import classes from "./authPage.module.scss";
import {FC} from "react";
import Input from "@/app/components/ui/input/input";
import Button from "@/app/components/ui/button/button";
import {InputsType} from "@/app/shared/types/types";
import Link from "next/link";

type Props = {
    title: string,
    inputs: InputsType,
    submitName: string,
    link: string,
    linkName: string,
}

const AuthPage:FC<Props> = ({title, inputs, submitName, link, linkName}) => {
    return (
        <div className={classes.authPage}>
            <div className={classes.authPage__body}>
                <div className={classes['authPage__form--left']}/>
                <form className={classes.authPage__form}>
                    <h4 className={classes.authPage__form__title}>{title}</h4>
                    {inputs.map(input => (
                        <Input
                            key={input.id}
                            inputType={input.type}
                            name={input.id}
                            inputId={input.id}
                            label={input.placeholder}
                            placeholder={input.placeholder}
                            iconSrc={input.type === 'text' ? '/mailIcon.svg' : '/passwordIcon.svg'}
                        />
                    ))}
                    <Button buttonType='submit' text={submitName} right/>
                    <Link href={link} className={classes.authPage__form__link}>{linkName}</Link>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;