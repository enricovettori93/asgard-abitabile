"use client"

import Link from "next/link";
import Menu, {MenuItem} from "@/app/_components/navbar/menu";
import classNames from "classnames";
import {ROUTES} from "@/utils/constants";
import useScrollListener from "@/hooks/useScrollListener";

export default function NavBar() {
    const {isOnTop} = useScrollListener();

    const navClasses = classNames({
        "flex justify-center transition-all relative": true,
        "h-4": !isOnTop,
        "h-12": isOnTop
    });

    const locationLinksClasses = classNames({
        "flex transition-all": true
    });

    return (
        <header className="fixed left-0 right-0 top-0 z-20 bg-white border-b-2 p-3 rounded-b-3xl">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold hover:text-orange-400 transition-all">
                    <Link href={ROUTES.HOME}>
                        <i className="fi fi-ts-rocket-lunch text-4xl"></i>
                    </Link>
                </h1>
                <Menu />
            </div>
            <nav className={navClasses}>
                <ul className={locationLinksClasses}>
                    <MenuItem iconName={"fi fi-tr-people-roof"}>
                        <Link href={`${ROUTES.LOCATIONS}?page=1`} className="with-hover-border">Explore the locations</Link>
                    </MenuItem>
                </ul>
            </nav>
        </header>
    )
}
