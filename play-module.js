
/* In this module, create three classes: Play, Act, and Scene. */
export class Play {
    constructor(title, short, persona, acts){
        this.title = title;
        this.short = short;
        this.persona = persona.map(Person=> new Persona(Person.position,Person.player,Person.desc));
        this.acts = acts.map(act=> new Act(act.name, act.scenes));

    }
    startPlay(actList, sceneList){
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
export class Act {
    constructor(name, scenes) {
        this.name = name;
        this.scenes = scenes.map(scene=> new Scene(scene.name,scene.title,scene.stageDirection, scene.speeches));
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
    getScene(name){
        return this.scenes.find(scene=>scene.name===name);
    }
}


export class Scene {
    constructor(name, title, stageDirection, speeches) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches.map(speech=>new Speech(speech.speaker, speech.lines));
    }
    sceneOption(){
        const optionScene = document.createElement('option');
        optionScene.value = this.name;
        optionScene.text = this.name;
        return optionScene;
    }
    speechFill(speechText, sceneHere){ //WIP
        console.log(typeof(speechHere))
        sceneHere.innerHTML = '';
        
        const name = document.createElement('h4');
        name.innerHTML = this.name;
        sceneHere.appendChild(name);

        const title = document.createElement('p');
        title.className = "title";
        title.innerHTML = this.title;
        sceneHere.appendChild(title);

        const direction = document.createElement('p');
        direction.className = "direction";
        direction.innerHTML = this.stageDirection;
        sceneHere.appendChild(direction);

        this.speeches.forEach(a=>{
            const divider = document.createElement('div');
            divider.className = "speech";
            const speaker = document.createElement('span');
            speaker.className = "speaker";
            speaker.innerHTML = a.speaker;
            divider.appendChild(speaker);
            a.linesGenerator(divider);
            sceneHere.appendChild(divider);
        })
    }

}

class Persona{
    constructor(position, player,desc){
        this.position = position;
        this.player = player;
        this.desc  = desc;
    }
}
class Speech{
    constructor(speaker, lines){
        this.speaker = speaker;
        this.lines = lines;
    }
    linesGenerator(container){
        
        this.lines.forEach(l=>{
            const line = document.createElement('p');
            line.innerHTML = `${l}`;
            container.appendChild(line);
        })
        return container;
    }
}