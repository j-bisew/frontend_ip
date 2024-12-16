export default function PokemonLayout({ children }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Favorite Pokémons</h3>
      {children}
    </div>
  );
}
