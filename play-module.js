/* In this module, create three classes: Play, Act, and Scene. */
class Play {
    constructor(title, short, persona, acts){
        this.title = title;
        this.short = short;
        this.persona = persona.map[person=> new Persona(person.position,person.player,person.desc)];
        this.acts = acts.map(act=> new Act(act.name, act.scenes));
    }
    startPlay(actList, sceneList){
        if (this.acts.length>0){
            actList.value = acts[0].name;
            actTitle.innerHTML = acts[0].name;
            sceneList.value = acts[0].scenes[0].name;
            sceneTitle.innerHTML = acts[0].scenes[0].name;
        }
            actList.innerHTML= '';
            sceneList.innerHTML = '';

            const actInitial = document.createElement('option');
            actInitial.value = "Select An Act";
            actInitial.text = "Select An Act";
            actList.appendChild(actInitial);

            const sceneInitial = document.createElement('option');
            sceneInitial.value = "Select A Scene";
            sceneInitial.text = "Select A Scene";
            sceneList.appendChild(sceneInitial);

            this.acts.forEach(act => { //for each act...
                actList.appendChild(act.actOption()); 
    });
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
    actOption(){
        const optionAct = document.createElement('option');
        optionAct.value = this.name;
        optionAct.text = this.name;
        return optionAct;
    }

    sceneOptionList(sceneList){
        sceneList.innerHTML = '';
        this.scenes.forEach(scene => { //for each scene...
            sceneList.appendChild(scene.sceneOption()); 
    })

}
}

class Scene {
    constructor(name, title, stageDirection, speeches) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches;
    }
    sceneOption(){
        const optionScene = document.createElement('option');
        optionScene.value = this.name;
        optionScene.text = this.name;
        return optionScene;
    }

}

class Persona{
    constructor(position, player,desc){
        this.position = position;
        this.player = player;
        this.desc  = desc;
    }
}
