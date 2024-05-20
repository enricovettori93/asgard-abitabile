"use client"

import {useEffect, useRef, useState} from "react";
import LocationSearchForm from "@/components/forms/location-search-form";
import useClickOutside from "@/hooks/useClickOutside";
import useEscListener from "@/hooks/useEscListener";
import classNames from "classnames";
import {usePathname} from "next/navigation";

const LocationListFilters = () => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    }

    useClickOutside(ref, closeMenu);
    useEscListener(closeMenu);

    const filterClasses = classNames({
        "absolute bg-white border-2 rounded-3xl p-5 top-14 transition-all w-[90vw] sm:w-[25rem] shadow-2xl z-20 left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0": true,
        "opacity-0 invisible": !isOpen,
        "opacity-100 visible": isOpen
    });

    const buttonClasses = classNames({
        "transition-all": true,
        "text-orange-400": isOpen
    })

    return (
        <div className="flex justify-end sm:relative">
            <button className={buttonClasses} onClick={() => setIsOpen(prev => !prev)}>
                <i className="fi fi-rr-filter mr-2"></i>
                Filtri
            </button>
            <div ref={ref} className={filterClasses}>
                <LocationSearchForm onSearch={closeMenu} />
            </div>
        </div>
    );
};

export default LocationListFilters;
