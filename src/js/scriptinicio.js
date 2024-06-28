const br = document.createElement('br');

document.addEventListener('DOMContentLoaded', function() {
    //NAV
    const miHeader = document.createElement('header');
    miHeader.classList = 'miHeader';
    const miNav = document.createElement('nav');
    miNav.classList = 'miNav';
    const div1 = document.createElement('div');

    document.body.appendChild(miHeader);
    miHeader.appendChild(miNav);

    const ul = document.createElement('ul');

    const items = [
        {  href:'https://eliasesperanza.github.io/Pokedex-Page/', imgSrc: 'src/styles/imgs/004-juegos-1.png' },
        { href: 'src/pages/pokedex.html', text: 'Pokedex', imgSrc: 'src/styles/imgs/001-avatar.png' },
        { href: 'src/pages/indexContactos.html', text: 'Información', imgSrc: 'src/styles/imgs/017-avatar-9.png' },
        { href: 'src/game/index.html', text: 'Juego', imgSrc: 'src/styles/imgs/022-avatar-13.png' },
        { href: 'https://pokemon-project.com/episodios/', target: '_blank', text: 'Anime', imgSrc: 'src/styles/imgs/003-avatar-1.png' }
    ];

    items.forEach(item => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;

        if (item.text) {
            a.textContent = item.text;
        }
        if (item.target) {
            a.target = item.target;
        }

        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.text;

        a.appendChild(img);
        li.appendChild(a);
        ul.appendChild(li);
    });

    miNav.appendChild(ul);
    miNav.appendChild(div1);
    //Fin del nav.
    //BODY

    // Crear el contenedor principal
    const mainContainer = document.createElement('div');
    mainContainer.className = 'mainContainer';
    document.body.appendChild(mainContainer);

    const divExterior = document.createElement('div');
    divExterior.className = 'divExterior';
    mainContainer.appendChild(divExterior);

    const divRow = document.createElement('div');
    divRow.className = "miRow";

    const divColumn1 = document.createElement('div');
    const divColumn2 = document.createElement('div');

    divColumn1.className = 'coluno';
    divColumn2.className = 'coldos';

    divExterior.appendChild(br);
    divExterior.appendChild(divRow);

    divRow.appendChild(divColumn1);
    divRow.appendChild(divColumn2);

    //Estilo galeria
    const imageSection = document.createElement('section');
    imageSection.id = 'image-section';
    imageSection.className = 'imageSection';

    const images = [
        { src: 'src/styles/imgs/pk1.jpg', alt: 'img1' },
        { src: 'src/styles/imgs/pk2.jpg', alt: 'img2' },
        { src: 'src/styles/imgs/pk3.jpg', alt: 'img3' },
        { src: 'src/styles/imgs/pk4.jpg', alt: 'img4' },
        { src: 'src/styles/imgs/pk5.jpg', alt: 'img5' },
        { src: 'src/styles/imgs/pk6.jpg', alt: 'img6' },
        { src: 'src/styles/imgs/pk7.jpg', alt: 'img7' },
        { src: 'src/styles/imgs/pk8.jpg', alt: 'img8' },
        { src: 'src/styles/imgs/pk9.jpg', alt: 'img9' },
        { src: 'src/styles/imgs/pk10.jpg', alt: 'img10' },
        { src: 'src/styles/imgs/pk11.jpg', alt: 'img11' },
        { src: 'src/styles/imgs/pk12.jpg', alt: 'img12' }
    ];

    images.forEach(image => {
        const imgG = document.createElement('img');
        imgG.src = image.src;
        imgG.alt = image.alt;

        imageSection.appendChild(imgG);
        imgG.className = 'imgG';
    });

    divColumn2.appendChild(imageSection);
    //Fin del ImageSection

    //Imagen 3D
    const article3D = document.createElement('article');
    article3D.className = 'article3D';

    const fotos = [
        { src: 'src/styles/imgs/BolitaPok.png', alt: 'bolitaPok' },
        { src: 'src/styles/imgs/pok3D.png', alt: 'pok3D' }
    ];

    fotos.forEach(foto => {
        const foto3D = document.createElement('img');
        foto3D.src = foto.src;
        foto3D.alt = foto.alt;

        article3D.appendChild(foto3D);
        foto3D.className = 'foto3D';
    });
    divColumn1.appendChild(article3D);
    //Fin IMG3d
    //TExto bienvenida!
    const titulo = document.createElement('h1');
    titulo.textContent = 'Bienvenido a tu Pokedex.';
    titulo.className = 'titulo';
    const parrafo = document.createElement('p');
    parrafo.textContent = ' Aquí podrás encontrar información detallada y fascinante sobre todos los Pokémon que captures en tu viaje. Desde sus características y habilidades hasta sus evoluciones y hábitats, esta herramienta será tu guía indispensable en el mundo Pokémon. Prepárate para explorar, aprender y convertirte en un Maestro Pokémon. ¡Que comience la aventura!';
    parrafo.className = 'parrafo';
    divColumn2.appendChild(titulo);
    divColumn2.appendChild(parrafo);

    //row2
    const divRow2 = document.createElement('div');
    divRow2.className = "row";

    const div2Column1 = document.createElement('div');
    div2Column1.className = 'col uno';

    const div2Column2 = document.createElement('div');
    div2Column2.className = 'col dos';

    divExterior.appendChild(br);
    divExterior.appendChild(divRow2);

    const pColumn2_2 = document.createElement('p');
    pColumn2_2.textContent = '';
    pColumn2_2.className = 'pColumn2_1';
    const enlaceManga2 = document.createElement('a');
    enlaceManga2.href = 'https://pokemon-project.com/manga/pokemon-adventures';
    enlaceManga2.className = 'enlaceManga';
    enlaceManga2.target = '_blank';
    enlaceManga2.textContent = 'Leer manga';
    pColumn2_2.appendChild(enlaceManga2);

    div2Column1.appendChild(pColumn2_2);
    div2Column2.appendChild(imageSection);

    div2Column1.addEventListener('mouseover', function() {
        pColumn2_2.style.opacity = '1';
        div2Column1.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    });

    div2Column1.addEventListener('mouseout', function() {
        pColumn2_2.style.opacity = '0';
        div2Column1.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });

    divRow2.appendChild(div2Column1);
    divRow2.appendChild(div2Column2);

    //FOOTER
    const miFooter = document.createElement('footer');
    miFooter.className = 'miFooter';
    document.body.appendChild(miFooter);

    const containerFooter = document.createElement('div');
    containerFooter.className = 'containerFooter';
    miFooter.appendChild(containerFooter);

    const containerFooter1 = document.createElement('div');
    containerFooter1.className = 'containerFooter1';

    const encabezadoFooter1 = document.createElement('h3');
    encabezadoFooter1.textContent = 'Contáctanos';
    encabezadoFooter1.className = 'encabezados';

    const enlaceA = document.createElement('a');
    enlaceA.href = 'src/pages/indexContactos.html';
    enlaceA.className = 'enlace';
    enlaceA.target = '_blank';
    enlaceA.textContent = 'Desarrolladores';

    const containerFooter2 = document.createElement('div');
    containerFooter2.className = 'containerFooter2';

    const encabezadoFooter2 = document.createElement('h3');
    encabezadoFooter2.textContent = 'Acerca de nosotros';
    encabezadoFooter2.className = 'encabezados';

    const pContainer2 = document.createElement('p');
    pContainer2.className = 'pNormal';
    pContainer2.textContent = 'Somos un equipo apasionado por el mundo de Pokémon, dedicado a brindar a los fanáticos la mejor experiencia posible a través de nuestra innovadora Pokédex y emocionante juego de Pokémon. Nuestra Pokédex es una herramienta interactiva y completa para entrenadores de todas las edades, mientras que nuestro juego ofrece aventuras únicas y desafiantes.';

    const containerFooter3 = document.createElement('div');
    containerFooter3.className = 'containerFooter3';

    const encabezadoFooter3 = document.createElement('h3');
    encabezadoFooter3.textContent = 'Términos y condiciones';
    encabezadoFooter3.className = 'encabezados';

    const pContainer3 = document.createElement('p');
    pContainer3.className = 'pNormal';
    pContainer3.textContent = `Al utilizar nuestro sitio web y nuestros servicios, aceptas cumplir con los siguientes términos y condiciones:

    Uso del Sitio: Este sitio web y su contenido están destinados a usuarios mayores de 13 años.
    Propiedad Intelectual: Todo el contenido del sitio, incluyendo pero no limitado a texto, gráficos, logos, imágenes y software, es propiedad de Pokédex Game o sus licenciantes y está protegido por leyes de propiedad intelectual.
    Uso Aceptable: No puedes usar el sitio para cualquier propósito ilegal o no autorizado. No debes, en el uso del servicio, violar ninguna ley en tu jurisdicción.`;

    containerFooter.appendChild(containerFooter1);
    containerFooter1.appendChild(encabezadoFooter1);
    containerFooter1.appendChild(enlaceA);

    containerFooter.appendChild(containerFooter2);
    containerFooter2.appendChild(encabezadoFooter2);
    containerFooter2.appendChild(pContainer2);

    containerFooter.appendChild(containerFooter3);
    containerFooter3.appendChild(encabezadoFooter3);
    containerFooter3.appendChild(pContainer3);

    const pFooter = document.createElement('p');
    pFooter.textContent = '© 2024 Todos los derechos reservados.';
    miFooter.appendChild(pFooter);
});