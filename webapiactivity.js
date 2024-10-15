// Nathaniel Gonzalez
// CSC 350-1
// In-class Web API activity 003

/*
    Sources:
    - Fetch API usage:
        https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    - Working with Promises:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

    - ES6 Classes:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

    - Event Handling in JavaScript:
        https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers

    - DOM Manipulation:
        https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Manipulating_the_DOM

    - Regular Expressions in JavaScript:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

    - Assistance from ChatGPT for debugging and refining logic
*/


// import the necessary classes and functions from the play-module
import { Play, populateSelectElement } from './play-module.js';

// wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {

    // base URL for fetching play data
    const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

    // get references to the DOM elements we'll interact with
    const playList = document.getElementById('playList');
    const actList = document.getElementById('actList');
    const sceneList = document.getElementById('sceneList');
    const playerList = document.getElementById('playerList');
    const txtHighlight = document.getElementById('txtHighlight');
    const btnHighlight = document.getElementById('btnHighlight');

    const playHere = document.getElementById('playHere');
    const actHere = document.getElementById('actHere');
    const sceneHere = document.getElementById('sceneHere');

    // variables to keep track of the current play, act, and scene
    let currentPlay = null;
    let currentAct = null;
    let currentScene = null;

    // event listener for when the user selects a play
    playList.addEventListener('change', function () {
        const playName = playList.value;
        if (playName != 0) {
            const playUrl = `${url}?name=${playName}`;

            // fetch the play data from the API
            fetch(playUrl)
                .then(response => response.json())
                .then(data => {
                    // create a new Play object with the fetched data
                    currentPlay = new Play(data);

                    // populate the act list dropdown with the acts from the play
                    populateSelectElement(actList, currentPlay.getActTitles());

                    // display the play title in the DOM
                    currentPlay.renderPlay(playHere);

                    // by default, select and display the first act and its scenes
                    currentAct = currentPlay.acts[0];
                    currentAct.renderAct(actHere);
                    populateSelectElement(sceneList, currentAct.getSceneTitles());

                    // display the first scene from the first act
                    currentScene = currentAct.scenes[0];
                    currentScene.renderScene(sceneHere);

                    // populate the player list dropdown with all speakers from the play
                    const players = currentPlay.getAllSpeakers();
                    populateSelectElement(playerList, ['All Players'].concat(players), true);
                })
                .catch(error => {
                    console.error('Error fetching play data:', error);
                });
        }
    });

    // event listener for when the user selects a different act
    actList.addEventListener('change', function () {
        const selectedActIndex = actList.value;
        currentAct = currentPlay.acts[selectedActIndex];
        currentAct.renderAct(actHere);

        // populate the scene list dropdown with scenes from the selected act
        populateSelectElement(sceneList, currentAct.getSceneTitles());

        // display the first scene from the selected act
        currentScene = currentAct.scenes[0];
        currentScene.renderScene(sceneHere);

        // re-populate the player list in case the set of speakers has changed
        const players = currentPlay.getAllSpeakers();
        populateSelectElement(playerList, ['All Players'].concat(players), true);
    });

    // event listener for when the user selects a different scene
    sceneList.addEventListener('change', function () {
        const selectedSceneIndex = sceneList.value;
        currentScene = currentAct.scenes[selectedSceneIndex];
        currentScene.renderScene(sceneHere);
    });

    // event listener for when the user selects a different player
    playerList.addEventListener('change', function () {
        const searchText = txtHighlight.value;
        const selectedPlayer = playerList.value;

        // re-render the scene with the new player filter and search text
        currentScene.renderScene(sceneHere, selectedPlayer, searchText);
    });

    // event listener for when the user clicks the filter button
    btnHighlight.addEventListener('click', function () {
        const searchText = txtHighlight.value;
        const selectedPlayer = playerList.value;

        // re-render the scene with the current filters applied
        currentScene.renderScene(sceneHere, selectedPlayer, searchText);
    });

});
