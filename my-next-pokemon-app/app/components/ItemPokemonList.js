import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function ItemPokemonList({ id, name, src }) {
  return (
    <div className="text-center p-4">
      <Link href={`/pokemon/${id}`}>
        <div className="hover:scale-110 transition-transform duration-300">
          <Image
            width={150}
            height={150}
            src={src}
            alt={name}
            className="mx-auto"
          />
        </div>
      </Link>
      <p className="uppercase font-bold">{name}</p>
    </div>
  );
}
