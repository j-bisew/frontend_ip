// import "../global.css";
import PokemonItem from "./PokemonItem";

export default function PokemonList({ pokemons }) {
    return (
        <div>
            {pokemons.map((pokemon) => (
                <PokemonItem key={pokemon.id} {...pokemon} />
            ))}
        </div>
    )
}