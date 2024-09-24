class Persona {
    constructor(position, player, desc) {
        this.position = position;
        this.player = player;
        this.desc = desc;
    }
}

export class Play {
    constructor(title, short, persona, acts) {
        this.title = title;
        this.short = short;
        this.persona = persona.map(person => new Persona(person.position, person.player, person.desc));
        this.acts = acts.map(act => new Act(act.name, act.scenes));
    }
}

export class Act {
    constructor(name, scenes) {
        this.name = name;
        this.scenes = scenes.map(sceneData => new Scene(sceneData, this.name));
    }
}

export class Scene {
    constructor(data, actName) {
        this.name = data.name; // Changed to 'name'
        this.actName = actName;
        this.speeches = data.speeches.map(speech => ({
            player: speech.speaker,
            text: speech.lines
        }));
    }
}
