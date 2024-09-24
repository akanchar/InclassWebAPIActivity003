

export class Play { 
    constructor(title, short, persona, acts){ // constructor for play
        this.title = title;
        this.short = short;
        this.persona = persona.map(Person=> new Persona(Person.position,Person.player,Person.desc));
        this.acts = acts.map(act=> new Act(act.name, act.scenes));

    }
    startPlay(actList, sceneList, playerList){ //initiliazes selected play by filling in act, scene, and player list
        actList.innerHTML= '';
        sceneList.innerHTML = '';
        playerList.innerHTML = '';

        //creates initial option to prompt user to select an act
        const actInitial = document.createElement('option');
        actInitial.value = "Select An Act";
        actInitial.text = "Select An Act";
        actList.appendChild(actInitial);

        //creates initial option to prompt user to select a scene
        const sceneInitial = document.createElement('option');
        sceneInitial.value = "Select A Scene";
        sceneInitial.text = "Select A Scene";
        sceneList.appendChild(sceneInitial);

        //creates initial option to prompt user to select a person
        const playerInitial = document.createElement('option');
        playerInitial.value = "";
        playerInitial.text = "All Players";
        playerList.appendChild(playerInitial);

        this.acts.forEach(act => { //for each act, it creates an option and appends to act list for dropdown
            actList.appendChild(act.actOption()); 
        
        });
        this.persona.forEach(person => { //for each person in the selected play, it creates an option for playerlist dropdown.
            playerList.appendChild(person.personOption());
        })
    }

    getAct(name){ //returns act object based on given act name
        return this.acts.find(act=>act.name===name);
    }
}
export class Act {
    constructor(name, scenes) { //constructor for Act
        this.name = name;
        this.scenes = scenes.map(scene=> new Scene(scene.name,scene.title,scene.stageDirection, scene.speeches));
    }
    actOption(){ //creates option element for act object
        const optionAct = document.createElement('option');
        optionAct.value = this.name;
        optionAct.text = this.name;
        return optionAct;
    }

    sceneOptionList(sceneList){ // creates list of scenes based on selected act
        sceneList.innerHTML = '';
        this.scenes.forEach(scene => { //for each scene, creates option 
            sceneList.appendChild(scene.sceneOption()); 
        })
    }
    getScene(name){ //returns scene object 
        return this.scenes.find(scene=>scene.name===name);
    }
}


export class Scene {
    constructor(name, title, stageDirection, speeches) { // constructor for Scene
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches.map(speech=>new Speech(speech.speaker, speech.lines));
    }
    sceneOption(){ //creates scene options
        const optionScene = document.createElement('option');
        optionScene.value = this.name;
        optionScene.text = this.name;
        return optionScene;
    }
    speechFill(speechText, sceneHere, selectedSpeaker = null,filterText = null){ //fills scene dialogue with scene title,stage direction, speakers,filter text and respective dialogues
        //console.log(typeof(speechHere))
        sceneHere.innerHTML = '';
        
        //Helps to debug
        /* console.log("Filling speech...");
        console.log("Selected Speaker:", selectedSpeaker);
        console.log("Filter Text:", filterText); */

        // Creates scene name element
        const name = document.createElement('h4');
        name.innerHTML = this.name;
        sceneHere.appendChild(name);

        //creates scene title element
        const title = document.createElement('p');
        title.className = "title";
        title.innerHTML = this.title;
        sceneHere.appendChild(title);

        // creates stage direction element
        const direction = document.createElement('p');
        direction.className = "direction";
        direction.innerHTML = this.stageDirection;
        sceneHere.appendChild(direction);

        // fills in speech dialogue
        this.speeches.forEach(a=>{
            if(selectedSpeaker === null||selectedSpeaker===""|| a.speaker === selectedSpeaker ){ // or statement from ChatGPT to help handle selected speaker
                const divider = document.createElement('div');
                divider.className = "speech";
                const speaker = document.createElement('span');
                speaker.className = "speaker";
                speaker.innerHTML = a.speaker;
                divider.appendChild(speaker);
                a.linesGenerator(divider,filterText);
        
                
                sceneHere.appendChild(divider);
            }
            
        });
    }

}

class Persona{
    constructor(position, player,desc){ // constructor for persona
        this.position = position;
        this.player = player;
        this.desc  = desc;
    }
    personOption(){ //creates option for each person in play
        const optionPerson = document.createElement('option');
        optionPerson.value = this.player;
        optionPerson.text = this.player;
        optionPerson.id = this.desc;
        return optionPerson;
    }
}
class Speech{
    constructor(speaker, lines,stagedir ){ // constructor for speeches
        this.speaker = speaker;
        this.lines = lines;
        this.stagedir = stagedir;
        
    }
    linesGenerator(container,filterText = null){ //creates paragraph element for each line in the speech of a speaker
        
        this.lines.forEach(l=>{
            const line = document.createElement('p');
            if (filterText===null){ // if there is no filter text --> add line like normal
                line.innerHTML = `${l}`;
            }
            else { // got this else from ChatGPT and https://www.w3schools.com/Js/js_regexp.asp
                const regex = new RegExp(`(${filterText})`, 'gi');
                line.innerHTML = l.replace(regex, `<b>$1</b>`);
            }

            container.appendChild(line);
            
        })
        
        return container;
    }
}
