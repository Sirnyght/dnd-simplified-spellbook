class Spell {
    constructor(name, desc, school) {
        console.log('Spell constructor called');
        this.name = name;
        this.desc = desc;
        this.school = school;
        this.classes = [];
    }

    getName() { return this.name; }
    getDesc() { return this.desc; }
    getSchool() { return this.school; }
    getClasses() { return this.classes; }
    setName(name) { this.name = name; }
    setDesc(desc) { this.desc = desc; }
    setSchool(school) { this.school = school; }
    setClasses(classes) { this.classes = classes; }
    addClass(className) { this.classes.push(className); }
}  

export { Spell as default };