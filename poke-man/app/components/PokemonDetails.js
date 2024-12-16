"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "../globals.css";

export default function PokemonDetails({
  id,
  name,
  src,
  stats,
  types,
  height,
  weight,
}) {
  // Stan, aby śledzić, czy Pokemon jest w ulubionych
  const [isFavorite, setIsFavorite] = useState(false);

  // Sprawdzenie, czy Pokemon jest w ulubionych przy montowaniu komponentu
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

  // Funkcja obsługująca dodanie/usuńnięcie z ulubionych
  const toggleFavorite = () => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      let updatedFavorites;

      if (favorites.includes(id)) {
        updatedFavorites = favorites.filter((favId) => favId !== id);
        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, id];
        setIsFavorite(true);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="text-center my-8">
      <div className="relative w-full h-64 mx-auto mb-6">
        <Image
          src={src}
          alt={name}
          layout="fill"
          objectFit="contain"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>

      <p className="text-lg font-semibold">ID: {id}</p>
      <p className="text-xl font-bold text-gray-700">{name}</p>

      <p className="text-md mt-2">Types: {types}</p>
      <p className="text-md">Stats: {stats}</p>
      <p className="text-md">Height: {height}</p>
      <p className="text-md">Weight: {weight}</p>

      <button
        onClick={toggleFavorite}
        className={`mt-4 px-4 py-2 font-bold text-white rounded-lg ${
          isFavorite ? "bg-red-500" : "bg-blue-500"
        } hover:opacity-80`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
