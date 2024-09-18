/*document.addEventListener("DOMContentLoaded", function() {
	
	const baseURL = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   document.getElementById('playlist').addEventListener('change', async function(){
      const play = this.value;
      if (play === "0") return;

      try{
         const response = await fetch('${baseURL?name=${play}');
         const playData = await response.json();

         populateActs(playData.acts);
         populatePlayDetails(playData.acts[0]);

      } catch (error) {
         console.error(error)('error fetching play data: ', error);

      }
   });

   function populateActs(acts){
      const actList = document.getElementById('actList');
      actList.innerHTML = '';
      acts.forEach((act, index) => {
         const option = document.createElement('option');
         option.value = index;
         option.textContent = act.title;
         actList.appendChild(option);
      });

      actList.addEventListener('change', function(){
         const selectedAct = acts[this.value];
         populateScenes(selectedAct.scenes);
         populatePlayers(selectedAct.players);

      });

   function populateScenes(scenes){
      const sceneList = document.getElementById('sceneList');
      sceneList.innerHTML = '';  
      scenes.forEach((scene, index) => {
         const option = document.createElement('option');
         option.value = index;
         option.textContent = scene.title;
         sceneList.appendChild(option);
      });

      sceneList.addEventListener('change', function(){
         const selectedScene = scenes[this.value];
         populatePlayDetails(selectedScene);
      });
   }

   function populatePlayers(players){
      const playerList = document.getElementById('playerList');
      playerList.innerHTML = '<option value="0">All player</option>';
      players.forEach(player => {
         const option = document.createElement('option');
         option.value = player;
         option.textContent = player;
         playerList.appendChild(option);

      });
   }

   function updateSceneDetails(scene){
      const sceneDiv = document.getElementById('sceneDetails');
      sceneDetails.innerHTML = '';
      
      const sceneTitle = document.createElement('h4');
      sceneTitle.textContent = scene.title;
      sceneDiv.appendChild(sceneTitle);

      const sceneDescription = document.createElement('p');
      sceneDescription.textContent = scene.description;
      sceneDescription.className = 'direction';
      sceneDiv.appendChild(sceneDescription);

      scene.speeches.forEach(speech => {
         const speechDiv = document.createElement('div');
         speechDiv.className = 'speech';
         

         const speaker = document.createElement('span');
         speaker.textContent = speech.speaker;
         speechDiv.appendChild(speaker);

         speech.lines.forEach(line => {
            const speechText = document.createElement('p');
            speechText.textContent = line;
            speechDiv.appendChild(speechText);
         });
      
         sceneDiv.appendChild(speechDiv);
      });
   }

   function populatePlayDetails(firstAct) {
      const playSection = document.getElementById('playHere');
      const actArticle = document.createElement('actHere');
      const sceneDiv = document.createElement('sceneHere');

      playSection.querySelector('h2').textContent = firstAct.playtitle;
      actArticle.querySelector('h3').textContent = 'Act: ${firstAct.name}';
      updateSceneDetails(firstAct.scenes[0]);
   }
     

   
}}); */
document.addEventListener('DOMContentLoaded', () => {
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const playHere = document.getElementById('playHere');
   const actHere = document.getElementById('actHere');
   const sceneHere = document.getElementById('sceneHere');

   playList.addEventListener('change', async () => {
      const playValue = playList.value;
      if (playValue === '0') return;

      try {
         const response = await fetch(`https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php${playValue}`);
         const playData = await response.json();

         // Populate actList
         actList.innerHTML = playData.acts.map(act => `<option value="${act.id}">${act.name}</option>`).join('');

         // Populate sceneList
         sceneList.innerHTML = playData.acts[0].scenes.map(scene => `<option value="${scene.id}">${scene.name}</option>`).join('');

         // Populate playerList
         playerList.innerHTML = playData.players.map(player => `<option value="${player.id}">${player.name}</option>`).join('');
         playerList.insertAdjacentHTML('afterbegin', '<option value="0">All Players</option>');

         // Populate playHere, actHere, and sceneHere
         playHere.querySelector('h2').textContent = playData.title;
         actHere.querySelector('h3').textContent = playData.acts[0].name;
         sceneHere.querySelector('h4').textContent = playData.acts[0].scenes[0].name;

         // Clear previous content
         sceneHere.querySelectorAll('.speech, .title, .direction').forEach(el => el.remove());

         // Populate scene content
         playData.acts[0].scenes[0].content.forEach(content => {
            const element = document.createElement(content.type);
            element.className = content.class;
            element.innerHTML = content.text;
            sceneHere.appendChild(element);
         });

      } catch (error) {
         console.error('Error fetching play data:', error);
      }
   });
});
