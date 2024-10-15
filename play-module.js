/* In this module, create three classes: Play, Act, and Scene. */

// Scene Class
class Scene {
    constructor(name, title, stageDirection, speeches = []) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches.map(speech => ({
            speaker: speech.speaker,
            lines: speech.lines
        }));
    }

    // Method to get all lines from the scene
    getAllLines() {
        return this.speeches.flatMap(speech => speech.lines);
    }

    // Method to get lines by a specific speaker
    getLinesBySpeaker(speaker) {
        const speech = this.speeches.filter(s => s.speaker == speaker);
        return speech ? speech.flatMap(speech => speech.lines) : [];
    }

    // Method to get lines by a specific speaker
    getSpeechesBySpeaker(speaker) {
        if ((speaker == 'All Players') || (speaker == '0'))
        {
            return this.speeches;
        }
        else {
            return this.speeches.filter(s => s.speaker == speaker);
        }
    }

    getAllSpeakers() {
        return this.scenes.map(scene => scene.name);
    }

    getTitle(){
        return this.title;
    }

    getStageDirection(){
        return this.stageDirection;
    }
}

// Act Class
class Act {
    constructor(name, scenes = []) {
        this.name = name;
        this.scenes = scenes;  // Array of Scene objects
    }

    // Method to get the first scene of the act
    getFirstScene() {
        return this.scenes.length > 0 ? this.scenes[0] : null;
    }

    getAllScenes() {
        return this.scenes.map(scene => scene.name);
    }

    // Method to get a specific act by its name
    getSceneByName(name) {
        return this.scenes.find(scene => scene.name === name);
    }
}

// Play Class
class Play {
    constructor(title, acts = []) {
        this.title = title;
        this.acts = acts;  // Array of Act objects
    }

    // Method to get the first act of the play
    getFirstAct() {
        return this.acts.length > 0 ? this.acts[0] : null;
    }

    // Method to get a specific act by its name
    getActByName(name) {
        return this.acts.find(act => act.name === name);
    }

    getAllActs() {
        return this.acts.map(act => act.name);
    }

    getTitle(){
        return this.title;
    }
}

export {Scene, Act, Play}

