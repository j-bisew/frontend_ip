const URL = "https://pokeapi.co/api/v2/pokemon";
// const pokemonListElement = document.querySelector(".pokemon-list");
// const searchInput = document.getElementById("search");

function Loader({ isVisible }) {
  return isVisible ? <div className="loading"></div> : null;
}

function Header({ onSearch }) {
  return (
      <header>
          <h1>PokeMan</h1>
          <div className="search-bar">
            <input
                type="text"
                id="search"
                placeholder="Search Pokémon..."
                onKeyDown={onSearch}
            />
        </div>
      </header>
  );
}

function PokemonList({ pokemons, onSelect, isLoading }) {
  return (
    <aside className="pokemon-list">
      <Loader isVisible={isLoading} />
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-item" onClick={() => onSelect(pokemon)}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name.toUpperCase()}</p>
        </div>
      ))}
    </aside>
  );
}


function PokemonDetails({ pokemon, isLoading }) {
  return (
    <section className="pokemon-details">
      <Loader isVisible={isLoading} />
      <div id="pokemon-info">
        {pokemon ? (
          <div className="pokemon-card">
            <h2>{pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Id: {pokemon.id}</p>
            <p>Height: {pokemon.height} units. Weight: {pokemon.weight}.</p>
            <div className="pokemon-stats">
              <h3>Stats:</h3>
              {pokemon.stats.map((stat) => (
                <p key={stat.stat.name}>
                  {stat.stat.name.toUpperCase()}: {stat.base_stat}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p>Wybierz Pokémona, aby zobaczyć szczegóły.</p>
        )}
      </div>
    </section>
  );
}


function App() {
  let pokemonList = [];
  let selectedPokemon = null;
  let isListLoading = true;
  let isDetailsLoading = false;

  async function fetchPokemonList() {
    try {
      const res = await fetch(`${URL}?limit=20&offset=0`);
      const data = await res.json();
      return data.results.map((pokemon, index) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      }));
    } catch (error) {
      console.error("Błąd podczas pobierania listy Pokémonów:", error);
      return [];
    }
  }

  async function fetchDetails(name) {
    try {
      const response = await fetch(`${URL}/${name}`)
      return await response.json()
    } catch (error) {
      console.error("Błąd przy pobieraniu detali", error);
      return null;
    }
  }

  async function handleSearch(event) {
    if (event.key === "Enter") {
      const query = event.target.value.trim().toLowerCase();
      if (!query) {
        alert("wpisz nazwe pokemona!");
        return;
      }
    

      isDetailsLoading = true;
            renderApp();

            const details = await fetchDetails(query);
            isDetailsLoading = false;
            selectedPokemon = details;
            renderApp();
        }
    }

    async function handlePokemonClick(pokemon) {
      isDetailsLoading = true;
      renderApp();

      const details = await fetchDetails(pokemon.name);
      isDetailsLoading = false;
      selectedPokemon = details;
      renderApp();
  }

  function renderApp() {
    ReactDOM.render(
        <div>
          <Header onSearch={handleSearch} />
          <main>
            <PokemonList
              pokemons={pokemonList}
              onSelect={handlePokemonClick}
              isLoading={isListLoading}
            />
            <PokemonDetails
              pokemon={selectedPokemon}
              isLoading={isDetailsLoading}
            />
          </main>
        </div>,
      document.getElementById("app")
    );
  }
  
  fetchPokemonList().then((list) => {
    pokemonList = list || [];
    isListLoading = false;
    renderApp();
  });
}

App();
