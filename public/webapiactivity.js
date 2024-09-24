
import { Play, Act, Scene } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function () {
    
    //filters for selected player & words when filter button clicked
    function filter() {
        const query = document.getElementById("txtHighlight").value.toLowerCase();
        const selectedSpeaker = document.getElementById("playerList").value;
        const speeches = sceneDiv.querySelectorAll(".speech");
        
        //check each speech for defined criteria (txt/speaker)
        speeches.forEach(speechDiv => {
            const speaker = speechDiv.querySelector("span").textContent;
            const lines = Array.from(speechDiv.querySelectorAll("p"));
    
            //css reset
            const speakerSpan = speechDiv.querySelector("span");
            speakerSpan.innerHTML = speaker; // Reset to plain text
    
            //filter by speaker IF speaker selected
            if (selectedSpeaker.toLowerCase() !== "select a player" && speaker.toLowerCase() !== selectedSpeaker.toLowerCase()) {
                speechDiv.style.display = "none"; //hide
                return;
            } else {
                speechDiv.style.display = ""; //show
            }

            //highlight words that match query
            lines.forEach(lineP => {
                const text = lineP.textContent;
                lineP.innerHTML = text;
    
                if (query && text.toLowerCase().includes(query)) {
                    const highlightedLine = text.replace(new RegExp(query, 'gi'), (match) => `<b>${match}</b>`);
                    lineP.innerHTML = highlightedLine;
                }
            });
        });
    }
    
    document.getElementById("btnHighlight").addEventListener("click", filter); 

    const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
    const playList = document.getElementById("playList");
    const actList = document.getElementById("actList");
    const sceneList = document.getElementById("sceneList");
    const playSect = document.getElementById("playHere");
    const actSection = document.getElementById("actHere");
    const sceneDiv = document.getElementById("sceneHere");
    let speakerList = [];

    playList.addEventListener("change", (e) => {
      const selectedPlay = e.target.value;

      // check if the play data is already in local storage
      let storedPlay = localStorage.getItem(selectedPlay);
      
      if (storedPlay) {
          // parse the stored play data
          let play = new Play(JSON.parse(storedPlay));
          let acts = play.getActs();

          // populate the act list
          populateActList(acts);

          // default to Act 1 and Scene 1
          populateSceneList(acts[0].scenes);
          loadScene(acts[0].scenes[0]); // load default act 1, scene 1

          playSect.querySelector("h2").innerHTML = play.getPlay();
          actSection.querySelector("h3").innerHTML = acts[0].getAct();
      } else {
          // fetch the play data from the API if it's not in local storage
          fetch(url + `?name=${selectedPlay}`)
              .then(res => res.json())
              .then(data => {
                  let play = new Play(data);
                  let acts = play.getActs();

                  // atore the play data in local storage
                  localStorage.setItem(selectedPlay, JSON.stringify(data));

                  populateActList(acts);

                  populateSceneList(acts[0].scenes);
                  loadScene(acts[0].scenes[0]); 

                  playSect.querySelector("h2").innerHTML = play.getPlay();
                  actSection.querySelector("h3").innerHTML = acts[0].getAct();
              });
        } 
    });

    // populate the act list
    function populateActList(acts) {
        actList.innerHTML = '';

        acts.forEach((act, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = act.getAct();
            actList.appendChild(option);
        });

        actList.selectedIndex = 0;
        actList.addEventListener("change", () => {
            const selectedAct = acts[actList.value];
            actSection.querySelector("h3").innerHTML = selectedAct.getAct();
            populateSceneList(selectedAct.scenes);
            loadScene(selectedAct.scenes[0]); // default to scene 1 in the selected act
        });
    }

    //populate the scene list
    function populateSceneList(scenes) {
        sceneList.innerHTML = '';

        scenes.forEach((scene, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = scene.getScene();
            sceneList.appendChild(option);
        });

        sceneList.selectedIndex = 0;
        sceneList.addEventListener("change", () => {
            const selectedScene = scenes[sceneList.value];
            loadScene(selectedScene);
        });
    }
    
    // function to load a scene
    function loadScene(scene) {
        // populate scene name, title, and stage direction
        sceneDiv.querySelector("h4").textContent = scene.getScene();
        sceneDiv.querySelector(".title").textContent = scene.getTitle();
        sceneDiv.querySelector(".direction").textContent = scene.getDirection();

        // clear existing speeches
        const existingSpeeches = sceneDiv.querySelectorAll(".speech");
        existingSpeeches.forEach(speech => speech.remove());

        // populate speeches
        speakerList= [];
        scene.speeches.forEach(speech => {
            const speechDiv = document.createElement("div");
            speechDiv.classList.add("speech");

            // speaker name
            const speakerSpan = document.createElement("span");
            speakerSpan.textContent = speech.getSpeaker();
            speechDiv.appendChild(speakerSpan);
            speakerList.push(speech.getSpeaker());

            // speech lines
            speech.getLines().forEach(line => {
                const lineP = document.createElement("p");
                lineP.textContent = line;
                speechDiv.appendChild(lineP);
            });

            // append the speech to the scene
            sceneDiv.appendChild(speechDiv);
            
        });

        //filter for only unique speakers
        document.getElementById("txtHighlight").value = "";
        populateSpeakers([...new Set(speakerList)]);

    }
    
    //populate speakers
    function populateSpeakers(speakers) {
        playerList.innerHTML = ''; // clear the speaker list

        const option = document.createElement('option'); //default 
        option.textContent = "Select a Player";
        option.value = "Select a Player";
        playerList.appendChild(option);

        speakers.forEach(speaker => { //put all speakers in curr act as an option
            const option = document.createElement('option');
            option.textContent = speaker;
            playerList.appendChild(option);
        });

        playerList.selectedIndex = 0;
    }
});