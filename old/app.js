const URL = "https://pokeapi.co/api/v2/pokemon";
const pokemonListElement = document.querySelector(".pokemon-list");
const searchInput = document.getElementById("search");

async function fetchPokemonList(limit = 20, offset = 0) {
  try {
    const response = await fetch(`${URL}?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Błąd podczas pobierania listy Pokemonów:", error);
  }
}

async function fetchPokemonDetails(name) {
  try {
      const response = await fetch(`${URL}/${name}`);
      if (!response.ok) {
          console.warn(`Nie znaleziono Pokemona: ${name}, status: ${response.status}`);
          return null;
      }
      return await response.json();
  } catch (error) {
      console.error("Błąd podczas pobierania szczegółów Pokemona:", error);
      return null;
  }
}

const pokemonDetailsElement = document.querySelector(".pokemon-details");

async function displayPokemonList() {
  
  showLoading('loading-list');
  await delay(1000);
  const pokemons = await fetchPokemonList();
  hideLoading('loading-list')
  pokemonListElement.innerHTML = "";

  if (!pokemons || pokemons.length === 0) {
      pokemonListElement.innerHTML = "<p>Brak Pokemonów do wyświetlenia.</p>";
      return;
  }

  pokemons.forEach(async (pokemon) => {
      const pokemonDetails = await fetchPokemonDetails(pokemon.name);
      const pokemonItem = document.createElement("div");
      pokemonItem.className = "pokemon-item";
      pokemonItem.innerHTML = `
          <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
          <p>${pokemonDetails.name.toUpperCase()}</p>
      `;
      pokemonItem.onclick = () => {
        displayPokemonDetails(pokemon.name);
      }
      pokemonListElement.appendChild(pokemonItem);
  })
}

const pokemonInfoElement = document.getElementById("pokemon-info");

async function displayPokemonDetails(pokemon) {
  pokemonInfoElement.innerHTML = "";
  showLoading("loading-details");
  await delay(500);
  const details = await fetchPokemonDetails(pokemon);
  hideLoading("loading-details");

  if (!details) return;
  const stats = details.stats
    .map(stat => `<p>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</p>`)
    .join(""); 

  pokemonInfoElement.innerHTML = `
    <div class="pokemon-card">
      <h2>${details.name.toUpperCase()}</h2>
      <img src="${details.sprites.front_default}" alt="${details.name}">
      <p>Id: ${details.id}</p>
      <p>Height: ${details.height} units. Weight: ${details.weight}.</p>
      <div class="pokemon-stats">
        <h3>Stats:</h3>
        ${stats}
      </div>
    </div>
  `;
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

async function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    pokemonDetailsElement.innerHTML = "<p>Wpisz nazwę Pokémona!</p>";
    return;
  }
  pokemonInfoElement.innerHTML = "";
  showLoading("loading-details");

  try {
    const details = await fetchPokemonDetails(query);

    if (details) {
      hideLoading("loading-details");
      displayPokemonDetails(query);
    } else {
      hideLoading("loading-details");
      pokemonInfoElement.innerHTML = "<p>Nie znaleziono Pokémona.</p>";
    }
  } catch (error) {
    hideLoading("loading-details");
    pokemonInfoElement.innerHTML = "<p>Wystąpił błąd podczas wyszukiwania.</p>";
    console.error("Błąd podczas wyszukiwania:", error);
  }
}

function showLoading(elementId) {
  document.getElementById(elementId).classList.remove("hidden");
}

function hideLoading(elementId) {
  document.getElementById(elementId).classList.add("hidden");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


document.addEventListener("DOMContentLoaded", () => {
  console.log("Element #loading-details:", document.getElementById("loading-details"));
  displayPokemonList();
});
