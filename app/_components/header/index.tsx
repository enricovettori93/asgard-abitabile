"use client"

import Link from "next/link";
import Menu from "@/app/_components/header/menu";
import classNames from "classnames";
import {ROUTES} from "@/utils/constants";
import useScrollListener from "@/hooks/useScrollListener";
import {ReactNode} from "react";

export default function Header({children}: {children: ReactNode}) {
    const {isOnTop} = useScrollListener();

    const navContainerClasses = classNames({
        "flex justify-center transition-all relative": true,
        // "h-8": !isOnTop,
        // "h-12": isOnTop
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
            <div className={navContainerClasses}>
                {children}
            </div>
        </header>
    )
}
