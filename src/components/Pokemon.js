/* La clase `Pokemon` obtiene información detallada sobre Pokémon de PokeAPI en función
de su ID, incluidos tipos, habilidades, estadísticas, movimientos, debilidades y descripciones. */
export class Pokemon {
    #pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    #pokeApiImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/';

    constructor(id, name, types, abilities, image, staticImage,officialArtwork, height, weight, stats, moves,description, weaknesses) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.abilities = abilities;
        this.image = image; // URL del GIF animado
        this.staticImage = staticImage; // URL de la imagen estática
        this.officialArtwork = officialArtwork;
        this.height = height;
        this.weight = weight;
        this.stats = stats;
        this.moves = moves;
        this.description = description; // Descripción en español
        this.weaknesses = weaknesses;
    }

    /**
     * La función `fetchPokemonData` recupera información detallada sobre un Pokémon según su ID de
     * PokeAPI, incluidos tipos, habilidades, estadísticas, movimientos, debilidades y descripciones.
     * @param id - El parámetro `id` en la función `fetchPokemonData` se utiliza para especificar el ID
     * del Pokémon del que deseas recuperar datos. Esta ID se utiliza para realizar una solicitud a
     * PokeAPI para recuperar información sobre un Pokémon específico en función de su ID.
     * @returns Se devuelve un objeto `Pokemon` con las siguientes propiedades:
     * - identificación
     * - nombre
     * - tipos
     * - habilidades
     * - imagen
     * - Imagen estática
     * - obra de arte oficial
     * - altura
     * - peso
     * - estadísticas
     * - movimientos
     * - descripción
     * - Debilidades únicas
     */
    static async fetchPokemonData(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! tipo: ${response.status}`);
            }
            const data = await response.json();

            const types = data.types.map(typeInfo => typeInfo.type.name);
            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
            const staticImage = data.sprites.front_default;
            const officialArtwork = data.sprites.other['official-artwork'].front_default;
            const height = data.height;
            const weight = data.weight;

            const stats = data.stats.map(stat => ({
                base_stat: stat.base_stat,
                stat: {
                    name: stat.stat.name
                }
            }));
            const moves = data.moves.slice(0, 10).map(move => ({
                move: {
                    name: move.move.name
                }
            }));

            //DESCRIPCION
            const speciesResponse = await fetch(data.species.url);
            const speciesData = await speciesResponse.json();
            const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
            const description = descriptionEntry ? descriptionEntry.flavor_text : 'Descripción no disponible en español.';

            // DEBILIDADES
            const typeDataPromises = types.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`).then(response => response.json()));
            const typeData = await Promise.all(typeDataPromises);
            const weaknesses = typeData.flatMap(type => type.damage_relations.double_damage_from.map(weakness => weakness.name));
            const uniqueWeaknesses = [...new Set(weaknesses)];
            return new Pokemon(
                data.id,
                data.name,
                types,
                abilities,
                image,
                staticImage,
                officialArtwork,
                height,
                weight,
                stats,
                moves,
                description,
                uniqueWeaknesses
            );
        } catch (error) {
            console.error(`Error fetching Pokemon data: ${error}`);
            throw error;
        }
    }

    /**
     * La función getAllPokemon recupera datos de forma asincrónica para todos los Pokémon del 1 al 682
     * y devuelve una matriz de los datos de Pokémon recuperados.
     * @returns La función `getAllPokemon` devuelve una matriz de objetos Pokémon después de obtener
     * datos para cada Pokémon del método `fetchPokemonData`.
     */
    static async getAllPokemon() {
        const pokemons = [];
        for (let i = 1; i <= 682; i++) {
            const pokemon = await Pokemon.fetchPokemonData(i);
            if (pokemon) {
                pokemons.push(pokemon);
            }
        }
        return pokemons;
    }
}