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

      // Don't do anything if the user hasn't selected a valid play
      if (playValue === "0") return;

      // Fetch the selected play API
      fetch(url + '?name=' + playValue)
          .then(response => response.json())
          .then(data => {
              // Clear the existing act options in the actList dropdown
              actList.innerHTML = '';
              sceneList.innerHTML = '';
              playerList.innerHTML = '';
              playHere.innerHTML = '';  // Clear previous play content

              // Add play title
              const playTitle = document.createElement('h2');
              playTitle.textContent = data.title;
              playHere.appendChild(playTitle);  // Append play title

              // Loop through the acts and populate the actList dropdown
              data.acts.forEach((act, index) => {
                  const option = document.createElement("option");
                  option.value = index;  // Option value set as index to access act later
                  option.textContent = act.name;  // Display act name
                  actList.appendChild(option);
              });

              // Act selection event
              actList.addEventListener("change", () => {
                  sceneList.innerHTML = '';
                  const selectedAct = data.acts[actList.value];

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
                  
                  // Populate players dropdown
                  data.persona.forEach((player, index) => {
                      const option = document.createElement("option");
                      option.value = index;  // Option value set as index to access player later
                      option.textContent = player.player;  // Display player name
                      playerList.appendChild(option);
                  });
              });

              // On button click, filter speeches and display scene content
              // On button click, filter speeches and display scene content
btnHighlight.addEventListener('click', function() {
  const selectedActIndex = actList.value;
  const selectedSceneIndex = sceneList.value;
  const searchTerm = txtHighlight.value.toLowerCase();  // Get the search term

  if (selectedActIndex === '' || selectedSceneIndex === '') {
      alert('Please select both an Act and a Scene.');
      return;
  }

  const selectedAct = data.acts[selectedActIndex];
  const selectedScene = selectedAct.scenes[selectedSceneIndex];

  playHere.innerHTML = '';  // Clear previous content

  // 1. Create and append play title (h2)
  const playTitle = document.createElement('h2');
  playTitle.textContent = data.title;  // Use data.title to access the play's full title
  playHere.appendChild(playTitle);
  
  // 2. Create and append act title (h3)
  const actTitle = document.createElement('h3');
  actTitle.textContent = selectedAct.name;  // Example: 'ACT I'
  playHere.appendChild(actTitle);
  
  // 3. Create and append scene name (h4)
  const sceneName = document.createElement('h4');
  sceneName.textContent = selectedScene.name;  // Example: 'SCENE I'
  playHere.appendChild(sceneName);
  
  // 4. Create and append scene title (p)
  const sceneTitle = document.createElement('p');
  sceneTitle.classList.add('title');  // Add a class for styling if needed
  sceneTitle.textContent = selectedScene.title;  // Use selectedScene.title to get the full scene title (e.g., "Rome: the neighbourhood of Sardis...")
  playHere.appendChild(sceneTitle);
  
  // 5. Create and append stage direction (p, italic)
  const stageDirection = document.createElement('p');
  stageDirection.classList.add('direction');
  stageDirection.style.fontStyle = 'italic';  // Italicize stage direction
  stageDirection.textContent = selectedScene.stageDirection;
  playHere.appendChild(stageDirection);
  
  // Now continue with appending speeches and other elements
  

  // Filter speeches by the search term or player and display them
  selectedScene.speeches.forEach(speech => {
      const speechDiv = document.createElement('div');
      speechDiv.classList.add('speech');
      
      const speaker = document.createElement('span');
      speaker.textContent = speech.speaker;
      speaker.style.fontWeight = 'bold';
      speaker.style.textTransform = 'uppercase'; // Make speaker name uppercase
      speechDiv.appendChild(speaker);

      speech.lines.forEach(line => {
          const lineElement = document.createElement('p');

          // Highlight the search term in the line
          if (searchTerm !== '') {
              const regex = new RegExp(searchTerm, 'gi');  // Case-insensitive search
              const highlightedLine = line.replace(regex, match => {
                  return `<b>${match}</b>`;  // Wrap matching term with <b> tags
              });
              lineElement.innerHTML = highlightedLine;  // Apply highlighted text
          } else {
              lineElement.textContent = line;  // No highlight, just display the line
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

