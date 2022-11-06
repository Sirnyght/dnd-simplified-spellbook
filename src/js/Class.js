import SpBk from './Spellbook.js';

class Class {
    constructor() {
        console.log('Class constructor called');
        this.name = '';
        this.image = '';
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    setName(name) {
        this.name = name;
    }

    setImage(image) {
        this.image = image;
    }
}

export { Class as default };