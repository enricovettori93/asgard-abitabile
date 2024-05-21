import {ReactNode, useRef} from "react";
import Card from "@/components/card";
import classNames from "classnames";
import useEscListener from "@/hooks/useEscListener";
import useClickOutside from "@/hooks/useClickOutside";

interface commonProps {
    children: ReactNode
    className?: string
}

const ModalTitle = ({children, className = ""}: commonProps) => {
    return (
        <div className={`${className} modal__title text-xl font-semibold`}>{children}</div>
    )
}

const ModalContent = ({children, className = ""}: commonProps) => {
    return (
        <div className={`${className} modal__content mt-5`}>{children}</div>
    )
}

interface modalContainerProps extends commonProps {
    closeModal: () => void
}

const ModalContainer = ({children, closeModal, className = ""}: modalContainerProps) => {
    const ref = useRef(null);
    const cardClasses = classNames({
        "relative transition-all": true,
        [className]: true
    });

    useClickOutside(ref, closeModal);
    useEscListener(closeModal);

    return (
        <Card ref={ref} className={cardClasses}>
            <button onClick={closeModal} className="mt-4 absolute top-0 right-0 flex flex-col">
                <i className="fi fi-tr-circle-xmark"></i>
            </button>
            {children}
        </Card>
    )
}

export default {
    Container: ModalContainer,
    Title: ModalTitle,
    Content: ModalContent
}
