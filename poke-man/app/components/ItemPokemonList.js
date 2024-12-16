import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function ItemPokemonList({ id, name, src }) {
  return (
    <div className="text-center border border-gray-300 p-4">
      <Link href={`/pokemon/${id}`}>
        <div className="relative w-36 h-36 mx-auto mb-4">
          <Image
            width={150}
            height={150}
            src={src}
            alt={name}
            quality={100}
            style={{
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
        </div>
      </Link>
      <p className="text-sm text-gray-700">ID: {id}</p>
      <p className="text-lg font-bold text-gray-900">{name}</p>
    </div>
  );
}
