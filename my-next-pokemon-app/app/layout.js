import Navbar from "@/app/components/Navigation.js";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Pokémon Manual</title>
      </head>
      <body className="flex flex-col h-screen ">
        <header>
          <h1 className="text-center text-3xl font-bold bg-[#32292F] text-[#F0F7F4] p-6">
            Pokémon Manual
          </h1>
          <Navbar />
        </header>

        <div className="flex flex-1">
          <div className="flex-1 overflow-auto p-5 bg-[#BDF3ED]">{children}</div>
        </div>
      </body>
    </html>
  );
}
