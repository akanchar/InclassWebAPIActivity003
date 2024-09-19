/* In this module, create three classes: Play, Act, and Scene. */
class Play {

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
