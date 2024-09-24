

document.addEventListener("DOMContentLoaded", function() {
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const playHere = document.getElementById('playHere');
   let playDataGlobal = {}; // Store fetched play data for later use

   // Add event listener to playlist dropdown
   playList.addEventListener('change', function() {
      const selectedPlay = playList.value;
      if (selectedPlay === "hamlet") {
         fetchPlayData('hamlet.json');
      } else if (selectedPlay === "jcaesar") {
         fetchPlayData('jcaesar.json');
      }
   });

   // Fetch play data and populate act dropdown
   function fetchPlayData(playUrl) {
      fetch(playUrl)
         .then(response => response.json())
         .then(data => {
            playDataGlobal = data;
            console.log(data);
            populateActs(data);
            populatePlayers(data.persona);
            updateSceneAndActDisplay();
         })
         .catch(err => console.error('Error fetching play data:', err));
   }

   // Populate the act list with the fetched data
   function populateActs(playData) {
      actList.innerHTML = '';

      // Populate acts
      playData.acts.forEach((act, index) => {
         const option = document.createElement('option');
         option.value = index;
         option.textContent = act.name;
         actList.appendChild(option);
      });

      // Populate the scenes for the first act
      populateScenes(playData.acts[0]);
   }

   // Populate the scene list based on the selected act
   function populateScenes(actData) {
      sceneList.innerHTML = '';

      // Populate scenes
      actData.scenes.forEach((scene, index) => {
         const option = document.createElement('option');
         option.value = index;
         option.textContent = scene.name;
         sceneList.appendChild(option);
      });
   }

   // Add event listeners for act and scene selections
   actList.addEventListener('change', function() {
      const selectedAct = playDataGlobal.acts[actList.value];
      populateScenes(selectedAct);
      updateSceneAndActDisplay();
   });

   sceneList.addEventListener('change', updateSceneAndActDisplay);

   // Populate the player list based on the persona data
   function populatePlayers(personaData) {
      playerList.innerHTML = '<option value=0>All Players</option>'; // Reset player list

      // Populate players
      personaData.forEach(person => {
         const option = document.createElement('option');
         option.value = person.player;
         option.textContent = `${person.player} (${person.desc})`;
         playerList.appendChild(option);
      });
   }

   // Populate the playHere section based on play data
   function updateSceneAndActDisplay() {
      const selectedActIndex = actList.value;
      const selectedSceneIndex = sceneList.value;

      // Clear previous content
      playHere.innerHTML = '';

      // Get the selected act and scene
      const selectedAct = playDataGlobal.acts[selectedActIndex];
      const selectedScene = selectedAct.scenes[selectedSceneIndex];

      // Create play title
      const titleElement = document.createElement('h2');
      titleElement.textContent = playDataGlobal.title;
      playHere.appendChild(titleElement);

      // Create act and scene display
      const actElement = document.createElement('article');
      actElement.id = 'actHere';
      playHere.appendChild(actElement);


      // Create and append Act name (h3) with styling
      const actTitleElement = document.createElement('h3');
      actTitleElement.textContent = selectedAct.name;
      actElement.appendChild(actTitleElement);

      // Create and append Scene name (h4) with border styling
      const sceneElement = document.createElement('div');
      sceneElement.id = 'sceneHere';
      actElement.appendChild(sceneElement);

      const sceneTitleElement = document.createElement('h4');
      sceneTitleElement.textContent = selectedScene.name;
      sceneElement.appendChild(sceneTitleElement);

      // Create and append stage direction
      const stageDirectionElement = document.createElement('p');
      stageDirectionElement.className = 'direction';
      stageDirectionElement.textContent = selectedScene.stageDirection;
      sceneElement.appendChild(stageDirectionElement);

      // Populate speeches with the correct structure and classes
      selectedScene.speeches.forEach(speech => {
         const speechElement = document.createElement('div');
         speechElement.className = 'speech';

         // Add the speaker name (span)
         const speakerElement = document.createElement('span');
         speakerElement.textContent = speech.speaker;
         speechElement.appendChild(speakerElement);

         // Add each line (p) inside the speech
         speech.lines.forEach(line => {
            const lineElement = document.createElement('p');
            lineElement.textContent = line;
            speechElement.appendChild(lineElement);
         });

         sceneElement.appendChild(speechElement);
      });
   }
   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});