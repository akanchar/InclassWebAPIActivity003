document.addEventListener('DOMContentLoaded', () => {
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const playHere = document.getElementById('playHere');
   const actHere = document.getElementById('actHere');
   const sceneHere = document.getElementById('sceneHeres');

   let playData; 
   let selectedPlayer = '0'; //track the player


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
         updateSceneList(0);  
         updatePlayDetails(0, 0);  
      }

      // Populate playerList
      if (playData.persona && playData.persona.length > 0) {
         playerList.innerHTML = playData.persona.map(player => `<option value="${player.player}">${player.player} - ${player.desc}</option>`).join('');
         playerList.insertAdjacentHTML('afterbegin', '<option value="0">All Players</option>');
      }
   });

   // Event listener for actList change
   actList.addEventListener('change', () => {
      const selectedActIndex = actList.selectedIndex;
      if (playData && playData.acts && selectedActIndex >= 0 && selectedActIndex < playData.acts.length) {
         updateSceneList(selectedActIndex);
         updatePlayDetails(selectedActIndex, 0);  
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
//stores the selected player nd hopefully changes the display
   playerList.addEventListener('change', () => {
      selectedPlayer = playerList.value; 
      const selectedActIndex = actList.selectedIndex;
      const selectedSceneIndex = sceneList.selectedIndex;
      updatePlayDetails(selectedActIndex, selectedSceneIndex);  
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

   // Update Act Name
   if (actHere && actHere.querySelector('h3')) {
      actHere.querySelector('h3').textContent = act.name;
   }

   // Display Scene Name 
   const sceneNameElement = document.createElement('h4');
      sceneNameElement.textContent = scene.name;
      sceneHere.appendChild(sceneNameElement);

   // Display Scene Title
   if (scene.title) {
      const sceneTitleElement = document.createElement('p');
      sceneTitleElement.className = 'scene-title';  
      sceneTitleElement.textContent = scene.title;
      sceneHere.appendChild(sceneTitleElement);
   }

   // stage directuion (in element p )
   if (scene.stageDirection) {
      const stageDirectionElement = document.createElement('p');
      stageDirectionElement.className = 'stage-direction';
      stageDirectionElement.textContent = scene.stageDirection;
      sceneHere.appendChild(stageDirectionElement);
   }

   // Populate Speeches (fills the div, span, and p elements in the html)
   scene.speeches
   .filter(speech => selectedPlayer === "0" || speech.speaker === selectedPlayer)  // Show all or filter by player
   .forEach(speech => {
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

// Highlight search terms
   btnHighlight.addEventListener('click', () => {
      let lookText = document.getElementById('lookText').value;
      let doText = document.getElementById('doText').innerHTML;

      if (!lookText) {
         alert("Please enter a search term");
         return;
   }

      let searchPattern = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

      let highlightedText = sceneText.replace(searchPattern, match => `<span class="highlight">${match}</span>`);

      sceneHere.innerHTML = highlightedText;
   });

   const style = document.createElement('style');
   style.innerHTML = '.highlight { background-color: yellow; }';
   document.head.appendChild(style);
});
