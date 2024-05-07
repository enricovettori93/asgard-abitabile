import Link from "next/link";

export default function NavBar() {
    return (
        <header className="sticky top-0 z-20 bg-white">
            <h1 className="text-2xl font-semibold">
                <Link href="/">Asgard Abitabile</Link>
            </h1>
            <nav>
                <ul className="flex gap-5">
                    <li><Link href={`/locations?page=1`}>Locations</Link></li>
                    <li><Link href="/locations/add">Aggiungi una location</Link></li>
                </ul>
            </nav>
        </header>
    )
}
