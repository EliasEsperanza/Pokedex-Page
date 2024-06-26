import { Database } from '../components/PokemonDB.js';

console.log('acompanantes.js está cargando');

document.addEventListener('DOMContentLoaded', async () => {
    const db = new Database('PokemonDB', ['entrenadores']);

    const entrenadoresContainer = document.createElement('div');
    entrenadoresContainer.classList.add('entrenadores-container');
    document.body.appendChild(entrenadoresContainer);

    const entrenadores = await db.getAllData('entrenadores');
    const coloresResponse = await fetch('../styles/colores.json');
    const colores = await coloresResponse.json();

    entrenadores.forEach(entrenador => {
        const entrenadorCard = document.createElement('div');
        entrenadorCard.classList.add('entrenador-card');

        const nombre = document.createElement('h2');
        nombre.textContent = entrenador.nombre.toUpperCase();

        const pokemonsContainer = document.createElement('div');
        pokemonsContainer.classList.add('pokemons-container');

        entrenador.pokemons.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

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

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', async () => {
                const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: `Estás por eliminar a ${pokemon.name} de ${entrenador.nombre}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                });

                if (result.isConfirmed) {
                    entrenador.pokemons = entrenador.pokemons.filter(p => p.id !== pokemon.id);
                    await db.updateData('entrenadores', entrenador);
                    pokemonCard.remove();

                    Swal.fire({
                        title: '¡Eliminado!',
                        text: `${pokemon.name} ha sido eliminado de ${entrenador.nombre}`,
                        icon: 'success'
                    });
                }
            });

            pokemonCard.appendChild(cardNumber);
            pokemonCard.appendChild(image);
            pokemonCard.appendChild(name);
            pokemonCard.appendChild(deleteButton);

            const backgroundColor = colores[pokemon.id] || '#ffffff';
            pokemonCard.style.backgroundColor = backgroundColor;

            pokemonsContainer.appendChild(pokemonCard);
        });

        const deleteEntrenadorButton = document.createElement('button');
        deleteEntrenadorButton.textContent = 'Eliminar Entrenador';
        deleteEntrenadorButton.classList.add('delete-entrenador-button');
        deleteEntrenadorButton.addEventListener('click', async () => {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: `Estás por eliminar al entrenador ${entrenador.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await db.deleteData('entrenadores', entrenador.id);
                entrenadorCard.remove();

                Swal.fire({
                    title: '¡Eliminado!',
                    text: `${entrenador.nombre} ha sido eliminado`,
                    icon: 'success'
                });
            }
        });

        const changeNameButton = document.createElement('button');
        changeNameButton.textContent = 'Cambiar Nombre';
        changeNameButton.classList.add('change-name-button');
        changeNameButton.addEventListener('click', async () => {
            const { value: nuevoNombre } = await Swal.fire({
                title: 'Ingrese el nuevo nombre',
                input: 'text',
                inputLabel: 'Nuevo nombre del entrenador',
                inputPlaceholder: 'Ingrese el nuevo nombre',
                inputValue: entrenador.nombre,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Por favor, ingrese un nombre válido';
                    }
                }
            });

            if (nuevoNombre) {
                entrenador.nombre = nuevoNombre;
                await db.updateData('entrenadores', entrenador);
                nombre.textContent = nuevoNombre.toUpperCase();

                Swal.fire({
                    title: '¡Nombre cambiado!',
                    text: `El nombre del entrenador ha sido actualizado a ${nuevoNombre}`,
                    icon: 'success'
                });
            }
        });

        entrenadorCard.appendChild(nombre);
        entrenadorCard.appendChild(pokemonsContainer);
        entrenadorCard.appendChild(deleteEntrenadorButton);
        entrenadorCard.appendChild(changeNameButton);

        entrenadoresContainer.appendChild(entrenadorCard);
    });
});
