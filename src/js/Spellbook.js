import Spell from './Spell.js';

class Spellbook {
    constructor() {
        console.log('Spellbook constructor called');
        this.spells = [];
    }

    getSpells() { return this.spells; }
    setSpells(spells) { this.spells = spells; }
    addSpell(spell) { this.spells.push(spell); }
    removeSpell(spell) { this.spells.splice(this.spells.indexOf(spell), 1); }

    async populateSpellbook() {
        // fetch spells from API
        let response = await fetch('https://www.dnd5eapi.co/api/spells');
        let data = await response.json();
        let spells = data.results;
        // loop through spells, create Spell objects, add to spellbook
        
        // first method - naive approach
        // const t0 = performance.now();
        // for (let i = 0; i < spells.length; i++) {
        //     let response = await fetch('https://www.dnd5eapi.co' + spells[i].url)
        //     let data = await response.json(); 
        //     let spell = new Spell(data.name, data.desc, data.school, data.classes);
        //     this.addSpell(spell);
        //  }     
        // const t1 = performance.now();
        // console.log('Call to populateSpellbook took ' + (t1 - t0) + ' milliseconds.');
        // ^ this method took 40 seconds to run. 40 seconds to fetch 319 spells.

        // second method - use parallel promises to speed up process (https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop)
        // const t0 = performance.now();
        // const promises = [];
        // for (let i = 0; i < spells.length; i++) {
        //     let spell = spells[i];
        //     let promise = fetch('https://www.dnd5eapi.co' + spell.url);
        //     promises.push(promise);
        // }
        // const responses = await Promise.all(promises);
        // for (let i = 0; i < responses.length; i++) {
        //     let response = responses[i];
        //     let data = await response.json();
        //     let spell = new Spell(data.name, data.desc, data.school, data.classes);
        //     this.addSpell(spell);
        // }
        // const t1 = performance.now();
        // console.log('Call to do the spellbook took ' + (t1 - t0) + ' milliseconds.');
        // ^ this method took 13 seconds to run. 13 seconds to fetch 319 spells.

        // third method - parallel approach with async/await and uses of map
        const t0 = performance.now();
        const ids = [];
        // form array of ids
        for (let i = 0; i < spells.length; i++) {
            ids.push(i);
        }
        // fetch data for each id
        const responses = await Promise.all(ids.map(async id => {
            const res = await fetch('https://www.dnd5eapi.co' + spells[id].url);
            return res;
        }));
        // create spell objects
        const datas = await Promise.all(responses.map(async res => {
            const data = await res.json();
            return data;
        }));
        // add spell objects to spellbook
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            let spell = new Spell(data.name, data.desc, data.school.name);
            for (let j = 0; j < data.classes.length; j++) {
                spell.addClass(data.classes[j].name);
            }
            this.addSpell(spell);
        }
        const t1 = performance.now();
        console.log('Call to do the spellbook took ' + (t1 - t0) + ' milliseconds.');
        // ^ this method took 6 seconds to run. 6 seconds to fetch 319 spells ; as it is the fastest, it is the one used.
    }

    async displaySpellbook() {
        await this.populateSpellbook();
        let div = document.getElementById('div-loader');
        div.innerHTML = '';
        div.id = 'div-spellbook';   
        let spellTable = document.createElement('table');
        spellTable.setAttribute('id', 'spell-table');
        
        let spellTableHeader = document.createElement('thead');
        spellTableHeader.setAttribute('id', 'spell-table-header');
        spellTable.appendChild(spellTableHeader);
        let spellTableHeaderRow = document.createElement('tr');
        spellTableHeaderRow.setAttribute('class', 'spell-table-header-row');
        spellTableHeader.appendChild(spellTableHeaderRow);
        let spellTableHeaderName = document.createElement('th');
        spellTableHeaderName.innerText = 'Name';
        spellTableHeaderRow.appendChild(spellTableHeaderName);
        let spellTableHeaderSchool = document.createElement('th');
        spellTableHeaderSchool.innerText = 'School';
        spellTableHeaderRow.appendChild(spellTableHeaderSchool);
        let spellTableHeaderClasses = document.createElement('th');
        spellTableHeaderClasses.innerText = 'Classes';
        spellTableHeaderRow.appendChild(spellTableHeaderClasses);
        let spellTableHeaderDescription = document.createElement('th');
        spellTableHeaderDescription.innerText = 'Description';
        spellTableHeaderRow.appendChild(spellTableHeaderDescription);

        let spellTableBody = document.createElement('tbody');
        spellTableBody.setAttribute('id', 'spell-table-body');
        spellTable.appendChild(spellTableBody);
        div.appendChild(spellTable);
        let spells = this.getSpells();
        for (let i = 0; i < spells.length; i++) {
            let spell = spells[i];
            let spellRow = document.createElement('tr');
            spellRow.setAttribute('class', 'spell-row');
            spellTableBody.appendChild(spellRow);
            let spellName = document.createElement('td');
            spellName.setAttribute('class', 'spell-name');
            spellName.innerText = spell.getName();
            spellRow.appendChild(spellName);
            let spellSchool = document.createElement('td');
            spellSchool.setAttribute('class', 'spell-school');
            spellSchool.innerText = spell.getSchool();
            spellRow.appendChild(spellSchool);

            let spellClasses = document.createElement('td');
            spellClasses.setAttribute('class', 'spell-classes');
            let classes = spell.getClasses();
            for (let j = 0; j < classes.length; j++) {
                let spellClass = document.createElement('p');
                spellClass.setAttribute('class', 'spell-class');
                spellClass.innerText = classes[j];
                spellClasses.appendChild(spellClass);
            }
            spellRow.appendChild(spellClasses);

            let spellDesc = document.createElement('td');
            spellDesc.setAttribute('class', 'spell-desc');
            let desc = spell.getDesc();
            for (let j = 0; j < desc.length; j++) {
                let spellDescLine = document.createElement('p');
                spellDescLine.setAttribute('class', 'spell-desc-line');
                spellDescLine.innerText = desc[j];
                spellDesc.appendChild(spellDescLine);
            }
            spellRow.appendChild(spellDesc);
        }
    }
}

export { Spellbook as default };