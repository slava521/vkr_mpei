'use client'

import classes from "./authPage.module.scss";
import React, {FC, useEffect} from "react";
import Input from "@/app/components/ui/input/input";
import Button from "@/app/components/ui/button/button";
import {InputsType} from "@/app/shared/types/types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {userAPI} from "@/lib/services/UserService";
import {useUserVerify} from "@/app/hooks/useUserVerify";

type Props = {
    title: string,
    inputs: InputsType,
    submitName: string,
    link: string,
    linkName: string,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

const AuthPage: FC<Props> = ({title, inputs, submitName, link, linkName, onSubmit}) => {
    const {replace} = useRouter()
    const [isAuthorized, verifyLoading] = useUserVerify()

    useEffect(() => {
        if (isAuthorized && !verifyLoading) {
            replace('/')
        }
    }, [isAuthorized, verifyLoading]);

    if (verifyLoading || isAuthorized) {
        return <div className={classes.authPage}>Загрузка...</div>
    }

    return (
        <div className={classes.authPage}>
            <div className={classes.authPage__body}>
                <div className={classes['authPage__form--left']}/>
                <form className={classes.authPage__form} onSubmit={onSubmit}>
                    <h4 className={classes.authPage__form__title}>{title}</h4>
                    {inputs.map(input => (
                        <Input
                            key={input.name}
                            inputType={input.type}
                            name={input.name}
                            label={input.label}
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