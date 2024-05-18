"use client"

import {ReactNode, useContext, useRef, useState} from "react";
import {UserContext} from "@/context/user.context";
import Link from "next/link";
import useLogout from "@/app/_components/navbar/hooks/useLogout";
import useClickOutside from "@/hooks/useClickOutside";
import useEscListener from "@/hooks/useEscListener";
import classNames from "classnames";
import LineSeparator from "@/components/line-separator";

export const MenuItem = ({iconName, children}: {iconName: string, children: ReactNode}) => {
    return (
        <li className="flex items-center">
            <i className={`${iconName} mt-1 mr-3`}></i>
            {children}
        </li>
    )
}

const Menu = () => {
    const ref = useRef(null);
    const {isLogged, user} = useContext(UserContext);
    const {logout} = useLogout();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    }

    useClickOutside(ref, closeMenu);
    useEscListener(closeMenu);

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
        "absolute bg-white border-2 rounded-3xl p-5 top-14 right-0 transition-all w-[20rem]": true,
        "opacity-0 invisible": !isOpen,
        "opacity-100 visible": isOpen
    });

    return (
        <div className="rounded-3xl border-2 p-3 relative">
            <button onClick={toggleMenu} className="mr-3">
                <i className="fi fi-rr-menu-burger"></i>
            </button>
            <span>
                {userInitialLetters()}
            </span>
            <nav className={menuClasses} ref={ref}>
                {
                    isLogged ? (
                        <ul className="flex flex-col gap-3">
                            <MenuItem iconName="fi fi-tr-house-chimney-heart">
                                <Link href="/locations/add">Aggiungi una location</Link>
                            </MenuItem>
                            <LineSeparator/>
                            <MenuItem iconName="fi fi-ts-user-pen">
                                <Link href="/account/me">My account</Link>
                            </MenuItem>
                            <MenuItem iconName="fi fi-ts-sign-out-alt">
                                <Link href="/auth" onClick={handleLogout}>Logout</Link>
                            </MenuItem>
                        </ul>
                    ) : (
                        <ul>
                            <MenuItem iconName="fi fi-tr-sign-in-alt">
                                <Link href="/auth">Registrati / Login</Link>
                            </MenuItem>
                        </ul>
                    )
                }
            </nav>
        </div>
    );
};

export default Menu;
