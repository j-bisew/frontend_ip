'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterBar from '../components/FilterBar';
import PokemonList from '../components/PokemonList';

export default function PokemonPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit') || 20;

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();

        let results = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          url: pokemon.url,
        }));

        // Filtruj dane na podstawie parametrów URL
        if (search) {
          results = results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        setPokemons(results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [type, search, limit]);

  if (loading) return <p>Loading Pokémon data...</p>;

  return (
    <div>
      <FilterBar />
      <PokemonList pokemons={pokemons} />
    </div>
  );
}
