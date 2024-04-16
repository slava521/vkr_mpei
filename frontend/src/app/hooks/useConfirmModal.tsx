import {FC, useState} from "react";
import ConfirmModal from "@/app/components/confirmModal/confirmModal";

type ReturnParams = [
    confirmModal: FC,
    openModal: VoidFunction
]

export const UseConfirmModal = (onConfirm: VoidFunction, text?: string): ReturnParams => {
    const [isModalOpened, setIsModalOpened] = useState(false)

    const openModal = () => setIsModalOpened(true)
    const closeModal = () => setIsModalOpened(false)

    const confirm = () => {
        onConfirm()
        closeModal()
    }

    const Modal: FC = () => isModalOpened &&
        <ConfirmModal confirm={confirm} close={closeModal} text={text}/>

    return [Modal, openModal]
};