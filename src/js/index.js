import { Pokedex } from "../components/Pokedex.js";

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    //div para el gif
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    container.appendChild(preloader);


    //audio para la cancion de fondo
    const preloaderAudio = document.createElement('audio');
    preloaderAudio.id = 'preloader-audio';
    preloaderAudio.src = '../img/cancion/cancionFurret.mp3';
    preloaderAudio.type = 'audio/mp3';
    preloaderAudio.loop = true;
    container.appendChild(preloaderAudio);


    // Iniciar la Pokedex y gestionar el preloader
    const pokedex = new Pokedex();
    const loader = document.getElementById("preloader");


    // Función para manejar la reproducción del audio del preloader
    function playPreloaderAudio() {
        preloaderAudio.play().catch(error => {
            console.log('Auto-play fue prevenido por el navegador:', error);
        });
    }

    // Evento de clic para iniciar la reproducción del audio
    preloader.addEventListener('click', () => {
        playPreloaderAudio();
        pokedex.dibujarPokedex().then(() => {
            loader.style.display = "none";
            preloaderAudio.pause();
            preloaderAudio.currentTime = 0;//reiniciamos el audio para futuras reproducciones
        });
    });

    //si se completo de cargar la pagina se pusa la musica
    if (document.readyState === 'complete') {
        preloaderAudio.pause();
        preloaderAudio.currentTime = 0;//reiniciamos el audio para futuras reproducciones
    }

    

});


/*
// Intentar reproducir el audio cuando la página se carga
window.addEventListener("load", () => {
    // Inicia la reproducción del audio del preloader
    playPreloaderAudio();

    // Espera a que la Pokedex se dibuje antes de ocultar el preloader y detener el audio
    pokedex.dibujarPokedex().then(() => {
        loader.style.display = "none";
        preloaderAudio.pause();
        preloaderAudio.currentTime = 0; // Reinicia el audio para futuras reproducciones
    });
});*/

