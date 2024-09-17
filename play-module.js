class Play {
    constructor(data) {
        this.Playtitle = data.title;
        this.acts = data.acts.map(actData => new Act(actData));
    }

    returnPlay() {
        return `<h2>${this.Playtitle}</h2>`;
    }
}

class Act {
    constructor(data) {
        this.Actname = data.name;
        this.scenes = data.scenes.map(sceneData => new Scene(sceneData));
    }

    returnAct() {
        return `<h3>${this.Actname}</h3>`;
    }
}

class Scene {
    constructor(data) {
        this.Scenename = data.name;
    }

    returnScene() {
        return `<h4>${this.Scenename}</h4>`;
    }
}
