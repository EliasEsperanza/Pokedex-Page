//const { Modal } = require("bootstrap");

//const { default: fetch } = require("node-fetch");

document.addEventListener('DOMContentLoaded', async function () {
    localStorage.setItem('MovimientosPokemon', JSON.stringify({}))
    
    const divOrigin = document.createElement('div');
    divOrigin.classList.add('divOrigin');
    const divA = document.createElement('div');
    divA.classList.add('divP');
    divOrigin.appendChild(divA);
    const divB = document.createElement('div');
    divB.classList.add('divB');
    divB.id = 'divB';
    divOrigin.appendChild(divB);
    const div_modal = document.createElement('div');
    const div_dialog = document.createElement('div');
    const div_modal_content = document.createElement('div');
    const div_modal_content_header = document.createElement('div');
    const title = document.createElement('h5');
    const button = document.createElement('button');
    const div_modal_content_body = document.createElement('div');
    const div_modal_content_footer = document.createElement('div');
    const button_cerrar = document.createElement('button');
    const button_Guardar = document.createElement('button');
    div_modal.classList.add('modal');
    div_modal.id = 'exampleModal';
    div_modal.tabIndex = -1;
    div_dialog.classList.add('modal-dialog');
    div_modal_content.classList.add('modal-content');
    div_modal_content.id = 'MODEL'
    div_modal_content_header.classList.add('modal-header');
    title.classList.add('modal-title');
    title.textContent = 'Equipo elegido';
    button.classList.add('btn-close');
    button.type = 'button';
    button.setAttribute('data-bs-dismiss', 'modal');
    button.ariaLabel = 'close';
    div_modal_content_body.classList.add('modal-body');
    div_modal_content_body.id = 'pokemon-mostrar';
    div_modal_content_footer.classList.add('modal-footer')
    button_cerrar.classList.add('btn-secondary');
    button_cerrar.classList.add('btn');
    button_cerrar.setAttribute('data-bs-dismiss', 'modal');
    //button_cerrar.id = "ReElegirPokemon";
    button_cerrar.textContent = 'Cambiar Equipo';
    button_cerrar.addEventListener('click', function () {
        const model_body = document.getElementById('pokemon-mostrar')
        console.log('entro en el evento')
        while (model_body.hasChildNodes()) {
            model_body.removeChild(model_body.firstChild);
        }
        const div = document.getElementById('MODEL')
        div.replaceChild(document.getElementById('pokemon-mostrar'), model_body)
    });
    button_Guardar.classList.add('btn-primary');
    button_Guardar.classList.add('btn');
    button_Guardar.id = 'GuardaEquipo';
    button_Guardar.textContent = 'Guarda Equipo'
    button_Guardar.addEventListener('click', function () {
        location.replace('movs.html');
    });
    div_modal.appendChild(div_dialog);
    div_dialog.appendChild(div_modal_content);
    div_modal_content.appendChild(div_modal_content_header);
    div_modal_content_header.appendChild(title);
    //div_modal_content_header.appendChild(button);
    div_modal_content.appendChild(div_modal_content_body);
    div_modal_content.appendChild(div_modal_content_footer);
    div_modal_content_footer.appendChild(button_cerrar);
    div_modal_content_footer.appendChild(button_Guardar);
    document.body.appendChild(div_modal);

    document.body.appendChild(divOrigin);
    let Equipo = JSON.parse(localStorage.getItem('Equipo'));
    Equipo.forEach(async element => {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}/`);
        let dataResponse = await response.json();
        const img = document.createElement("img");
        if (dataResponse.sprites.front_shiny) {
            img.src = dataResponse.sprites.front_shiny;
        }
        else {
            img.src = dataResponse.sprites.front_default;
        }
        img.classList.add("imag");
        //div-card
        const div = document.createElement("div");
        div.classList.add("div-padre", "border");
        //div-body
        const divBody = document.createElement("div");
        //div-fin
        const divFin = document.createElement("div");
        const button = document.createElement("button");
        button.id = dataResponse.name;
        button.addEventListener('click', function (eve) {
            const divMovimiento = document.getElementById('divB');
            //const divPokemones = document.getElementById('divP')
            if (divMovimiento.hasChildNodes()) {
                while (divMovimiento.hasChildNodes()) {
                    divMovimiento.removeChild(divMovimiento.firstChild)
                }
            }
            const button = document.getElementById(eve.target.id);
            const nombre = dataResponse.name;
            if (button.className.name != 'racista') {
                button.classList.add('racista');
            }
            const buttonSeleccionado = document.querySelectorAll('button');
            console.log(buttonSeleccionado.length)
            buttonSeleccionado.forEach((Botones) => {
                //console.log(Botones.id);
                if (Botones.id != nombre) {
                    //console.log(`entro en el if del los 6 botones ya que decteto que ${Botones.id} es diferente a ${nombre}`);
                    if (Botones.className.includes('racista')) {
                        Botones.classList.remove('racista');
                    }
                }
            })

            element.moves.forEach(async element2 => {
                const nombreP = element.name;
                try {
                    const response_mov = await fetch(`https://pokeapi.co/api/v2/move/${element2.move.name}/`);
                    const Moviemiento = await response_mov.json();
                    if (Moviemiento.damage_class.name != "status") {
                        const nombre_mov = document.createElement('h5');
                        const tipo_mov = document.createElement('h5');
                        const potencia_mov = document.createElement('h5');
                        const precision_mov = document.createElement('h5')
                        const button_mov = document.createElement('button');
                        const descripcion_mov = document.createElement('h5');
                        nombre_mov.textContent = Moviemiento.name;//mejora trayendo su traduccion;
                        tipo_mov.textContent = Moviemiento.type.name;
                        potencia_mov.textContent = Moviemiento.power;
                        precision_mov.textContent = Moviemiento.accuracy;
                        if (Moviemiento.effect_entries[0]) {
                            descripcion_mov.textContent = Moviemiento.effect_entries[0].short_effect;
                        }
                        else {
                            descripcion_mov.textContent = "sin descripcion para este movimiento";
                        }
                        button_mov.id = Moviemiento.name;
                        button_mov.textContent = 'Elegir movimiento';
                        const MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                        const MovPActual = MovPokemon[nombreP] || [];
                        const indice = MovPActual.findIndex(pokemon => pokemon.id === Moviemiento.id);
                        if (indice !== -1) {
                            button_mov.classList.add('racista');
                        }
                        button_mov.addEventListener('click', async function (event) {
                            let MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                            let MovPActual = MovPokemon[nombre] || [];
                            //console.log(MovPActual);
                            const button_Mov = document.getElementById(event.target.id);
                            let parent = button_Mov.parentNode;
                            const maxMov = await RetornarMaxMov(nombre)
                            //console.log(maxMov)
                            if (!button_Mov.className.includes("racista") && maxMov > MovPActual.length ) {
                                const MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                                let MovPActual = MovPokemon[parent.id] || [];
                                const MovElegidoResponse = await fetch(`https://pokeapi.co/api/v2/move/${event.target.id}/`);
                                const MovElegido = await MovElegidoResponse.json();
                                MovPActual.push(MovElegido);
                                MovPokemon[parent.id] = MovPActual;
                                button_Mov.classList.add('racista');
                                localStorage.setItem('MovimientosPokemon', JSON.stringify(MovPokemon));
                            }
                            else {
                                const MovElegidoResponse = await fetch(`https://pokeapi.co/api/v2/move/${event.target.id}/`);
                                const MovElegido = await MovElegidoResponse.json();
                                const MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                                let MovPActual = MovPokemon[parent.id] || [];
                                var index = MovPActual.findIndex(mov => mov.id === MovElegido.id);
                                if (index !== -1) {
                                    MovPActual.splice(index, 1);
                                }
                                MovPokemon[parent.id] = MovPActual;
                                localStorage.setItem('MovimientosPokemon', JSON.stringify(MovPokemon));
                                button_Mov.classList.remove('racista');
                                volverVerde(1,nombre);
                            }
                            MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                            MovPActual = MovPokemon[nombre] || [];
                            //console.log(MovPokemon)
                            if (MovPActual.length == maxMov) {
                                volverVerde(0,nombre)
                                //alert('Ya hay 4 mov para ese pokemon');
                                await VerificarTodosMov(MovPokemon);
                                //location.replace('/Pruebas_etc/batalla.html');
                            }
                            //MovPokemon = JSON.parse(localStorage.getItem("MovimientosPokemon")) || {};
                            //MovPActual = MovPokemon[nombre] || [];
                            //console.log(MovPActual);
                        })
                        const div_mov = document.createElement('div');
                        div_mov.classList.add('border-info', 'border', 'divPadre', 'divMov');
                        div_mov.id = nombreP;
                        div_mov.appendChild(nombre_mov);
                        div_mov.appendChild(tipo_mov);
                        div_mov.appendChild(potencia_mov);
                        div_mov.appendChild(precision_mov);
                        div_mov.appendChild(descripcion_mov);
                        div_mov.appendChild(button_mov);
                        const divMovimiento = document.getElementById('divB');
                        divMovimiento.appendChild(div_mov);
                    }
                    else {
                        //console.log('Movimiento Saltado') se salta mov de estado xD
                    }
                } catch (error) {
                    console.log('error:', error)
                }

                //console.log(Moviemiento.effect_entries.short_effect)
            })
        })
        button.textContent = "Elegir Movimiento";
        button.classList.add("position-relative");
        divFin.appendChild(button);
        //unir todo
        divBody.appendChild(img);
        div.appendChild(divBody);
        div.appendChild(divFin);
        divA.appendChild(div);
    });
    async function VerificarTodosMov() {
        const Todos_Mov = JSON.parse(localStorage.getItem('MovimientosPokemon')) || {};
        let conta = 0;
        const listaPokemon = JSON.parse(localStorage.getItem('Equipo'));
        
        for (let index = 0; index < listaPokemon.length; index++) {
            
            const Movimiento = Todos_Mov[listaPokemon[index].name] || 0;
            const MaxMov = await RetornarMaxMov(listaPokemon[index].name)
            if (Movimiento.length == MaxMov) {
                console.log(`Se verifico que el pokemon ${listaPokemon[index].name} tiene los ${MaxMov} movimiento`)
                conta += 1
            }
            else {
                console.log(`Se verifico que el pokemon ${listaPokemon[index].name} no tiene los 4 movimiento`)
            }
            //console.log(`El conta va ${conta} en el i ${index} con la verificacion del pokemon: ${listaPokemon[index].name}`)
        }
        if (conta == 6) {
            //location.replace('/Pruebas_etc/batalla.html')
            alert("Los 6 pokemon elegido por favor espere un momento")
            mostrarModel()
            //alert("LLEGO HASTA ACA SIN ROMPERSE")
        }
        else {
            //alert("FALTA MOVIMIENTO")
            console.log('FALTAN MOVIMIENTO');
        }
    }
    async function ReturnJSON() {
        const nombreJugador = localStorage.getItem("NombreJugador");
        const listaPokemonGuardada = JSON.parse(localStorage.getItem('Equipo'));
        const listaMovimiento = JSON.parse(localStorage.getItem('MovimientosPokemon'));
    
        async function traerMovimiento(mov, pokemon) {
            let array = [];
            for (let index = 0; index < mov[pokemon].length; index++) {
                const response = await fetch(`https://pokeapi.co/api/v2/move/${mov[pokemon][index].id}/`);
                const datoObjecto = await response.json();
                array.push({
                    id: datoObjecto.id,
                    nombre: datoObjecto.name,
                    tipo: datoObjecto.type.name,
                    pp: datoObjecto.pp,
                    power: datoObjecto.power,
                    accuracy: datoObjecto.accuracy,
                    esEspecial: returnDamageClass(datoObjecto)
                });
            }
            return array;
        }
    
        const pokemonesJugador = await Promise.all(listaPokemonGuardada.map(async pokemon => ({
            id: pokemon.id,
            nombre: pokemon.name,
            hp: pokemon.stats[0].base_stat,
            ataque: pokemon.stats[1].base_stat,
            defensa: pokemon.stats[2].base_stat,
            velocidad: pokemon.stats[3].base_stat,
            ataqueEspecial: pokemon.stats[4].base_stat,
            defensaEspecial: pokemon.stats[5].base_stat,
            movimientos: await traerMovimiento(listaMovimiento, pokemon.name)
        })));
    
        return {
            nombreJugador,
            pokemonesJugador
        };
    }
    
    
    
    async function RetornarMaxMov(LlavePokemon) {
        // Realizar la primera solicitud para obtener los movimientos del Pokémon
        const response = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${LlavePokemon}/`)).json();
        //console.log(response.moves.length);
        let numeroMov = response.moves.length;
    
        // Crear una lista de promesas para obtener los detalles de cada movimiento
        const movePromises = response.moves.map(async ele => {
            const moveResponse = await (await fetch(`https://pokeapi.co/api/v2/move/${ele.move.name}/`)).json();
            return moveResponse;
        });
    
        // Esperar a que todas las promesas se resuelvan
        const moves = await Promise.all(movePromises);
    
        // Filtrar los movimientos de estado
        moves.forEach(move => {
            if (FuncionParaSaberTipo(move)) {
                numeroMov -= 1;
            }
        });
    
        //console.log(numeroMov);
    
        // Devolver el resultado según las reglas definidas
        if (numeroMov >= 4) {
            return 4;
        } else {
            return numeroMov;
        }
    }
    
    function FuncionParaSaberTipo(ele) {
        return ele.damage_class.name === "status";
    }
    function returnDamageClass(mov) {
        if (mov.damage_class.name == "special") {
            return true;
        }
        else {
            return false;
        }

    }
    async function mostrarModel() {
        const div_modal = document.createElement('div');
        const div_dialog = document.createElement('div');
        const div_modal_content = document.createElement('div');
        const button = document.createElement('button');
        const div_modal_content_footer = document.createElement('div');
        const button_cerrar = document.createElement('button');
        const button_Guardar = document.createElement('button');
        
        div_modal.classList.add('modal');
        div_modal.id = 'exampleModal';
        div_modal.tabIndex = -2;
        div_dialog.classList.add('modal-dialog');
        div_modal_content.classList.add('modal-content');
        div_modal_content.id = 'MODEL';
        button.classList.add('btn-close');
        button.type = 'button';
        button.setAttribute('data-bs-dismiss', 'modal');
        button.ariaLabel = 'close';
        div_modal_content_footer.classList.add('modal-footer');
        button_cerrar.classList.add('btn-secondary');
        button_cerrar.classList.add('btn');
        button_cerrar.setAttribute('data-bs-dismiss', 'modal');
        button_cerrar.textContent = 'Entrar Sala';
        
        button_cerrar.addEventListener('click', async function () {
            const salaId = prompt('Por favor, introduce el ID de la sala:');
            const datosRecibidos = await ReturnJSON();
            console.log('Datos recibidos de ReturnJSON:', datosRecibidos); // Debug log
            
            // Verifica que los datos recibidos contengan las propiedades esperadas
            if (!datosRecibidos || !datosRecibidos.nombreJugador || !Array.isArray(datosRecibidos.pokemonesJugador)) {
                console.error('Datos inválidos:', datosRecibidos);
                alert('Error: Datos inválidos.');
                return;
            }
    
            const data = {
                salaId,
                nombreJugador: datosRecibidos.nombreJugador,
                pokemonesJugador: datosRecibidos.pokemonesJugador
            };
    
            try {
                console.log('Datos enviados al unirse a la sala:', data); // Debug log
                const response = await fetch('https://poke-battle-production.up.railway.app/sala/unirse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (response.ok) {
                    const result = await response.json();
                    const batallaId = result.batallaId;
                    localStorage.setItem('batallaId', batallaId);
                    console.log(batallaId);
                    alert(`Jugador unido a la sala, batalla creada: ${result.batallaId}`);
                    window.location.href = 'batalla.html';
                } else {
                    const errorText = await response.text();
                    console.error('Error al unirse a la sala:', errorText);
                    alert('Error al unirse a la sala. Detalles: ' + errorText);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor.');
            }
        });
    
        button_Guardar.classList.add('btn-primary');
        button_Guardar.classList.add('btn');
        button_Guardar.textContent = 'Crear Sala';
        
        button_Guardar.addEventListener('click', async function () {
            try {
                const data = await ReturnJSON(); 
        
                console.log('Datos enviados al crear la sala:', data); // Muestra los datos en la consola para verificar
        
                const response = await fetch('https://poke-battle-production.up.railway.app/sala', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                if (response.ok) {
                    const result = await response.json();
                    console.log('Equipo guardado:', result);
                    alert(`Sala creada: ${result.salaId}`);
                    const batallaId = prompt('Por favor, introduce el ID de la batalla:');
                    localStorage.setItem('batallaId', batallaId);
                    window.location.href = 'batalla.html';
                } else {
                    const errorData = await response.json();
                    console.log('Error al crear la sala:', errorData);
                    alert('Error al crear la sala.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor.');
            }
        });
        
    
        div_modal.appendChild(div_dialog);
        div_dialog.appendChild(div_modal_content);
        div_modal_content.appendChild(div_modal_content_footer);
        div_modal_content_footer.appendChild(button_cerrar);
        div_modal_content_footer.appendChild(button_Guardar);
        document.body.appendChild(div_modal);
        const exampleModal = new bootstrap.Modal(div_modal);
        exampleModal.show();
    }
    
    function volverVerde(unit, id) {
        const div = document.getElementById(id);
        if (unit == 1) {
            div.classList.remove('Completado');
        } else {
            div.classList.add('Completado');
        }
    }
});    