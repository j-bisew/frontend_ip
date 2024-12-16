import SearchBar from "../components/SearchBar";

export default function PokemonLayout({ children }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Pokémon Search</h3>
      <SearchBar />
      {children}
    </div>
  );
}
