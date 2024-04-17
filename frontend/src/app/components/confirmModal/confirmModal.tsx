'use client'

import React, {FC, memo, useEffect, useState} from "react";

import Button from "@/app/components/ui/button/button";

import classes from "./confirmModal.module.scss";

type Props = {
    confirm: VoidFunction,
    close: VoidFunction,
    visible: boolean,
    text?: string,
}

const ConfirmModal: FC<Props> = memo(({confirm, close, visible, text}) => {
    const [visibilityClass, setVisibilityClass] = useState('')
    useEffect(() => {
        visible && setVisibilityClass(classes['confirmModal--show'])
    }, [visible]);

    const handleClose = () => {
        setVisibilityClass('')
        setTimeout(()=>close(), 200)
    }

    return (
        <div className={`${classes.confirmModal} ${visibilityClass}`}>
            <div onClick={handleClose} className={classes.confirmModal__bg}/>
            <div className={classes.confirmModal__modal}>
                <div className={classes.confirmModal__modal__header}>
                    <h4>Подтверждение</h4>
                </div>
                <div className={classes.confirmModal__modal__text}>
                    <p>Вы уверены{text}?</p>
                </div>
                <div className={classes.confirmModal__modal__buttons}>
                    <Button buttonType='button' text='Подтвердить' onClick={confirm} small/>
                    <Button buttonType='button' text='Отменить' onClick={handleClose} small/>
                </div>
            </div>
        </div>
    );
});

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal;
