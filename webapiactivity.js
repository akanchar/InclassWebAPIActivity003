import {Scene, Act, Play} from "./play-module.js"

const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

var playObject = null;

var oldPlayerInfoText = null;

function populateActList() {
    //Populate the list of ACTS and select the first ACT by default
    const allActs = playObject.getAllActs();
    const actList = document.getElementById('actList');
    actList.innerHTML = "";

    var firstOption = true;
    allActs.forEach(act => {
        const actOption = document.createElement("option");
        actOption.textContent = act;
        actOption.value = act;
        if (firstOption) {
            actOption.selected = true;
            firstOption = false;
        }
        actList.appendChild(actOption);
    });
}

function actEventHandler(event) {
    //Populate the list of Scenes and select the first Scene by default
    populateSceneList();
}

function populateSceneList(selectedScene = "0"){

    const sceneList = document.getElementById('sceneList');
    sceneList.innerHTML = "";
    var firstOption = true;
    playObject.getActByName(document.getElementById('actList').value).getAllScenes().forEach(scene => {
    const sceneOption = document.createElement("option");
    sceneOption.textContent = scene;
    sceneOption.value = scene;
    if (firstOption) {
        sceneOption.selected = true;
        firstOption = false;
    }
    sceneList.appendChild(sceneOption);
    });
    renderPlayInfo(playObject);

}

function sceneEventHandler(event) {
    //Populate the list of Scenes and select the first Scene by default
    populatePlayerList();
}



function populatePlayerList() {
    //Populate the list of Scenes and select the first Scene by default

    const playerList = document.getElementById('playerList');
    playerList.innerHTML = "";

    const sceneObject = playObject.getActByName(document.getElementById('actList').value).getSceneByName(document.getElementById('sceneList').value);             
    let speakerArr = ["All Players"].concat(Array.from(new Set(sceneObject.speeches.map(sp => sp.speaker))));
    var firstOption = true;
    speakerArr.forEach(speaker =>{
        const playerOption = document.createElement("option");
        playerOption.textContent = speaker;
        playerOption.value = speaker;
        if (firstOption) {
            playerOption.selected = true;
            firstOption = false;
        }
        playerList.appendChild(playerOption);
    });
    renderPlayInfo(playObject);

}

function playerEventHandler(event){

    renderPlayInfo(playObject);
    oldPlayerInfoText = document.getElementById('actHere').innerHTML;
}

function highLightWords(event) {
    var htmlText = oldPlayerInfoText;
    var textToHighlight = document.getElementById('txtHighlight').value;
        let text = htmlText;
        let re = new RegExp(textToHighlight,"g"); // search for all instances
        let newText = text.replace(re, `<b>${textToHighlight}</b>`);
        document.getElementById('actHere').innerHTML = newText;
}

