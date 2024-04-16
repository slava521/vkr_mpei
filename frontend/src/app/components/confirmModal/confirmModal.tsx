'use client'

import React, {FC, useEffect, useState} from "react";
import Button from "@/app/components/ui/button/button";
import classes from "./confirmModal.module.scss";

type Props = {
    confirm: VoidFunction,
    close: VoidFunction,
    text?: string,
}

const ConfirmModal: FC<Props> = ({confirm, close, text}) => {
    const [visibilityClass, setVisibilityClass] = useState('')
    useEffect(() => {
        setVisibilityClass(classes['confirmModal--show'])
        return () => {
            setVisibilityClass('')
        }
    }, []);

    return (
        <div className={`${classes.confirmModal} ${visibilityClass}`}>
            <div onClick={close} className={classes.confirmModal__bg}/>
            <div className={classes.confirmModal__modal}>
                <div className={classes.confirmModal__modal__header}>
                    <h4>Подтверждение</h4>
                </div>
                <div className={classes.confirmModal__modal__text}>
                    <p>Вы уверены{text}?</p>
                </div>
                <div className={classes.confirmModal__modal__buttons}>
                    <Button buttonType='button' text='Подтвердить' onClick={confirm} small/>
                    <Button buttonType='button' text='Отменить' onClick={close} small/>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;