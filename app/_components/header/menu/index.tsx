"use client"

import {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/context/user.context";
import Link from "next/link";
import useLogout from "@/app/_components/header/hooks/useLogout";
import useClickOutside from "@/hooks/useClickOutside";
import useEscListener from "@/hooks/useEscListener";
import classNames from "classnames";
import LineSeparator from "@/components/line-separator";
import {usePathname} from "next/navigation";
import {ROUTES} from "@/utils/constants";

export const MenuItem = ({iconName, children, className = ""}: {iconName: string, children: ReactNode, className?: string}) => {
    return (
        <li className={`flex items-center ${className}`}>
            <i className={`${iconName} mt-1 mr-3`}></i>
            {children}
        </li>
    )
}

const Menu = () => {
    const pathname = usePathname();
    const ref = useRef(null);
    const {isLogged, user} = useContext(UserContext);
    const {logout} = useLogout();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    }

    useClickOutside(ref, closeMenu);
    useEscListener(closeMenu);

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        await logout();
    }

    const userInitialLetters = () => {
        if (user?.name && user?.surname) {
            return user?.name.charAt(0).toUpperCase() + user?.surname.charAt(0).toUpperCase();
        }
        return '';
    }

    const menuClasses = classNames({
        "absolute bg-white border-2 rounded-3xl p-5 top-14 right-0 transition-all w-[20rem] shadow-2xl z-20": true,
        "opacity-0 invisible": !isOpen,
        "opacity-100 visible": isOpen
    });

    return (
        <div className="rounded-3xl border-2 px-4 py-2 relative">
            <div className="flex items-center">
                <button className="p-0" onClick={toggleMenu}>
                    <i className="fi fi-rr-menu-burger"></i>
                </button>
                {
                    isLogged && (
                        <Link href={ROUTES.MY_ACCOUNT} className="ml-3">
                            {userInitialLetters()}
                        </Link>
                    )
                }
            </div>
            <nav className={menuClasses} ref={ref}>
                {
                    isLogged ? (
                        <ul className="flex flex-col gap-3">
                            <MenuItem iconName="fi fi-tr-house-chimney-heart">
                                <Link className="with-hover-border" href={ROUTES.ADD_LOCATION}>Aggiungi una location</Link>
                            </MenuItem>
                            <LineSeparator/>
                            <MenuItem iconName="fi fi-ts-user-pen">
                                <Link className="with-hover-border" href={ROUTES.MY_ACCOUNT}>Il mio account</Link>
                            </MenuItem>
                            <MenuItem iconName="fi fi-ts-house-chimney">
                                <Link className="with-hover-border" href={ROUTES.MY_LOCATIONS}>Le mie locations</Link>
                            </MenuItem>
                            <MenuItem iconName="fi fi-tr-calendar-check">
                                <Link className="with-hover-border" href={ROUTES.MY_RESERVATIONS}>Le mie prenotazioni</Link>
                            </MenuItem>
                            <LineSeparator/>
                            <MenuItem iconName="fi fi-ts-sign-out-alt">
                                <Link className="with-hover-border" href={ROUTES.AUTH} onClick={handleLogout}>Logout</Link>
                            </MenuItem>
                        </ul>
                    ) : (
                        <ul>
                            <MenuItem iconName="fi fi-tr-sign-in-alt">
                                <Link className="with-hover-border" href={ROUTES.AUTH}>Registrati / Login</Link>
                            </MenuItem>
                        </ul>
                    )
                }
            </nav>
        </div>
    );
};

export default Menu;
