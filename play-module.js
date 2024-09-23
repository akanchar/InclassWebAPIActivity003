/* In this module, create three classes: Play, Act, and Scene. */

class Play {
    constructor() {
        this.acts = [];
    }

    addAct(act) {
        this.acts.push(act);
    }

    getActs() {
        return this.acts;
    }
}

class Act {
    constructor() {
        this.scenes = [];
    }

    addScene(scene) {
        this.scenes.push(scene);
    }

    getScenes() {
        return this.scenes;
    }
}

class Scene {
    constructor() {
        this.speeches = [];
    }

    addSpeech(speech) {
        this.speeches.push(speech);
    }

    getSpeeches() {
        return this.speeches;
    }
}