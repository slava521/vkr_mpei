'use client'

import React, {FC, memo, useState} from "react";

import Button from "@/app/components/ui/button/button";
import ModalBase from "@/app/components/ui/modalBase/modalBase";

import classes from "./confirmModal.module.scss";

type Props = {
    confirm: VoidFunction,
    close: VoidFunction,
    visible: boolean,
    text?: string,
}

const ConfirmModal: FC<Props> = memo(({confirm, close, visible, text}) => {
    const [handleClose, setHandleClose] = useState<VoidFunction>(()=>()=>{})

    return (
        <ModalBase visible={visible} close={close} setHandleClose={setHandleClose}>
            <div className={classes.confirmModal__header}>
                <h4>Подтверждение</h4>
            </div>
            <div className={classes.confirmModal__text}>
                <p>Вы уверены{text}?</p>
            </div>
            <div className={classes.confirmModal__buttons}>
                <Button buttonType='button' text='Подтвердить' onClick={confirm} small/>
                <Button buttonType='button' text='Отменить' onClick={handleClose} small/>
            </div>
        </ModalBase>
    );
});

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal;
