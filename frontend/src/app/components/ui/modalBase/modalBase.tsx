'use client'

import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import classes from "./modalBase.module.scss";

type Props = PropsWithChildren & {
    close: VoidFunction,
    visible: boolean,
    setHandleClose?: React.Dispatch<React.SetStateAction<VoidFunction>>
}

const ModalBase:FC<Props> = ({close, visible, children, setHandleClose}) => {
    const [visibilityClass, setVisibilityClass] = useState('')
    useEffect(() => {
        visible && setVisibilityClass(classes['modal--show'])
    }, [visible]);

    const handleClose = () => {
        setVisibilityClass('')
        setTimeout(()=>close(), 200)
    }

    useEffect(() => {
        setHandleClose && setHandleClose(() => handleClose)
    }, [])

    return (
        <div className={`${classes.modal} ${visibilityClass}`}>
            <div onClick={handleClose} className={classes.modal__bg}/>
            <div className={classes.modal__body}>
                {children}
            </div>
        </div>
    );
};

export default ModalBase;
