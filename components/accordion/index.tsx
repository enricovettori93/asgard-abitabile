"use client";

import {ReactNode, useState} from 'react';
import classNames from "classnames";

interface props {
    children: ReactNode
    title: string
    isOpen?: boolean
    className?: string
}

const Accordion = ({children, className = "", title, isOpen = false}: props) => {
    const [open, setIsOpen] = useState(isOpen);

    const containerClasses = classNames({
        "flex flex-col relative transition-all": true,
        [className]: !!className
    });

    const arrowClasses = classNames({
        "absolute right-0 top-0 transition-all px-0 py-2": true,
        "rotate-180": open
    });

    const contentClasses = classNames({
        "transition-all overflow-hidden": true,
        "h-0": !open,
        "mt-5 h-auto": open
    });

    return (
        <div className={containerClasses}>
            <div role="button" onClick={() => setIsOpen(!open)} className="flex justify-between items-center">
                <span className="text-2xl md:text-3xl">{title}</span>
                <button className={arrowClasses}>
                    <i className="fi fi-rr-angle-small-down"></i>
                </button>
            </div>
            <div className={contentClasses}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
