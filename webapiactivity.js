import { Play, Act, Scene } from './play-module.js';  // Import Play, Act, and Scene classes

document.addEventListener("DOMContentLoaded", function() {
  const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  const playHere = document.getElementById('playHere');
  const btnHighlight = document.getElementById('btnHighlight');
  const txtHighlight = document.getElementById('txtHighlight');

  const actList = document.getElementById("actList");
  const sceneList = document.getElementById("sceneList");
  const playerList = document.getElementById("playerList");

   // Play selection event
   document.getElementById("playList").addEventListener("change", function() {
      const playValue = this.value;
      console.log(playValue)

      // Don't do anything if the user hasn't selected a valid play
      if (playValue === "0") return;

      // Fetch the selected play API
      fetch(url + '?name=' + playValue)
          .then(response => response.json())
          .then(data => {
            console.log(data)
              // Clear the existing act options in the actList dropdown
              actList.innerHTML = '';
              sceneList.innerHTML = '';
              playerList.innerHTML = '';
              playHere.innerHTML = '';  // Clear previous play content

              // Create instances of Act and Scene from the data
              const acts = data.acts.map(actData => {
                  const scenes = actData.scenes.map(sceneData => {
                      return new Scene(sceneData.name, sceneData.title, sceneData.stageDirection, sceneData.speeches);
                  });
                  return new Act(actData.name, scenes);
              });

              // Create an instance of Play
              const play = new Play(data.title, acts);

              // Add play title
              const playTitle = document.createElement('h2');
              playTitle.textContent = play.title;
              playHere.appendChild(playTitle);  // Append play title

              // Populate the act list dropdown
              play.acts.forEach((act, index) => {
                  const option = document.createElement("option");
                  option.value = index;
                  option.textContent = act.name;  // Display act name
                  actList.appendChild(option);
              });

              // Act selection event
              actList.addEventListener("change", () => {
                  sceneList.innerHTML = '';
                  const selectedAct = play.getAct(actList.value);

                  // Populate scenes
                  selectedAct.scenes.forEach((scene, index) => {
                      const newOption = document.createElement('option');
                      newOption.value = index;
                      newOption.textContent = scene.name;
                      sceneList.appendChild(newOption);
                  });
              });

              // Scene selection event
              sceneList.addEventListener("change", () => {
                  playerList.innerHTML = '';
                  const selectedAct = play.getAct(actList.value);
                  const selectedScene = selectedAct.getScene(sceneList.value);

                  // Populate players dropdown
                  data.persona.forEach((player, index) => {
                      const option = document.createElement("option");
                      option.value = index;
                      option.textContent = player.player;  // Display player name
                      playerList.appendChild(option);
                  });

                  // On button click, filter speeches and display scene content
                  btnHighlight.addEventListener('click', function() {
                      const selectedPlayerIndex = playerList.value;
                      const selectedPlayer = data.persona[selectedPlayerIndex]?.player;
                      const searchTerm = txtHighlight.value.toLowerCase();

                      playHere.innerHTML = '';  // Clear previous content

                      // Display the play title, act title, and scene title
                      const playTitle = document.createElement('h2');
                      playTitle.textContent = play.title;
                      playHere.appendChild(playTitle);

                      const actTitle = document.createElement('h3');
                      actTitle.textContent = selectedAct.name;
                      playHere.appendChild(actTitle);

                      const sceneTitle = document.createElement('h4');
                      sceneTitle.textContent = selectedScene.name;
                      playHere.appendChild(sceneTitle);

                      const stageDirection = document.createElement('p');
                      stageDirection.style.fontStyle = 'italic';
                      stageDirection.textContent = selectedScene.stageDirection;
                      playHere.appendChild(stageDirection);

                      // Display all speeches, highlighting only the selected player's lines
                      selectedScene.getSpeeches().forEach(speech => {
                          const speechDiv = document.createElement('div');
                          speechDiv.classList.add('speech');

                          const speaker = document.createElement('span');
                          speaker.textContent = speech.speaker;
                          speaker.style.fontWeight = 'bold';
                          speaker.style.textTransform = 'uppercase';
                          speechDiv.appendChild(speaker);

                          speech.lines.forEach(line => {
                              const lineElement = document.createElement('p');

                              // Highlight the search term only in the selected player's speeches
                              if (selectedPlayer && speech.speaker.toLowerCase() === selectedPlayer.toLowerCase()) {
                                  if (searchTerm !== '') {
                                      const regex = new RegExp(searchTerm, 'gi');
                                      const highlightedLine = line.replace(regex, match => `<b>${match}</b>`);
                                      lineElement.innerHTML = highlightedLine;
                                  } else {
                                      lineElement.textContent = line;
                                  }
                              } else {
                                  lineElement.textContent = line;  // Display all lines without modification
                              }

                              speechDiv.appendChild(lineElement);
                          });

                          playHere.appendChild(speechDiv);
                      });
                  });
              });
          })
          .catch(error => {
              console.error("Error fetching the play data:", error);
          });
   });
});
