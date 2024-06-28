/* La línea `importar {Pokemon} de "./Pokemon.js";` importa la clase `Pokemon` desde un archivo llamado
`Pokemon.js`. Esto permite que el archivo actual utilice las funcionalidades y propiedades definidas
en la clase `Pokemon` dentro del archivo `Pokemon.js`. */
import { Pokemon } from "./Pokemon.js";
import { Database } from './PokemonDB.js';

console.log('Pokedex.js está en ejecución');
export class Pokedex {
    constructor() {
        this.createNavbar();
        this.pokedex = document.createElement('div');
        this.pokedex.classList.add('pokedex');
        document.body.appendChild(this.pokedex);
        this.colors = {}; 
        this.pokemons = [];
        this.selectedPokemons = [];
        this.db = new Database('PokemonDB', ['selectedPokemons', 'entrenadores']);
    }

    /**
     * La función "createNavbar" crea y agrega un `navbar` al DOM.
     */
    createNavbar() {
        const navbar = document.createElement('nav');
        navbar.classList.add('navbar');

        const navContainer = document.createElement('div');
        navContainer.classList.add('nav-container');

        const navLogo = document.createElement('a');
        navLogo.href = '#';
        navLogo.classList.add('nav-logo');

        const navMenu = document.createElement('div');
        navMenu.classList.add('nav-menu');

        const navItem1 = document.createElement('a');
        navItem1.href = 'https://eliasesperanza.github.io/Pokedex-Page/';
        navItem1.classList.add('nav-item');
        navItem1.textContent = 'Inicio';

        const navItem2 = document.createElement('a');
        navItem2.href = 'acompanantes.html';
        navItem2.classList.add('nav-item');
        navItem2.textContent = 'Entrenadores';

        const navItem3 = document.createElement('a');
        navItem3.href = '#';
        navItem3.classList.add('nav-item');

        navMenu.appendChild(navItem1);
        navMenu.appendChild(navItem2);
        navMenu.appendChild(navItem3);

        navContainer.appendChild(navLogo);
        navContainer.appendChild(navMenu);
        navbar.appendChild(navContainer);

        document.body.insertBefore(navbar, document.body.firstChild);
    }

    /**
     * La función "dibujarPokedex" carga colores de forma asincrónica, recupera todos los datos de
     * Pokémon, representa el Pokémon en la pantalla y agrega detectores de eventos.
     */
    async dibujarPokedex() {
        await this.loadColors();
        this.pokemons = await Pokemon.getAllPokemon();
        this.renderPokemon(this.pokemons);
        this.addEventListeners();
    }

    /**
     * La función `loadColors` obtiene de forma asincrónica datos de color de un archivo JSON y los
     * almacena en la propiedad `colors`, manejando cualquier error que pueda ocurrir.
     */
    async loadColors() {
        try {
            const response = await fetch('../styles/colores.json');
            this.colors = await response.json();
        } catch (error) {
            console.error('Error loading colors:', error);
        }
    }

    /**
     * La función `getPokemonColor` devuelve el color asociado con una ID determinada de una lista
     * predefinida de colores o un color predeterminado si no se encuentra.
     * @param id - El parámetro `id` en la función `getPokemonColor` se usa para especificar el ID de
     * un Pokémon cuyo color desea recuperar.
     * @returns La función `getPokemonColor(id)` devuelve el color asociado con el `id` proporcionado
     * del objeto `colors`. Si no hay ningún color asociado con el `id`, devolverá `#FFF` como color
     * predeterminado.
     */
    getPokemonColor(id) {
        return this.colors[id] || '#FFF';
    }

    /**
     * La función `renderPokemon` crea y muestra dinámicamente tarjetas de Pokémon con detalles y un
     * botón "Agregar" para agregar el Pokémon a la colección de un entrenador.
     * @param pokemons - Una variedad de objetos Pokémon que contienen información como identificación,
     * nombre, imagen y tipos.
     */
    renderPokemon(pokemons) {
        this.pokedex.innerHTML = '';
        pokemons.forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('card');

            const backgroundColor = this.getPokemonColor(pokemon.id);
            card.style.backgroundColor = backgroundColor;

            const cardNumber = document.createElement('div');
            cardNumber.classList.add('card-number');
            cardNumber.textContent = `#${pokemon.id}`;

            const image = document.createElement('img');
            image.src = pokemon.image;
            image.alt = pokemon.name;
            image.classList.add('pokemon-image');

            const name = document.createElement('div');
            name.classList.add('pokemon-name');
            name.textContent = pokemon.name.toUpperCase();

            const types = document.createElement('div');
            types.classList.add('types');
            pokemon.types.forEach(type => {
                const typeElement = document.createElement('div');
                typeElement.classList.add('type', type.toLowerCase());
                typeElement.textContent = type.toUpperCase();
                types.appendChild(typeElement);
            });

            let addButton = document.createElement('button');
            addButton.classList.add('add-button');
            addButton.textContent = 'Agregar';
            addButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                const { value: entrenador } = await Swal.fire({
                    title: 'Escribe el nombre del entrenador',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Agregar',
                    showLoaderOnConfirm: true,
                    preConfirm: async (login) => {
                        if (!login) {
                            Swal.showValidationMessage('Por favor, ingresa un nombre válido');
                            return;
                        }
                        return login.toUpperCase(); 
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });

                if (entrenador) {
                    const entrenadores = await this.db.getAllData('entrenadores');
                    let entrenadorData = entrenadores.find(e => e.nombre === entrenador);

                    if (!entrenadorData) {
                        entrenadorData = { nombre: entrenador, pokemons: [] };
                    } else if (entrenadorData.pokemons.length >= 6) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Este entrenador ya tiene 6 pokémons.',
                            icon: 'error'
                        });
                        return;
                    }

                    entrenadorData.pokemons.push(pokemon);
                    await this.db.updateData('entrenadores', entrenadorData);

                    Swal.fire({
                        title: '¡Pokémon agregado!',
                        text: `${pokemon.name} ha sido asignado a ${entrenador}`,
                        icon: 'success'
                    });
                }
            });

            const details = document.createElement('div');
            details.classList.add('details');
            details.appendChild(addButton);

            card.addEventListener('click', () => {
                window.location.href = `informacion.html?id=${pokemon.id}`;
            });

            card.appendChild(cardNumber);
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(types);
            card.appendChild(details);

            this.pokedex.appendChild(card);
        });
    }

    /**
     * La función `addEventListeners` configura detectores de eventos para la entrada y selecciona
     * elementos para filtrar y ordenar una lista de Pokémon según la entrada del usuario.
     */
    addEventListeners() {
        const InputBuscador = document.getElementById('buscarP');
        const FiltroSelect = document.getElementById('filtro');

        InputBuscador.addEventListener('input', (e) => {
            const ValorBuscado = e.target.value.toLowerCase();
            const pokemonFiltrado = this.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(ValorBuscado) ||
                pokemon.id.toString().includes(ValorBuscado)
            );
            this.renderPokemon(pokemonFiltrado);
        });

        FiltroSelect.addEventListener('change', (e) => {
            const valorF = e.target.value;
            let pokemonesFiltrados = [...this.pokemons];
            switch (valorF) {
                case 'number-asc':
                    pokemonesFiltrados.sort((a, b) => a.id - b.id);
                    break;
                case 'number-desc':
                    pokemonesFiltrados.sort((a, b) => b.id - a.id);
                    break;
                case 'name-asc':
                    pokemonesFiltrados.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    pokemonesFiltrados.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
            this.renderPokemon(pokemonesFiltrados);
        });
    }
}

