import GetPokemonDetails from "../../components/GetPokemonDetails";

export default async function PokemonDetailsPage({ params }) {
  const { id } = params;

  return (
    <>
      <GetPokemonDetails id={id} />
    </>
  );
}
