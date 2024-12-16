import PokemonList from "./PokemonList";

function FilterPokemon(data, search) {
  return search
    ? data.filter((pos) => {
        const name = pos.pokemon ? pos.pokemon.name : pos.name;
        return name.toLowerCase().includes(search.toLowerCase());
      })
    : data;
}

function GetId(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1]; 
}


function ErrorMessage({ message }) {
  return (
    <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
      {message}
    </h3>
  );
}

export default async function GetPokemonList({ type, search, limit = 20 }) {
  try {
    if (type) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
      const data = await response.json();

      const filteredPokemon = FilterPokemon(data.pokemon, search)
        .slice(0, limit)
        .map((pokemon) => ({
          id: GetId(pokemon.pokemon.url),
          name: pokemon.pokemon.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${GetId(
            pokemon.pokemon.url
          )}.png`,
        }));

      return filteredPokemon.length
        ? <PokemonList pokemonList={filteredPokemon} />
        : <ErrorMessage message="No Pokémon found" />;
    }

    if (search) {
      search = search.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
      if (!response.ok) {
        return <ErrorMessage message="Invalid Pokémon name provided" />;
      }
      const data = await response.json();

      const pokemon = [
        {
          id: data.id,
          name: data.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        },
      ];

      return <PokemonList pokemonList={pokemon} />;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }
    const data = await response.json();

    const pokemonList = data.results.map((pokemon, i) => ({
      id: i + 1,
      name: pokemon.name,
      src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
    }));

    return <PokemonList pokemonList={pokemonList} />;
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
