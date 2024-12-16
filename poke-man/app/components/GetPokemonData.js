import PokemonList from "./PokemonList";

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

function GetId(url) {
  const regex = /(\d+)\/$/;
  return url.match(regex)[1];
}

export default async function GetPokemonList({ type, search, limit = 20 }) {
  if (type != "") {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    if (!response.ok) {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Podano nieprawidłowy typ
        </h3>
      );
    }
    const data = await response.json();

    let filteredPokemon =
      FilterPokemon(data.pokemon, search)
        .slice(0, limit)
        .map((pokemon) => ({
          id: GetId(pokemon.pokemon.url),
          name: pokemon.pokemon.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${GetId(
            pokemon.pokemon.url
          )}.png`,
        })) || [];

    if (filteredPokemon.length === 0) {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Pokémon not found
        </h3>
      );
    }
    return <PokemonList pokemonList={filteredPokemon} />;
  }
  if (search != "") {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    if (!response.ok) {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Podano nieprawidłowego pokemona
        </h3>
      );
    }
    const data = await response.json();

    let Pokemon =
      [
        {
          id: data.id,
          name: data.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        },
      ] || "";

    if (Pokemon === "") {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Pokémon not found
        </h3>
      );
    }
    return <PokemonList pokemonList={Pokemon} />;
  } else {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    if (!response.ok) {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Error: {error.message}
        </h3>
      );
    }
    const data = await response.json();

    const pokemonList =
      FilterPokemon(data.results, search)
        .slice(0, limit)
        .map((pokemon, i) => ({
          id: i + 1,
          name: pokemon.name,
          src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
          }.png`,
        })) || [];

    if (pokemonList.length === 0) {
      return (
        <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
          Pokémon not found
        </h3>
      );
    }
    return <PokemonList pokemonList={pokemonList} />;
  }
}
