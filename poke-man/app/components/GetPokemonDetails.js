import PokemonDetails from "./PokemonDetails";

export default async function GetPokemonDetails({ id }) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    return (
      <h3 className="mx-auto text-2xl font-bold mb-4 p-12 text-center">
        Failed to load Pokémon details
      </h3>
    );
  }
  const pokemonData = await response.json().then((data) => {
    return {
      id: data.id,
      name: data.name,
      src: data.sprites.front_default,
      stats: data.stats
        .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
        .join(", "),
      types: data.types.map((type) => type.type.name).join(", "),
      height: data.height,
      weight: data.weight,
    };
  });

  return (
    <>
      <PokemonDetails {...pokemonData} />
    </>
  );
}
