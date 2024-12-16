"use client";

import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import { useSearchParams } from "next/navigation";

// Funkcja do filtrowania Pokémonów na podstawie wyszukiwania
function FilterPokemon(data, search) {
  if (search !== "") {
    return data.filter((pos) => {
      if (pos.pokemon) {
        return pos.pokemon.name.toLowerCase().includes(search.toLowerCase());
      }
      return pos.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  return data;
}

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || ""; // Parametr wyszukiwania
  const limit = parseInt(searchParams.get("limit")) || 20; // Parametr limitu, domyślnie 20

  useEffect(() => {
    const fetchFavorites = async () => {
      // Pobranie listy ulubionych Pokémonów z localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      const fetchedPokemon = [];
      // Pobieranie Pokémonów po kolei
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

      // Filtrowanie wyników na podstawie wyszukiwania
      const filteredPokemon = FilterPokemon(fetchedPokemon, search).slice(
        0,
        limit
      );
      setPokemonList(filteredPokemon);
      setLoading(false);
    };

    fetchFavorites();
  }, [search, limit]);

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
