import ItemPokemonList from "./ItemPokemonList";
import "../globals.css";

export default function PokemonList({ pokemonList }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Pokémon List</h3>
      <div className="grid grid-cols-5 gap-4">
        {pokemonList.map((pokemon, i) => (
          <ItemPokemonList key={i} {...pokemon} />
        ))}
      </div>
    </div>
  );
}
