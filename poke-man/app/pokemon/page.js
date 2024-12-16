import GetPokemonData from "../components/GetPokemonData";

export default async function PokemonListPage({ searchParams }) {
  const type = searchParams.type || "";
  const search = searchParams.search || "";
  const limit = searchParams.limit || 20;

  return (
    <>
      <GetPokemonData type={type} search={search} limit={limit} />
    </>
  );
}
