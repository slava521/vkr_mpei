import {FC, useState} from "react";
import ConfirmModal from "@/app/components/confirmModal/confirmModal";

type ReturnParams = [
    confirmModal: FC,
    openModal: VoidFunction
]

export const UseConfirmModal = (onConfirm: VoidFunction, text?: string): ReturnParams => {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [visible, setVisible] = useState(true)

    const openModal = () => {
        setVisible(true)
        setIsModalOpened(true)
    }
    const closeModal = () => {
        setVisible(false)
        setIsModalOpened(false)
    }

    const confirm = () => {
        onConfirm()
        closeModal()
    }

    const Modal: FC = () => isModalOpened &&
        <ConfirmModal confirm={confirm} close={closeModal} visible={visible} text={text}/>

    return [Modal, openModal]
};