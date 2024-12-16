export default async function PokemonDetailPage({ params }) {
    const { id } = params;
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const pokemon = await response.json();
  
      return (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
          <p>Abilities: {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
        </div>
      );
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return <p>Unable to load Pokémon details.</p>;
    }
  }
  