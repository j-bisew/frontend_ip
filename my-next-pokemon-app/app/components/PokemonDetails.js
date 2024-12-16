"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PokemonDetails({
  id,
  name,
  src,
  stats,
  types,
  height,
  weight,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

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
      <div >
        <Image
          src={src}
          alt={name}
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      <p>ID: {id}</p>
      <p className="font-bold text-2xl">{name}</p>
      <p>Types: {types}</p>
      <p>Stats: {stats}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
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
