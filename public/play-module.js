/* In this module, create three classes: Play, Act, and Scene. */
export class Play {
    constructor(play) {
        this.title = play.title; 
        this.acts = play.acts.map(act => 
            new Act(act)
        );
    }
    getPlay() {
        return this.title;
    }
    getActs() {
        return this.acts;
    }
}

export class Act {
    constructor(act) {
        this.name = act.name; 
        this.scenes = act.scenes.map(scene => 
            new Scene(scene)
        );
    }
    getAct() {
        return this.name;
    }
    getScenes() {
        return this.scenes;
    }
}

export class Scene {
    constructor(scene) {
        this.name = scene.name; 
        this.title = scene.title;
        this.direction = scene.stageDirection;
        this.speeches = scene.speeches.map(speech => 
            new Speech(speech) 
        );
    }
    getScene() {
        return this.name;
    }
    getTitle() {
        return this.title
    }
    getDirection() {
        return this.direction
    }
    getSpeeches() {
        return this.name;
    }
}

export class Speech {
    constructor(speech) {
        this.speaker = speech.speaker;
        this.lines = speech.lines;
    }
    getSpeaker() {
        return this.speaker;
    }
    getLines() {
        return this.lines;
    }
}
