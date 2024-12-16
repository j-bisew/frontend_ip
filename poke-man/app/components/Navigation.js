import Link from "next/link";
import "../globals.css";

function Navbar() {
  return (
    <div className="bg-gray-800 text-teal-400 min-h-screen p-4">
      <h3 className="text-2xl font-semibold mb-6">Pages list</h3>
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            className="text-lg hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/pokemon"
            className="text-lg hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/favorites"
            className="text-lg hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Favorites
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
