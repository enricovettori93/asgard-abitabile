"use client"

import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "@/context/user.context";
import useLogout from "@/app/_components/navbar/hooks/useLogout";

export default function NavBar() {
    const {isLogged} = useContext(UserContext);
    const {logout} = useLogout();

    const handleLogout = async (e: any) => {
        e.preventDefault();
        await logout();
    }

    return (
        <header className="sticky top-0 z-20 bg-white">
            <h1 className="text-2xl font-semibold">
                <Link href="/">Asgard Abitabile</Link>
            </h1>
            <nav>
                <ul className="flex gap-5">
                    <li><Link href={`/locations?page=1`}>Locations</Link></li>
                    <li><Link href="/locations/add">Aggiungi una location</Link></li>
                    {
                        isLogged ? (
                            <li><Link href="/auth" onClick={handleLogout}>Logout</Link></li>
                        ) : (
                            <li><Link href="/auth">Registrati / Login</Link></li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}
