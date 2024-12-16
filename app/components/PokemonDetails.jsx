

export default function PokemonDetails({ pokemon }) {
    return (
        <div className="pokemon-details">
            <div className="pokemon-info">
                { pokemon ? (
                    <div className="pokemon-card">
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>Id: {pokemon.id}</p>
                        <p>Height: {pokemon.height} units. Weight: {pokemon.weight}</p>
                        <div className="types">
                            <p> Types:
                                {pokemon.types.map((type)=>(
                                    <span key={type.slot} className="type">{type.type.name}</span>
                                ))}
                            </p>
                        </div>
                        <div className="pokemon-stats">
                            <h3>Stats:</h3>
                            {pokemon.stats.map((stat)=>(
                                <p key={stat.stat.name}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Wyszukaj Pokémona!</p>
                )}
            </div>
        </div>
    )
}