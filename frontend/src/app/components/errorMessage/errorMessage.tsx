import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {FC} from "react";
import classes from "./errorMessage.module.scss";

type Props = {
    error: FetchBaseQueryError | SerializedError | undefined,
    loading: boolean,
    className?: string
}
const ErrorMessage: FC<Props> = ({error, loading, className}) => {
    if (error && !loading) {
        if ('status' in error) {
            const errMsg = 'error' in error ? error.error : Object.values(error.data as Object)[0]
            return <div className={`${classes.errorMessage} ${className ?? ''}`}>{errMsg}</div>
        }
        return <div className={`${classes.errorMessage} ${className ?? ''}`}>{error.message}</div>
    }
    return null
};

export default ErrorMessage;