"use client"

import {createContext, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";

interface UiContextShape {
    modal: ReactNode | null
    setModal: (modal: ReactNode) => void
    removeModal: () => void
}

const initialValue: UiContextShape = {
    modal: null,
    setModal: (modal: ReactNode) => {},
    removeModal: () => {}
}

export const UiContext = createContext(initialValue);

const UiContextProvider = ({children}: {children: ReactNode}) => {
    const [modal, setModal] = useState<ReactNode | null>(null);

    useEffect(() => {
        document.querySelector("body")!.style.overflow = modal ? "hidden" : "initial";

        return (() => {
            document.querySelector("body")!.style.overflow = "initial";
        })
    }, [modal]);

    const removeModal = () => {
        setModal(null);
    }

    const value = {
        modal,
        setModal,
        removeModal
    }

    const containerClasses = classNames({
        "modal inset-0 fixed flex items-center justify-center bg-white bg-opacity-80 transition-all": true,
        "invisible opacity-0 pointer-events-none -z-50": !modal,
        "visible opacity-100 z-50 w-screen h-screen": modal
    });

    const modalClasses = classNames({
        "modal__content relative": true,
        "w-52 h-0": !modal,
        "w-1/2 h-auto": modal
    });

    return (
        <UiContext.Provider value={value}>
            {children}
            <div className={containerClasses}>
                <div className={modalClasses}>{modal}</div>
            </div>
        </UiContext.Provider>
    )
}


export default UiContextProvider;
