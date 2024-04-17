import {FC} from "react";

import ModalBase from "@/app/components/ui/modalBase/modalBase";
import {Params} from "@/app/shared/types/types";

import classes from "./paramsInformationModal.module.scss";

type Props = {
    close: VoidFunction,
    visible: boolean,
    paramsInformation: Params
}

const ParamsInformationModal: FC<Props> = ({close, visible, paramsInformation}) => {
    return (
        <ModalBase close={close} visible={visible}>
            <div className={classes.paramsInformationModal}>
                {paramsInformation.map((param) =>
                    <p key={param.id}>{param.id}: {param.description}</p>
                )}
            </div>
        </ModalBase>
    );
};

export default ParamsInformationModal;
