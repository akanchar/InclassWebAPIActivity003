document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

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

       document.getElementById("playList").addEventListener("change", function() {
         const playValue = this.value;
     
         // Don't do anything if the user hasn't selected a valid play
         if (playValue === "0") return;
     
         // Fetch the selected play API
         fetch(url+'?name='+playValue)
             .then(response => response.json())
             .then(data => {
                 // Clear the existing act options in the actList dropdown
                 const actList = document.getElementById("actList");
                 actList.innerHTML = '';
                 const sceneList = document.getElementById("sceneList");
                 sceneList.innerHTML = '';
                 const playerList = document.getElementById("playerList");
                 sceneList.innerHTML = '';
     
                 // Loop through the acts and populate the actList dropdown
                 data.acts.forEach((act, index) => {
                     const option = document.createElement("option");
                     option.value = index;  // Option value set as index to access act later
                     option.textContent = act.name;  // Display act name
                     actList.appendChild(option);
                 });
                 console.log(data.acts[0])
                 console.log(actList.value)
                 actList.addEventListener("change", () => {
                     sceneList.innerHTML = ""
                     data.acts[actList.value].scenes.forEach((scene, index) => {
                        const newOption = document.createElement("option");
                        newOption.value = index;  // Option value set as index to access act later
                        newOption.textContent = scene.name;  // Display act name
                        sceneList.appendChild(newOption);
                 });
                 sceneList.addEventListener("change", () => {
                  playerList.innerHTML = ""
                  data.persona.forEach((player, index) => {
                    const option = document.createElement("option");
                    option.value = index;  // Option value set as index to access player later
                    option.textContent = player.player;  // Display player name
                    playerList.appendChild(option);
              });
            })
                   
                 })
             })
             .catch(error => {
                 console.error("Error fetching the play data:", error);
             });
     });
   }  
     
);