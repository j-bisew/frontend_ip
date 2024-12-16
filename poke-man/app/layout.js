import Navbar from "@/app/components/Navigation.js";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="bg-transparent">
          <h1 className="text-center text-4xl font-bold bg-gray-800 text-teal-400 py-4">
            Pokémon Searcher
          </h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <Navbar className="w-1/5" />
          <div className="flex-1 overflow-auto p-5 bg-gray-300">{children}</div>
        </div>

        <footer className="bg-gray-400 py-4 text-center text-sm mt-auto">
          ©2024 Pokémon Searcher <br /> Created by Mateusz Klemann
        </footer>
      </body>
    </html>
  );
}
