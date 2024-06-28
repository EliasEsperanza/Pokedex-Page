/*
    const responseEevee = await fetch("https://pokeapi.co/api/v2/pokemon/133/");
    const dataResponseEevee = await responseEevee.json();
    const imgEevee = document.createElement('img');
    imgEevee.src= dataResponseEevee.sprites.other.home.front_female;
    imgEevee.classList.add("imag");
    document.body.appendChild(imgEevee);


    const response1 = await fetch("https://pokeapi.co/api/v2/move/11/")
    const dataResponse1 = await response1.json();
    console.log(dataResponse1)

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const dataResponse3 = await response2.json();
    const totalP = dataResponse3.count;
    console.log(dataResponse3);
    console.log("la cantidad total de pokemon son: ", totalP);
    */
/*
const respon = await fetch("http://localhost:3000/batalla");
if(respon){
    console.log("respondio");
}
else{
    console.log("no respondio");
}*/
document.addEventListener("DOMContentLoaded", async function () {
    localStorage.clear()
    const Nombre = prompt("Bienvenido con cual nombre se registrara?");
    localStorage.setItem('NombreJugador', Nombre)
    async function TraerPokemon(int) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${int}/`);
        let dataResponse = await response.json();

        console.log(`Se Muestra los datos del pokemon ${int} que tienen como nombre ${dataResponse.name}:`, dataResponse);
        //imagen
        const img = document.createElement("img");
        if (dataResponse.sprites.front_shiny) {
            img.src = dataResponse.sprites.front_shiny;
        }
        else {
            img.src = dataResponse.sprites.front_default;
        }


        img.classList.add("imag", 'p-2');
        //div-card
        const div = document.createElement("div");
        div.classList.add("container");
        //nombre
        const nombre = document.createElement("span");
        nombre.textContent = `N ${dataResponse.id} ${dataResponse.name}`;
        nombre.classList.add('p-2', "center-block");
        //div-body
        const divBody = document.createElement("div");
        div.classList.add("container", "div-padre", "border");
        //div-fin
        const divFin = document.createElement("div");

        const button = document.createElement("button");
        button.id = dataResponse.name;
        button.textContent = "Elegir";
        button.classList.add("position-relative");
        divFin.appendChild(button);
        //unir todo
        div.appendChild(nombre);
        divBody.appendChild(img);
        div.appendChild(divBody);
        div.appendChild(divFin);

        document.body.appendChild(div);

    }
    document.body.classList.add('d-flex', 'flex-row', 'flex-wrap');

    localStorage.setItem("Equipo", JSON.stringify([]));

    //Traer todos lo pokemon estipolado en la variable limiteP
    const limiteP = 15;
    for (let index = 1; index <= limiteP; index++) {
        await TraerPokemon(index);

    }
    /*<div class="modal" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="hermiteResult">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="GuardaCambios">Guarda Historial</button>
            </div>
          </div>
        </div>
      </div> */
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


});
document.addEventListener('click', async function (event) {

    //console.log("hubo click?", event.target.id);//si funciona
    try {
        let Equipo = JSON.parse(localStorage.getItem("Equipo")) || [];
        const button = document.getElementById(event.target.id);
        if (!button.className.includes("racista") && Equipo.length != 6) {
            const PokemonElegidoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.id}/`)
            const PokemonE = await PokemonElegidoResponse.json();
            //Ramdon(10);
            /*const PokemonAGuarda = {
                id: PokemonE.id,
                nombre: PokemonE.name,
                hp: PokemonE.stats[0].base_stat,
                ataque: PokemonE.stats[1].base_stat,
                defensa: PokemonE.stats[2].base_stat,
                movimientos :[{
                    id: PokemonE.moves[Ramdon()]
                },{},{},{}]};*/
            console.log(PokemonE);//funciona almenos esto
            let Equipo = JSON.parse(localStorage.getItem("Equipo")) || [];
            Equipo.push(PokemonE)
            localStorage.setItem("Equipo", JSON.stringify(Equipo));
            console.log(Equipo);
            button.classList.add("racista");
        }
        else {
            const PokemonElegidoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.id}/`)
            const PokemonE = await PokemonElegidoResponse.json();
            console.log(PokemonE);//funciona almenos esto
            let Equipo = JSON.parse(localStorage.getItem("Equipo")) || [];
            // Encuentra el índice del Pokémon en el equipo basado en el ID
            const indice = Equipo.findIndex(pokemon => pokemon.id === PokemonE.id);

            // Si el Pokémon se encuentra en el equipo, elimínalo
            if (indice !== -1) {
                Equipo.splice(indice, 1);
            }
            localStorage.setItem("Equipo", JSON.stringify(Equipo));
            console.log(Equipo);
            button.classList.remove("racista");
        }
        Equipo = JSON.parse(localStorage.getItem("Equipo")) || [];
        if (Equipo.length == 6) {
            console.log("hay 6 pokemon en tu equipo");
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            const div_modal_content_body = document.getElementById('pokemon-mostrar');
            Equipo.forEach(async element => {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.id}/`);
                let dataResponse = await response.json();
                //console.log(`Se Muestra los datos del pokemon ${int} que tienen como nombre ${dataResponse.name}:`, dataResponse);
                //imagen
                const img = document.createElement("img");
                if (dataResponse.sprites.front_shiny) {
                    img.src = dataResponse.sprites.front_shiny;
                }
                else {
                    img.src = dataResponse.sprites.front_default;
                }
                img.classList.add("img2", 'p-2');
                div_modal_content_body.appendChild(img);

            });
            //const
            exampleModal.show();
            /*arreglar el bug que se duplique el equipo por no limpiar el body del model 
            **que el boton guarda redireccionea a un apartada de elegir movs
            **que no pueda elegir mas pokemons si ya tiene 6
            **empezar a arma el combate
            **algo mas^
            */
        }
    } catch (error) {
        console.log("error al presionar boton")
    }


    /*Datos a pedir del json:
        Datos del pokemon a traer
        this.id = id;
        this.nombre = nombre;
        this.hp = hp;
        this.ataque = ataque;
        this.defensa = defensa;
        this.movimientos = (movimientos || []).map(movimiento => new Movimiento(movimiento.id, movimiento.nombre, movimiento.tipo, movimiento.pp, movimiento.power, movimiento.accuracy)); 
        
        Datos del movimiento a traer
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;*/
    /*router.get('/batalla/:batallaId/jugador/:jugadorId/movimientos', obtenerMovimientos);
    router.get('/batalla/:batallaId/jugador/:jugadorId/equipo', verEquipo);
    router.get('/batalla/:batallaId/jugador/:jugadorId/pokemon-activo/vida', vidaPokemonActivo);
    router.post('/batalla/:batallaId/jugador/:jugadorId/cambiar-pokemon', cambiarPokemon); */
    async function TraerAtaques(json) {
        return { mov1, mov2, mov3, mov4 }
    }
    function Ramdon(max) {
        //hacer que suelte valores random

        const min = 0;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(randomNumber)
        return randomNumber;
    }

});