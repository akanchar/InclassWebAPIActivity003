/* In this module, create three classes: Play, Act, and Scene. */

// play-module.js

class Play {
    constructor(title, acts) {
        this.title = title;
        this.acts = acts;  // Acts is an array of Act objects
    }

    getAct(index) {
        return this.acts[index];
    }
}

class Act {
    constructor(name, scenes) {
        this.name = name;
        this.scenes = scenes;  // Scenes is an array of Scene objects
    }

    getScene(index) {
        return this.scenes[index];
    }
}

class Scene {
    constructor(name, title, stageDirection, speeches) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches;  // Speeches is an array of speech objects
    }

    getSpeeches() {
        return this.speeches;
    }
}

// Export the classes
export { Play, Act, Scene };
