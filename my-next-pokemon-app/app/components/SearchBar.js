"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "../globals.css";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type?limit=21");
        const data = await response.json();
        setPokemonTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
        setPokemonTypes([]);
      }
    };

    fetchTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams({
      type: formData.get("type") || "",
      search: formData.get("search") || "",
      limit: formData.get("limit") || "20",
    });
    router.push(`/pokemon?${params.toString()}`);
  };

  return (
    <form
      className="search-div flex flex-wrap gap-4 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="search"
          placeholder="Enter Pokémon name..."
          defaultValue={searchParams.get("search") || ""}
          className="border rounded px-2 py-1 w-60"
        />
        <select
          name="type"
          defaultValue={searchParams.get("type") || ""}
          className="border rounded px-2 py-1 w-40"
        >
          <option value="">All Types</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="font-bold">
          Results Limit
        </label>
        <select
          name="limit"
          defaultValue={searchParams.get("limit") || "20"}
          className="border rounded px-2 py-1 w-20"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-[#96DCD4] text-white font-bold py-2 px-4 rounded hover:scale-110"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
