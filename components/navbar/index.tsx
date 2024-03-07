import Link from "next/link";

export default function NavBar() {
    return (
        <header>
            <nav>
                <ul className="flex gap-5">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/locations">Locations</Link></li>
                </ul>
            </nav>
        </header>
    )
}
