const miHeader = document.createElement('header');
miHeader.classList.add('miHeader');

const miNav = document.createElement('nav');
miNav.classList.add('miNav');

const div1 = document.createElement('div');

document.body.appendChild(miHeader);
miHeader.appendChild(miNav);

const ul = document.createElement('ul');

const items = [
    { href:'https://eliasesperanza.github.io/Pokedex-Page/', imgSrc: '../styles/imgs/004-juegos-1.png'  },
    { href: 'pokedex.html', text: 'Pokedex', imgSrc: '../styles/imgs/001-avatar.png' },
    { href: 'indexContactos.html', text: 'Información', imgSrc: '../styles/imgs/017-avatar-9.png' },
    { href: '#', text: 'Juego', imgSrc: '../styles/imgs/022-avatar-13.png' },
    { href: 'https://pokemon-project.com/episodios/', target: '_blank', text: 'Anime', imgSrc: '../styles/imgs/003-avatar-1.png' }
];

items.forEach(item => {
    const li = document.createElement('li');

    const aNav = document.createElement('a');
    aNav.href = item.href;
    aNav.classList.add('aNav');

    if (item.text) {
        aNav.textContent = item.text;
    }
    if (item.target) {
        aNav.target = item.target;
    }

    const img = document.createElement('img');
    img.src = item.imgSrc;
    img.alt = item.text || '';

    aNav.appendChild(img);
    li.appendChild(aNav);
    ul.appendChild(li);
});

miNav.appendChild(ul);
miNav.appendChild(div1);

const mainContainer = document.querySelector('body');

const divContainer = document.createElement('div');
divContainer.className = "container text-center";

const divRow = document.createElement('div');
divRow.className = "row justify-content-evenly";

const divRow2 = document.createElement('div');
divRow2.className = "row align-items-start justify-content-evenly";

const icono = document.createElement('i');
icono.className = 'bi bi-person-circle';
icono.style.fontSize = '2rem';

// creando las cartas
const creandoCartas = (colClassName, cardTitle, fbLink, fbName, instaLink, instaName, phone) => {

    const divColumn = document.createElement('div');
    divColumn.className = `col ${colClassName}`;

    const divCard = document.createElement('div');
    divCard.className = 'card text-center mb-3';

    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';

    const h5 = document.createElement("h5");
    h5.className = 'card-title';
    h5.textContent = cardTitle;

    const p1 = document.createElement("p");
    p1.className = 'card-text';
    p1.innerHTML = '<strong>Facebook:</strong> ';
    const enlaceF = document.createElement('a');
    enlaceF.href = fbLink;
    enlaceF.className = 'enlace red-social';
    enlaceF.target = '_blank';
    enlaceF.textContent = fbName;
    p1.appendChild(enlaceF);

    const p2 = document.createElement("p");
    p2.className = 'card-text';
    p2.innerHTML = '<strong>Instagram:</strong> ';
    const enlaceI = document.createElement('a');
    enlaceI.className = 'enlace red-social';
    enlaceI.href = instaLink;
    enlaceI.target = '_blank';
    enlaceI.textContent = instaName;
    p2.appendChild(enlaceI);

    const p3 = document.createElement("p");
    p3.className = 'card-text';
    p3.innerHTML = `<strong>Teléfono:</strong> ${phone}`;
    divCardBody.appendChild(icono);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(document.createElement('hr'));
    divCardBody.appendChild(p1);
    divCardBody.appendChild(p2);
    divCardBody.appendChild(p3);
    divCardBody.appendChild(document.createElement('hr'));
    divCard.appendChild(divCardBody);
    divColumn.appendChild(divCard);

    return divColumn;
};

const divColumn1 = creandoCartas('uno', 'Arturo Esperanza', 'https://www.facebook.com/profile.php?id=100006952604783&mibextid=ZbWKwL', 'Arturo Esperanza', 'https://www.instagram.com/elias_esperanza/?igsh=MTZoMDIyODlxY2VyZg%3D%3D', 'elias_esperanza', '+503 72843497');
const divColumn2 = creandoCartas('dos', 'Meybell Ramírez', 'https://www.facebook.com/meybell.ramirez.98', 'Meybell Ramírez', 'https://www.instagram.com/meybell_r/', 'meybell_r', '+503 72843497');
const divColumn3 = creandoCartas('tres', 'Cristina Ventura', 'https://www.facebook.com/raquel.ventura.9421/', 'Raquel Ventura', 'https://www.instagram.com/rv__9700/', 'rv__9700', '+503 72742969');
const divColumn4 = creandoCartas('cuatro', 'Diana Cárcamo', 'https://www.facebook.com/dianangela.espiinal?mibextid=LQQJ4d', 'Espinal Espinal', 'https://www.instagram.com/_dianaaaaa_10?igshid=ajUxaGx1eDFwd2Rr&utm_source=qr', '_dianaaaaa_10', '+503 75475650');
const divColumn5 = creandoCartas('cinco', 'Gabriel Aguirre', 'https://www.facebook.com/raquel.ventura.9421/', 'Gabriel Aguirre', 'https://www.instagram.com/rv__9700/', 'Gabriel_Aguirre', '+503 74981594');

mainContainer.appendChild(divContainer);

divContainer.appendChild(divRow);
divContainer.appendChild(divRow2);

divRow.appendChild(divColumn1);
divRow.appendChild(divColumn2);
divRow2.appendChild(divColumn3);
divRow2.appendChild(divColumn4);
divRow2.appendChild(divColumn5);

// FOOTER
const miFooter = document.createElement('footer');
miFooter.className = 'miFooter';
document.body.appendChild(miFooter);

const containerFooter = document.createElement('div');
containerFooter.className = 'containerFooter';
miFooter.appendChild(containerFooter);

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

containerFooter.appendChild(containerFooter2);
containerFooter2.appendChild(encabezadoFooter2);
containerFooter2.appendChild(pContainer2);

containerFooter.appendChild(containerFooter3);
containerFooter3.appendChild(encabezadoFooter3);
containerFooter3.appendChild(pContainer3);

const pFooter = document.createElement('p');
pFooter.textContent = '© 2024 Todos los derechos reservados.';
miFooter.appendChild(pFooter);