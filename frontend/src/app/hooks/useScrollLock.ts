import {useEffect} from "react";

export const useScrollLock = (lock: boolean) => {
    useEffect(() => {
        document.body.style.overflowY = lock ? 'hidden' : 'auto'
    },[lock])
};
