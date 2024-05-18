"use client"

import {useEffect} from "react";

const useEscListener = (cb: Function) => {
    useEffect(() => {
        const handleEsc = (e: any) => {
            const {code} = e;
            code === "Escape" && cb();
        }

        typeof document !== "undefined" && document.addEventListener("keydown", handleEsc);

        return (() => {
            typeof document !== "undefined" && document.removeEventListener("keydown", handleEsc);
        });
    }, [cb]);
}

export default useEscListener;
