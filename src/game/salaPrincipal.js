document.addEventListener('DOMContentLoaded', function(){
    //poner un menu en el que haya 2 botones en el cual sea unirse / crear sala en el cual el si crea una sala mandara a la api el
    alert('listo para la batalla');
    // Crear los elementos
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const h3 = document.createElement("h3");
    const select = document.createElement("select");
    const button_Entrar_Sala = document.createElement("button");
    const button_Crear_Sala = document.createElement('button');
    // Asignar texto y atributos
    
    h3.textContent = localStorage.getItem('NombreJugador');
    button_Crear_Sala.id= 'Entrar_Sala';
    button_Crear_Sala.textContent= 'Entrar Sala';
    button_Entrar_Sala.id='Crear_Sala';
    button_Entrar_Sala.textContent = "Crear Sala";

    // Agregar opciones al select
    //UNA LISTA QUE POSEE LOS JSON QUE TIENEN LOS DATOS DE LOS POKEMON que se almacena localStorage en el 'Equipo'
    const Equipo = JSON.parse(localStorage.getItem('Equipo'));
    //const pokemonOptions = ["Pikachu", "Charizard", "Bulbasaur"]; // Cambia esto por tus opciones
    Equipo.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        select.appendChild(option);
    });

    // Establecer estilos para los divs
    div1.classList.add('contenedor-elemento');
    div2.classList.add('contenedor-elemento');

    // Agregar elementos a los divs
    div1.appendChild(h3);
    div1.appendChild(select);
    //div1.appendChild(button);

    //div2.appendChild(h3.cloneNode(true));
    //div2.appendChild(select.cloneNode(true));
    div2.appendChild(button_Entrar_Sala);
    div2.appendChild(button_Crear_Sala);
    
    //div2.appendChild(button.cloneNode(true));
    // Agregar los divs al body
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.classList.add('contenedor');

    /*Cosa que hacer:
    1.Que al momento de crear una sala se mande mendiante alert/model el codigo de la sala
x    2.Que para unirse en esa sala lo ingrese al otro boton y luego lo mande al combate una vez ahi se mandara el link del combate para otro jugador
    3.No dejar a un jugador en la sala de espera crear otra y que en un model le pregunte si se quiere mantener o salir para destruir dicha sala
    4.Cuando ya se encuentre en batalla al crear una sala que diga ("Usted se encuentra en combate desea ir?SI(Button1) No(Button2))")
     */
})
document.addEventListener('')