const URL = "https://pokeapi.co/api/v2/pokemon/";
const axios = require("axios");
const fetch = require("node-fetch");
//const get20Pokemons = async () => {

// axios.get(URL)
//     .then(response => {
//         console.log(response.data)
//     })
//     .catch(error => {
//         console.log(error)
// })
export async function fetch20pokemons() {
  try {
    const response = await fetch(URL);
    const data = await response.json(); 

    data.results.map(async (lista) => {
      try {
        const res = await fetch(lista.url);
        const pokemon = await res.json();
        const id = pokemon.id;
        const name = pokemon.name;
        const image = pokemon.sprites.front_default;
        const img = document.createElement("img");
        img.src=image;
        img.alt=name;
        img.style.maxWidth = '100%';

        const container = document.getElementById('image-container');
        container.appendChild(img);
      } catch (error) {
        console.error("Błąd:", error);
      }
    });
  } catch (error) {
    console.error("Błąd:", error);
  }
}

// Wywołanie funkcji
fetch20pokemons();
