
document.addEventListener('DOMContentLoaded', () => {
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const playHere = document.getElementById('playHere');
   const actHere = document.getElementById('actHere');
   const sceneHere = document.getElementById('sceneHeres');

   let playData;  // Store fetched play data here

   // Event listener for the playList change
   playList.addEventListener('change', async () => {
      const playValue = playList.value;
      if (playValue === '0') return;

      const response = await fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=${playValue}`);
      playData = await response.json();

      // Update play title
      playHere.querySelector('h2').textContent = playData.title;

      // Populate actList
      if (playData.acts && playData.acts.length > 0) {
         actList.innerHTML = playData.acts.map((act, index) => `<option value="${index}">${act.name}</option>`).join('');
         updateSceneList(0);  // Default to the first act's scenes
         updatePlayDetails(0, 0);  // Default to the first scene of the first act
      }

      // Populate playerList
      if (playData.players && playData.players.length > 0) {
         playerList.innerHTML = playData.players.map(player => `<option value="${player.id}">${player.name}</option>`).join('');
         playerList.insertAdjacentHTML('afterbegin', '<option value="0">All Players</option>');
      }
   });

   // Event listener for actList change
   actList.addEventListener('change', () => {
      const selectedActIndex = actList.selectedIndex;
      if (playData && playData.acts && selectedActIndex >= 0 && selectedActIndex < playData.acts.length) {
         updateSceneList(selectedActIndex);
         updatePlayDetails(selectedActIndex, 0);  // Default to the first scene of the selected act
      }
   });

   // Event listener for sceneList change
   sceneList.addEventListener('change', () => {
      const selectedActIndex = actList.selectedIndex;
      const selectedSceneIndex = sceneList.selectedIndex;
      if (playData && playData.acts[selectedActIndex] && selectedSceneIndex >= 0 && selectedSceneIndex < playData.acts[selectedActIndex].scenes.length) {
         updatePlayDetails(selectedActIndex, selectedSceneIndex);
      }
   });

   // Helper function to populate scene list based on selected act
   function updateSceneList(actIndex) {
      const scenes = playData.acts[actIndex].scenes;
      sceneList.innerHTML = scenes.map((scene, index) => `<option value="${index}">${scene.name}</option>`).join('');
   }

  // Helper function to update play, act, and scene details
  function updatePlayDetails(actIndex, sceneIndex) {
   const act = playData.acts[actIndex];
   const scene = act.scenes[sceneIndex];

   // Clear previous content
   sceneHere.innerHTML = '';

   // 1. Update Act Name
   if (actHere && actHere.querySelector('h3')) {
      actHere.querySelector('h3').textContent = act.name;
   }

   // 2. Display Scene Name (e.g., "SCENE I")
   const sceneNameElement = document.createElement('h4');
   sceneNameElement.textContent = scene.name;
   sceneHere.appendChild(sceneNameElement);

   // 3. Display Scene Title (e.g., "Elsinore. A platform before the castle") or Stage Direction
   if (scene.title) {
      const sceneTitleElement = document.createElement('p');
      sceneTitleElement.className = 'scene-title';  
      sceneTitleElement.textContent = scene.title;
      sceneHere.appendChild(sceneTitleElement);
   }

   // 4. Add Stage Direction (if any)
   if (scene.stageDirection) {
      const stageDirectionElement = document.createElement('p');
      stageDirectionElement.className = 'stage-direction';
      stageDirectionElement.textContent = scene.stageDirection;
      sceneHere.appendChild(stageDirectionElement);
   }

   // 5. Populate Speeches
   scene.speeches.forEach(speech => {
      const speechDiv = document.createElement('div');
      speechDiv.className = 'speech';

      const speakerElement = document.createElement('span');
      speakerElement.textContent = speech.speaker;
      speechDiv.appendChild(speakerElement);

      speech.lines.forEach(line => {
         const lineElement = document.createElement('p');
         lineElement.textContent = line;
         speechDiv.appendChild(lineElement);
      });

      sceneHere.appendChild(speechDiv);
   });
  }
});