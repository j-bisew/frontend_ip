"use client";

import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import { useSearchParams } from "next/navigation";

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 20;

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      const fetchedPokemon = [];
      for (let id of favorites) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          fetchedPokemon.push({
            id: data.id,
            name: data.name,
            src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          });
        }
      }

      const limitedPokemon = fetchedPokemon.slice(0, limit);
      setPokemonList(limitedPokemon);
      setLoading(false);
    };

    fetchFavorites();
  }, [limit]);

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  if (pokemonList.length === 0) {
    return (
      <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
        Brak ulubionych Pokémonów
      </h3>
    );
  }

  return (
    <div>
      <PokemonList pokemonList={pokemonList} />
    </div>
  );
}
