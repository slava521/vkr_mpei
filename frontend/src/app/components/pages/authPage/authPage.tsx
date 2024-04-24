'use client'

import React, {FC, useEffect} from "react";

import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Link from "next/link";
import {useRouter} from "next/navigation";

import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import Button from "@/app/components/ui/button/button";
import Input from "@/app/components/ui/input/input";
import {useUserVerify} from "@/app/hooks/useUserVerify";
import {InputsType} from "@/app/shared/types/types";

import classes from "./authPage.module.scss";

type Props = {
    title: string,
    inputs: InputsType,
    submitName: string,
    link: string,
    linkName: string,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    error: FetchBaseQueryError | SerializedError | undefined,
    loading: boolean
}

const AuthPage: FC<Props> = (
    {
        title,
        inputs,
        submitName,
        link,
        linkName,
        onSubmit,
        error,
        loading
    }) => {
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
                <div className={classes.authPage__gradient}/>
                <form className={classes.authPage__form} onSubmit={onSubmit}>
                    <h4 className={classes.authPage__form__title}>{title}</h4>
                    <ErrorMessage error={error} loading={loading} className={classes.authPage__form__error}/>
                    {inputs.map(input => (
                        <Input
                            key={input.name}
                            inputType={input.type}
                            name={input.name}
                            label={input.label}
                            iconSrc={input.type === 'text' ? '/mailIcon.svg' : '/passwordIcon.svg'}
                            required
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