document.addEventListener("DOMContentLoaded", function() {
	
    const  playlist = document.getElementById('playList');

   //  Add a change event handler to the first <select>, which contains a preset list of plays.
    playlist.addEventListener("change", async (event) => {
        // Get the selected play's value (from the <option> value attribute)
        const selectedPlay = event.target.value;

         // Only fetch if a valid play is selected (value is not "0")
         if (selectedPlay !== "0") {
            try {
                const urlWithPlay = `${url}?name=${selectedPlay}`;
                const response = await fetch(urlWithPlay);
                const playData = await response.json();
                playObject = parsePlayData(playData);

                //Update the play title

                populateActList();

                populateSceneList();

                populatePlayerList();
                renderPlayInfo(playObject);


            }
            catch (error) {
               console.error('Cannot fetch play data:', error); 
            }
         } 

    });

    document.getElementById('actList').addEventListener("change",actEventHandler);
    document.getElementById('sceneList').addEventListener("change",sceneEventHandler);
    document.getElementById('playerList').addEventListener("change",playerEventHandler);
    document.getElementById('btnHighlight').addEventListener("click",highLightWords);

});

   // Function to parse the play data and create Play, Act, and Scene objects
   function parsePlayData(playData) {
    const acts = playData.acts.map(actData => {
        const scenes = actData.scenes.map(sceneData => {
            return new Scene(sceneData.name, sceneData.title, sceneData.stageDirection, sceneData.speeches);
        });
        return new Act(actData.name, scenes);
    });

    return new Play(playData.title, acts);
    }

    function renderPlayInfo(playObject) {
        const playHereSection = document.getElementById('playHere');
        playHereSection.innerHTML = "";
  
        const playTitleDOM = document.createElement("h2");
        playTitleDOM.textContent = playObject.getTitle();
        playHereSection.appendChild(playTitleDOM);

            const actArticleDOM = document.createElement("article");
            actArticleDOM.setAttribute("id","actHere");
            playHereSection.appendChild(actArticleDOM);

            const actNameDOM = document.createElement("h3");
            actNameDOM.setAttribute("id","actNameId");
            actNameDOM.textContent = document.getElementById('actList').value;
            actArticleDOM.appendChild(actNameDOM);

            const scenesDivDOM = document.createElement("div");
            scenesDivDOM.setAttribute("id","sceneHere");
            actArticleDOM.appendChild(scenesDivDOM);

                const scenesNameDOM = document.createElement("h4");
                scenesNameDOM.setAttribute("id","sceneNameId");
                scenesNameDOM.textContent = document.getElementById('sceneList').value;;
                scenesDivDOM.appendChild(scenesNameDOM);

                const scenesParaDOM = document.createElement("p");
                scenesParaDOM.setAttribute("id","screenTitleId");
                scenesParaDOM.setAttribute("class","title");
                scenesParaDOM.textContent = playObject.getActByName(document.getElementById('actList').value).getSceneByName(document.getElementById('sceneList').value).getTitle();
                scenesDivDOM.appendChild(scenesParaDOM);

                const stageDirectionParaDOM = document.createElement("p");
                stageDirectionParaDOM.setAttribute("id","stageDirectionId");
                stageDirectionParaDOM.setAttribute("class","direction");
                stageDirectionParaDOM.textContent = playObject.getActByName(document.getElementById('actList').value).getSceneByName(document.getElementById('sceneList').value).getStageDirection();
                scenesDivDOM.appendChild(stageDirectionParaDOM);


                playObject.getActByName(document.getElementById('actList').value)
                .getSceneByName(document.getElementById('sceneList').value)
                .getSpeechesBySpeaker(document.getElementById('playerList').value).forEach(speech =>{
                    const speechDiv = document.createElement("div");
                    speechDiv.setAttribute("id","speechInfoId");
                    speechDiv.setAttribute("class","speech");
                    scenesDivDOM.appendChild(speechDiv);

                    const speakerSpan = document.createElement("span");
                    speakerSpan.setAttribute("class","speech");
                    speakerSpan.textContent = speech.speaker;
                    speechDiv.appendChild(speakerSpan);

                    speech.lines.forEach(line =>{
                        const linePara = document.createElement("p");
                        linePara.textContent = line;
                        speechDiv.appendChild(linePara);
                        });
                    }
                );

    }
/* Sources

https://blog.webdevsimplified.com/2022-01/event-listeners/

https://forum.freecodecamp.org/t/using-data-with-fetch/455680

https://stackoverflow.com/questions/66753195/how-to-populate-array-with-values-from-api-using-fetch-in-javascript-function

https://stackoverflow.com/questions/68581324/javascript-recursively-fetch-data-to-populate-html-text

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

https://stackoverflow.com/questions/24298757/javascript-change-html-in-event-listener

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

https://api.jquery.com/change/

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

https://www.w3schools.com/js/js_htmldom_nodes.asp#:~:text=To%20add%20a%20new%20element,it%20to%20an%20existing%20element.

https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro

https://developer.mozilla.org/en-US/docs/Glossary/Semantics

https://stackoverflow.com/questions/54568714/can-i-use-classes-to-create-place-elements-in-the-dom

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this


*/