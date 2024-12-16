import Link from "next/link"
import "../globals.css"

export default function Navbar() {
    return (
        <nav className="nav-bar">
            <h1>Poke-Manual</h1>
            <Link href="/">
                Home
            </Link>
            <Link href="/pokemon">
                Search
            </Link>
            <Link href="/favorites">
                Favorites
            </Link>
        </nav>
    )
}