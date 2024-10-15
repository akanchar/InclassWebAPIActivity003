// Nathaniel Gonzalez
// CSC 350-1
// In-class Web API activity 003

/*
    Sources:
    - ES6 Classes and Modules:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

    - Array methods (`map`, `forEach`, `find`):
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    - Set object for unique values:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

    - Element Creation:
        https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

    - Regular Expressions for search and replace:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

    - Escaping special characters in regex:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping

    - Assistance from ChatGPT for debugging and refining logic
*/

// class representing a Play
export class Play {
    constructor(data) {
        this.title = data.title; 
        this.acts = data.acts.map(actData => new Act(actData)); 
    }

    // method to display the play title in the DOM
    renderPlay(playHereElement) {
        playHereElement.querySelector('h2').textContent = this.title;
    }

    // get an array of act titles, e.g., ["ACT 1", "ACT 2"]
    getActTitles() {
        return this.acts.map((_, index) => `ACT ${index + 1}`);
    }

    // find an act by its title
    getActByTitle(title) {
        return this.acts.find(act => act.title === title);
    }

    // get a sorted array of all unique speakers in the play
    getAllSpeakers() {
        const speakersSet = new Set();
        this.acts.forEach(act => {
            act.scenes.forEach(scene => {
                scene.speeches.forEach(item => {
                    if (item.speaker) {
                        speakersSet.add(item.speaker);
                    }
                });
            });
        });
        return Array.from(speakersSet).sort();
    }
}

// class representing an Act within a Play
export class Act {
    constructor(data) {
        this.title = data.title; 
        this.scenes = data.scenes.map((sceneData, index) => new Scene(sceneData, index)); 
    }

    // method to display the act title in the DOM
    renderAct(actHereElement) {
        actHereElement.querySelector('h3').textContent = this.title;
    }

    // get an array of scene titles, e.g., ["Scene 1", "Scene 2"]
    getSceneTitles() {
        return this.scenes.map((_, index) => `Scene ${index + 1}`);
    }

    // find a scene by its title
    getSceneByTitle(title) {
        return this.scenes.find(scene => scene.title === title);
    }
}

// class representing a Scene within an Act
export class Scene {
    constructor(data, index) {
        this.name = `Scene ${index + 1}`;
        this.title = data.title; 
        this.speeches = data.speeches || [];
        this.stageDirection = data.stageDirection;
    }

    // method to display the scene content in the DOM, with optional filtering
    renderScene(sceneHereElement, selectedPlayer = 'All Players', searchText = '') {
        sceneHereElement.innerHTML = ''; 

        // create and display the scene name
        const h4 = document.createElement('h4');
        h4.textContent = this.name;
        sceneHereElement.appendChild(h4);

        // display the scene's detailed title or description
        const pTitle = document.createElement('p');
        pTitle.classList.add('title');
        pTitle.textContent = this.title;
        sceneHereElement.appendChild(pTitle);

        // display any stage directions at the start of the scene
        if (this.stageDirection) {
            const pStageDirection = document.createElement('p');
            pStageDirection.classList.add('direction');
            pStageDirection.textContent = this.stageDirection;
            sceneHereElement.appendChild(pStageDirection);
        }

        // loop through each speech or stage direction in the scene
        this.speeches.forEach(item => {
            if (item.speaker) {
                // if the item is a speech and matches the selected player or "All Players"
                if (selectedPlayer === 'All Players' || item.speaker === selectedPlayer) {
                    const divSpeech = document.createElement('div');
                    divSpeech.classList.add('speech');

                    // display the speaker's name
                    const speakerSpan = document.createElement('span');
                    speakerSpan.textContent = item.speaker;
                    divSpeech.appendChild(speakerSpan);

                    // loop through each line in the speech
                    item.lines.forEach(line => {
                        const p = document.createElement('p');
                        let lineContent = line;

                        // if there's search text, highlight matching text in the line
                        if (searchText) {
                            const escapedSearchText = escapeRegExp(searchText);
                            const regex = new RegExp(`(${escapedSearchText})`, 'gi');
                            lineContent = line.replace(regex, '<span class="highlight">$1</span>');
                        }

                        // set the line content with any highlights
                        p.innerHTML = lineContent;
                        divSpeech.appendChild(p);
                    });

                    // add the speech to the scene
                    sceneHereElement.appendChild(divSpeech);
                }
            } else if (item.stageDirection) {
                // if the item is a stage direction, display it
                const p = document.createElement('p');
                p.classList.add('direction');
                p.textContent = item.stageDirection;
                sceneHereElement.appendChild(p);
            }
        });
    }
}

// utility function to escape special regex characters in the search text
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// function to populate a select element with options
export function populateSelectElement(selectElement, items, useItemAsValue = false) {
    selectElement.innerHTML = '';
    items.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = useItemAsValue ? item : index;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}
