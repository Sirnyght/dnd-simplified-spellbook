import _ from 'lodash';
import Classes from './js/Classes.js';
// for testing purposes only
import SpBk from './js/Spellbook.js';

import "./css/style.scss";
import logoDND from "./images/logo_dnd.png";
import logoSB from "./images/logo_spellbook.png";
import placeholder from './images/placeholder.png';

const classes = new Classes();
const spellbook = new SpBk();

let divBox = document.createElement('div');
divBox.className = 'box';

function header() {
    let header = document.createElement('header');
    header.id = 'header';
        let divLogo = document.createElement('div');
        divLogo.id = 'div-logo-dnd';
        let logo = document.createElement('img');
        logo.id = 'dnd';
        logo.src = logoDND;
        logo.alt = 'Dungeons and Dragons logo';
        divLogo.appendChild(logo);
            header.appendChild(divLogo);

        let divTitle = document.createElement('div');
            divTitle.id = 'div-title';
            let title = document.createElement('h1');
            title.id = 'header-title';
            title.className = 'title';
            title.innerText = 'Simplified D&D Spellbook';
            divTitle.appendChild(title); 
            header.appendChild(divTitle); 

        let divLogoBook = document.createElement('div');
            divLogoBook.id = 'div-logo-sb';
            let sb = document.createElement('img');
            sb.id = 'sb';
            sb.src = logoSB;
            sb.alt = 'Spellbook logo';
            divLogoBook.appendChild(sb);
            header.appendChild(divLogoBook);

    return header;
}

function mainContent() {
    let divContainer = document.createElement('div');
    divContainer.id = 'content';
    divContainer.className = 'container';

    let aside = document.createElement('aside');
    aside.id = 'aside';
    divContainer.appendChild(aside);

        let sectionClasses = document.createElement('section');
        sectionClasses.id = 'section-classes';
        aside.appendChild(sectionClasses);

            let titleClasses = document.createElement('h2');
            titleClasses.id = 'title-classes';
            titleClasses.className = 'title';
            titleClasses.innerText = 'Classes';
            sectionClasses.appendChild(titleClasses);

            let divClassChoice = document.createElement('div');
            divClassChoice.id = 'div-class-choice';
            sectionClasses.appendChild(divClassChoice);

            let select = document.createElement('select');
            select.id = 'class-choice';
            divClassChoice.appendChild(select);

            let option = document.createElement('option');
            option.innerText = 'Choose a class';
            select.appendChild(option);

            let divClassImg = document.createElement('div');
            divClassImg.id = 'div-class-img';
            sectionClasses.appendChild(divClassImg);

            let imgClass = document.createElement('img');
            imgClass.id = 'img-class';
            imgClass.src = placeholder;
            divClassImg.appendChild(imgClass);


    let main = document.createElement('main');
    main.id = 'main';
    divContainer.appendChild(main);

        let sectionSpellbook = document.createElement('section');
        sectionSpellbook.id = 'section-spellbook';
        main.appendChild(sectionSpellbook);

            let titleSpellbook = document.createElement('h2');
            titleSpellbook.id = 'title-spellbook';
            titleSpellbook.className = 'title';
            titleSpellbook.innerText = 'Spellbook';
            sectionSpellbook.appendChild(titleSpellbook);

            let divSpellbook = document.createElement('div');
            divSpellbook.id = 'div-loader';
            sectionSpellbook.appendChild(divSpellbook);

    return divContainer;
}

function footer() {
    let footer = document.createElement('footer');
    footer.id = 'footer';
    let div = document.createElement('div');
    div.id = 'div-footer';
    let p = document.createElement('p');
    p.id = 'p-footer';
    p.innerText = '©2022 Kytsune | Simplified D&D Spellbook';
    div.appendChild(p);
    footer.appendChild(div);
    return footer;
}

divBox.appendChild(header());
divBox.appendChild(mainContent());
divBox.appendChild(footer());
document.body.appendChild(divBox);

classes.displayClassesChoice();
// spellbook.populateSpellbook();
let divSpellbook = document.getElementById('div-loader');
let loadingDiv = document.createElement('div');
loadingDiv.className = 'loader';
divSpellbook.appendChild(loadingDiv);

spellbook.displaySpellbook();



