import GetPokemonData from "../components/GetPokemonData";

export default async function PokemonListPage({ searchParams }) {
  const { type = "", search = "", limit = 20 } = await searchParams;

  return (
    <main>
      <GetPokemonData type={type} search={search} limit={limit} />
    </main>
  );
}
