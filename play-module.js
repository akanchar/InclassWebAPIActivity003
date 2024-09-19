/* In this module, create three classes: Play, Act, and Scene. */
class Play {
    constructor(title, short, persona, acts){
        this.title = title;
        this.short = short;
        this.persona = persona.map[person=> new Persona(person.position,person.player,person.desc)];
        this.acts = acts.map(act=> new Act(act.name, act.scenes));
    }
    


    getAct(name){
        return this.acts.find(act=>act.name===name);
    }
}
class Act {
    constructor(name, scenes) {
        this.name = name;
        this.scenes = scenes;
    }
}

class Scene {
    constructor(name, title, stageDirection, speeches) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches;
    }
}

class Persona{
    constructor(position, player,desc){
        this.position = position;
        this.player = player;
        this.desc  = desc;
    }
}
