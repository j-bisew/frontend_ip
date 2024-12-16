import ItemPokemonList from "./ItemPokemonList";
import "../globals.css";

export default function PokemonList({ pokemonList = [] }) {
  return (
    <div className="m-7 bg-[#DEFCF8] p-5 shadow-2xl rounded-lg">
      <h3 className="text-center text-2xl font-bold">Pokémon List</h3>
      <div className="grid grid-cols-5 gap-4">
        {pokemonList.map((pokemon, i) => (
          <ItemPokemonList key={i} {...pokemon} />
        ))}
      </div>
    </div>
  );
}
