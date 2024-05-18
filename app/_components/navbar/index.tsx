"use client"

import Link from "next/link";
import Menu, {MenuItem} from "@/app/_components/navbar/menu";
import classNames from "classnames";
import useScrollTop from "@/hooks/useScrollTop";

export default function NavBar() {
    const {isOnTop} = useScrollTop();

    const navClasses = classNames({
        "flex justify-center transition-all relative": true,
        "h-4": !isOnTop,
        "h-12": isOnTop
    });

    const locationLinksClasses = classNames({
        "flex transition-all": true
    });

    return (
        <header className="sticky top-0 z-20 bg-white border-b-2 p-3">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">
                    <Link href="/">
                        <i className="fi fi-ts-rocket-lunch text-4xl"></i>
                    </Link>
                </h1>
                <Menu />
            </div>
            <nav className={navClasses}>
                <ul className={locationLinksClasses}>
                    <MenuItem iconName={"fi fi-tr-people-roof"}>
                        <Link href={`/locations?page=1`}>Explore the locations</Link>
                    </MenuItem>
                </ul>
            </nav>
        </header>
    )
}
