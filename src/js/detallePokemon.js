/* La línea `importar {Pokemon} de "../components/Pokemon.js";` importa la clase `Pokemon` desde el
archivo `Pokemon.js` ubicado en el directorio `components`. Esto permite que el archivo JavaScript
actual utilice las funcionalidades y métodos definidos en la clase `Pokemon` para recuperar y
mostrar datos de Pokémon. */
import { Pokemon } from "../components/Pokemon.js";

document.addEventListener('DOMContentLoaded', async () => {
    /* El fragmento de código `const urlParams = new URLSearchParams(window.location.search); let
    pokemonId = parseInt(urlParams.get('id'));` está extrayendo los parámetros de consulta de la URL
    de la página actual. */
    const urlParams = new URLSearchParams(window.location.search);
    let pokemonId = parseInt(urlParams.get('id'));

    /* El fragmento de código `if (!pokemonId) { console.error('ID del Pokémon no encontrado en la
    URL.'); devolver; }` está verificando si la variable `pokemonId` es falsa o no. Si "pokemonId"
    es falso (lo que incluye "nulo", "indefinido", "0", una cadena vacía, etc.), significa que no se
    encontró el ID del Pokémon en los parámetros de consulta de la URL. */
    if (!pokemonId) {
        console.error('ID del Pokémon no encontrado en la URL.');
        return;
    }

    try {
        /* El fragmento de código `let pokemon = await Pokemon.fetchPokemonData(pokemonId);` realiza
        una llamada asíncrona para recuperar datos de un Pokémon específico utilizando el método
        `fetchPokemonData` de la clase `Pokemon`. */
        let pokemon = await Pokemon.fetchPokemonData(pokemonId);

        if (!pokemon) {
            console.error(`No se encontró Pokémon con el ID ${pokemonId}`);
            return;
        }

        displayPokemonDetails(pokemon);

        // Manejo de eventos para los botones de anterior y siguiente
        document.getElementById('previousPokemon').addEventListener('click', async () => {
            pokemonId -= 1;
            if (pokemonId < 1) {
                pokemonId = 1;
            }
            pokemon = await Pokemon.fetchPokemonData(pokemonId);
            if (pokemon) {
                displayPokemonDetails(pokemon);
                window.location.href = `informacion.html?id=${pokemonId}`; 
            }
        });

        document.getElementById('nextPokemon').addEventListener('click', async () => {
            pokemonId += 1;
            pokemon = await Pokemon.fetchPokemonData(pokemonId);
            if (pokemon) {
                displayPokemonDetails(pokemon);
                window.location.href = `informacion.html?id=${pokemonId}`; 
            }
        });

        document.getElementById('goToIndex').addEventListener('click', () => {
            window.location.href = 'pokedex.html';
        });

    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
    }
});

/**
 * La función `displayPokemonDetails` toma un objeto Pokémon como entrada y genera HTML para mostrar
 * información detallada sobre el Pokémon, incluido su nombre, imagen, descripción, información
 * general, tipos, habilidades, debilidades, estadísticas y movimientos.
 * @param pokemon - La función `displayPokemonDetails` toma un objeto `pokemon` como parámetro.
 * @returns La función `displayPokemonDetails` no devuelve ningún valor explícitamente. Está
 * configurando el HTML interno del contenedor `pokemon-details` con el contenido HTML generado para
 * mostrar los detalles de un Pokémon.
 */
function displayPokemonDetails(pokemon) {
    const pokemonDetailContainer = document.getElementById('pokemon-details');

    if (!pokemon || !pokemon.types || !pokemon.abilities || !pokemon.stats || !pokemon.moves) {
        console.error('Datos del Pokémon incompletos:', pokemon);
        return;
    }

    const pokemonDetailsHTML = `
        <div class="pokemon-detail">
            <div class="header">
                <div class="navigation-buttons">
                    <button id="previousPokemon">Anterior</button>
                    <button id="goToIndex">Volver a la Pokedex</button>
                    <button id="nextPokemon">Siguiente</button>
                </div>
                <hr>
                <h1>${pokemon.name.toUpperCase()}</h1>
            </div>
            <div class="content">
                <div class="image-container">
                    <img src="${pokemon.officialArtwork}" alt="${pokemon.name}">
                </div>
                <div class="details">
                    <div class="section description">
                        <h3>Descripción</h3>
                        <p>${pokemon.description}</p>
                    </div>
                    
                    <div class="Seccion-Principal">
                        <div class="section general-info">
                            <h3>Información General</h3>
                            <p>ID: ${pokemon.id}</p>
                            <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
                            <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
                        </div>
                        <div class="section types">
                            <h3>Tipos</h3>
                            ${pokemon.types.map(type => `<span class="type ${type.toLowerCase()}">${type.toUpperCase()}</span>`).join('')}
                        </div>
                        <div class="section abilities">
                            <h3>Habilidades</h3>
                            <p>${pokemon.abilities.join(', ')}</p>
                        </div>
                        <div class="section weaknesses">
                            <h3>Debilidades</h3>
                            ${pokemon.weaknesses.map(weakness => `<span class="weakness ${weakness.toLowerCase()}">${weakness.toUpperCase()}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="Seccion-Secundaria">
                <div class="section stats">
                    <h3>Stats</h3>
                    ${pokemon.stats.map(stat => `
                        <div class="stat-bar">
                            <p>${stat.stat.name}: ${stat.base_stat}</p>
                            <div class="stat-bar-fill" style="width: ${stat.base_stat}%"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="section moves">
                    <h3>Movimientos</h3>
                    ${pokemon.moves.map(move => `<p>${move.move.name}</p>`).join('')}
                </div>
            </div>
        </div>
    `;

    pokemonDetailContainer.innerHTML = pokemonDetailsHTML;
}
