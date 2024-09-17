

document.addEventListener("DOMContentLoaded", function() {

	
	const baseURL = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   document.getElementById('playlist').addEventListener('change', async function(){
      const plat = this.value;
      if (play === "0") return;

      try{
         const response = await fetch('${baseURL?name=${play}');
         const platData = await response.json();

         populateActs(platData.acts);
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
         populateSceneDetails(selectedScene);
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
};