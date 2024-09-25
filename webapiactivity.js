

document.addEventListener("DOMContentLoaded", function() {
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = docuemnt.getElementById('playerList');
   const playHere = document.getElementById('playHere');
   
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
            console.log(data);
            populateActs(data);
            populatePlayers(data.persona);
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