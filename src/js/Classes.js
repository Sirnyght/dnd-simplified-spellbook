import Class from './Class';
import placeholder from '../images/placeholder.png';

class Classes {
    constructor() {
        console.log('Classes constructor called');
        this.classes = [];
    }

    getClasses() { return this.classes; }
    setClasses(classes) { this.classes = classes; }

    async populateClasses() {
        // fetch classes from API
        let response = await fetch('https://www.dnd5eapi.co/api/classes');
        let data = await response.json();
        let classes = data.results;

        // loop through classes
        for (let i = 0; i < classes.length; i++) {
            let response = await fetch('https://www.dnd5eapi.co' + classes[i].url);
            let data = await response.json();

            let classObj = new Class();
                classObj.setName(data.name);
                classObj.setImage(require('../images/' + data.index + '.jpg'));
                this.classes.push(classObj);
        }
    }

    async displayClassesChoice() {
        // create select element containing all classes name
        await this.populateClasses();
        
        let select = document.getElementById('class-choice');
        for (let i = 0; i < this.classes.length; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.innerText = this.classes[i].getName();
            select.appendChild(option);
        }

        // when class is selected, display class image and display only spells from that class
        select.addEventListener('change', (e) => {
            let img = document.getElementById('img-class');
            if (e.target.value >= 0) {
                // display class image
                img.src = this.classes[e.target.value].getImage();
                // display spells from that class (change spellbook table)
                let spellbookBody = document.getElementById('spell-table-body');
                for (let i = 0; i < spellbookBody.rows.length; i++) {
                    let spell = spellbookBody.rows[i];
                    let classes = spell.cells[2].innerText;
                    if (classes.includes(this.classes[e.target.value].getName())) {
                        spell.style.display = '';
                    } else {
                        spell.style.display = 'none';
                    }
                }
            } else {
                img.src = placeholder;
                // display all spells
                let spellbookBody = document.getElementById('spell-table-body');
                for (let i = 0; i < spellbookBody.rows.length; i++) {
                    let spell = spellbookBody.rows[i];
                    spell.style.display = '';
                }
            }
        });

        // append select element to div-classes
        let div = document.getElementById('div-class-choice');
        div.appendChild(select);
    }

    display() {
        let classesContainer = document.getElementById('div-classes');
        let classes = document.createElement('div');
        classes.id = 'classes';
        classes.className = 'classes';
        classesContainer.appendChild(classes);
    }
}

export { Classes as default };