import GetPokemonDetails from "../../components/GetPokemonDetails";

export default async function PokemonDetailsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <GetPokemonDetails id={id} />
    </>
  );
}
