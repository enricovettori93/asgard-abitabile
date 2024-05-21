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

    const overlayClasses = classNames({
        "fixed w-screen h-screen flex items-center justify-center bg-white/75 transition-all top-0 bottom-0 z-40": true,
        "invisible opacity-0 pointer-events-none": !modal,
        "visible opacity-100": modal
    });

    const modalClasses = classNames({
        "modal-container relative": true,
        "w-52 h-0": !modal,
        "w-1/2 h-auto": modal
    });

    return (
        <UiContext.Provider value={value}>
            {children}
            <div className={overlayClasses}>
                <div className={modalClasses}>{modal}</div>
            </div>
        </UiContext.Provider>
    )
}


export default UiContextProvider;
