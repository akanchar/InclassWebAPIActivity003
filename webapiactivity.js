import { Play } from './play-module.js';

document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
    
    const playList = document.querySelector("#playList");
    const actList = document.querySelector("#actList");
    const sceneList = document.querySelector("#sceneList");
    const playerList = document.querySelector("#playerList");
    const playTitle = document.querySelector("#playTitle");
    const actTitle = document.querySelector("#actTitle");
    const sceneTitle = document.querySelector("#sceneTitle");

    let currentPlay = null;

    playList.addEventListener("change", async (event) => {
        const playName = event.target.value;
        if (playName === "0") return;
        
        const playData = await fetchPlayData(playName);
        currentPlay = new Play(playData.title,playData.short, playData.persona,playData.acts);
        populateActs(currentPlay);

        const firstAct = currentPlay.acts[0];
        populateScenes(firstAct);
        displayScene(firstAct.scenes[0]);
    });

    actList.addEventListener("change", () => {
        const actIndex = parseInt(actList.value);
        const selectedAct = currentPlay.acts[actIndex];
        populateScenes(selectedAct);
        displayScene(selectedAct.scenes[0]);
    });

    sceneList.addEventListener("change", () => {
        const actIndex = parseInt(actList.value);
        const sceneIndex = parseInt(sceneList.value);
        const selectedScene = currentPlay.acts[actIndex].scenes[sceneIndex];
        displayScene(selectedScene);
    });

    async function fetchPlayData(playName) {
        const response = await fetch(`${url}?name=${playName}`);
        const data = await response.json();
        return data;
    }

    function populateActs(play) {
        actList.innerHTML = play.acts.map((act, index) => `<option value="${index}">${act.name}</option>`).join('');
    }

    function populateScenes(act) {
        sceneList.innerHTML = act.scenes.map((scene, index) => `<option value="${index}">${scene.name}</option>`).join('');
    }

    function displayScene(scene) {
        playTitle.textContent = currentPlay.title;
        actTitle.textContent = scene.actName;
        sceneTitle.textContent = scene.name;
        const sceneHere = document.querySelector("#sceneHere");
        sceneHere.innerHTML = scene.speeches.map(speech => 
            `<div class="speech"><span>${speech.player}</span><p>${speech.text.join('</p><p>')}</p></div>`).join('');
    }
});
