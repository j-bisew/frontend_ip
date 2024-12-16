import Link from "next/link";
import "../globals.css";

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#705D56", padding: "1rem" , color: "#F0F7F4", fontSize: "1.5rem" }}>
          <Link
            href="/"
          >
            Home
          </Link>

          <Link
            href="/pokemon"
          >
            Search
          </Link>

          <Link
            href="/favorites"
          >
            Favorites
          </Link>

    </div>
  );
}

export default Navbar;
