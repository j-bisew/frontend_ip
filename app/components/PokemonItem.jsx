import Image from "next/image";
import Link from "next/link";

export default function PokemonItem({ id, name, src }) {
    return (
        <div className="pokemon-item">
            <Link href={`/pokemon/${id}`}>
                
                    <Image src={src} alt={name} width={150} height={150} />
                    <p>{name.toUpperCase()}</p>
                
            </Link>
        </div>
    )
}