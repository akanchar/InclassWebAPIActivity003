document.addEventListener("DOMContentLoaded", function() {
   // Wait for the DOM to be fully loaded before running the script.
   
   const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   // API endpoint for fetching Shakespeare play data.

   const playList = document.getElementById('playList');
   // Dropdown element for selecting a play.

   const actList = document.getElementById('actList');
   // Dropdown element for selecting an act.

   const sceneList = document.getElementById('sceneList');
   // Dropdown element for selecting a scene.

   const playerList = document.getElementById('playerList');
   // Dropdown element for selecting a character/player.

   const playHere = document.getElementById('playHere');
   // Section to display the play content (acts, scenes, speeches).

   const txtHighlight = document.getElementById('txtHighlight');
   // Input field to enter text for highlighting within the play.

   const btnHighlight = document.getElementById('btnHighlight');
   // Button to trigger highlighting of the specified search term.

   let playDataGlobal = {}; // Store fetched play data for later use.

   // Add event listener to the playList dropdown for changing the selected play.
   playList.addEventListener('change', function() {
      const selectedPlay = playList.value; // Get the value of the selected play.
      if (selectedPlay === "hamlet") {
         fetchPlayData('hamlet.json'); // Fetch Hamlet play data.
      } else if (selectedPlay === "jcaesar") {
         fetchPlayData('jcaesar.json'); // Fetch Julius Caesar play data.
      }
   });

   // Function to fetch the play data from the API and populate the act dropdown.
   function fetchPlayData(playUrl) {
      fetch(playUrl) // Fetch play data from the provided URL.
         .then(response => response.json()) // Parse the response to JSON.
         .then(data => {
            playDataGlobal = data; // Store the fetched data globally for later use.
            console.log(data); // Log the fetched data to the console for debugging.
            populateActs(data); // Populate the act dropdown based on the fetched data.
            populatePlayers(data.persona); // Populate the player dropdown.
            updateSceneAndActDisplay(); // Display the first act and scene by default.
         })
         .catch(err => console.error('Error fetching play data:', err)); // Handle fetch errors.
   }

   // Function to populate the act list using the fetched play data.
   function populateActs(playData) {
      actList.innerHTML = ''; // Clear any existing act options.

      // Loop through each act and create an option element for the dropdown.
      playData.acts.forEach((act, index) => {
         const option = document.createElement('option');
         option.value = index; // Set the option value to the act index.
         option.textContent = act.name; // Set the option text to the act name.
         actList.appendChild(option); // Add the option to the act dropdown.
      });

      populateScenes(playData.acts[0]); // Populate the scenes for the first act by default.
   }

   // Function to populate the scene list based on the selected act.
   function populateScenes(actData) {
      sceneList.innerHTML = ''; // Clear any existing scene options.

      // Loop through each scene in the selected act and create an option element.
      actData.scenes.forEach((scene, index) => {
         const option = document.createElement('option');
         option.value = index; // Set the option value to the scene index.
         option.textContent = scene.name; // Set the option text to the scene name.
         sceneList.appendChild(option); // Add the option to the scene dropdown.
      });
   }

   // Add event listener to the act dropdown to populate the scenes for the selected act.
   actList.addEventListener('change', function() {
      const selectedAct = playDataGlobal.acts[actList.value]; // Get the selected act data.
      populateScenes(selectedAct); // Populate the scenes for the selected act.
      updateSceneAndActDisplay(); // Update the displayed act and scene content.
   });

   // Add event listener to the scene dropdown to update the displayed content on change.
   sceneList.addEventListener('change', updateSceneAndActDisplay);

   // Function to populate the player list dropdown using the persona data.
   function populatePlayers(personaData) {
      playerList.innerHTML = '<option value=0>All Players</option>'; // Add default 'All Players' option.

      // Loop through each persona and create an option element for each player.
      personaData.forEach(person => {
         const option = document.createElement('option');
         option.value = person.player; // Set the option value to the player name.
         option.textContent = `${person.player} (${person.desc})`; // Set the option text to player + description.
         playerList.appendChild(option); // Add the option to the player dropdown.
      });
   }

   // Function to update the display of the selected act and scene.
   function updateSceneAndActDisplay() {
      const selectedActIndex = actList.value; // Get the selected act index.
      const selectedSceneIndex = sceneList.value; // Get the selected scene index.

      playHere.innerHTML = ''; // Clear any existing content in the playHere section.

      const selectedAct = playDataGlobal.acts[selectedActIndex]; // Get the selected act data.
      const selectedScene = selectedAct.scenes[selectedSceneIndex]; // Get the selected scene data.

      // Create and append the play title (h2).
      const titleElement = document.createElement('h2');
      titleElement.textContent = playDataGlobal.title;
      playHere.appendChild(titleElement);

      // Create an article to hold the act and scene content.
      const actElement = document.createElement('article');
      actElement.id = 'actHere'; // Set the article ID.
      playHere.appendChild(actElement);

      // Create and append the act title (h3).
      const actTitleElement = document.createElement('h3');
      actTitleElement.textContent = selectedAct.name;
      actElement.appendChild(actTitleElement);

      // Create a div for the scene content and append it.
      const sceneElement = document.createElement('div');
      sceneElement.id = 'sceneHere';
      actElement.appendChild(sceneElement);

      // Create and append the scene title (h4).
      const sceneTitleElement = document.createElement('h4');
      sceneTitleElement.textContent = selectedScene.name;
      sceneElement.appendChild(sceneTitleElement);

      // Create and append the stage direction (p).
      const stageDirectionElement = document.createElement('p');
      stageDirectionElement.className = 'direction';
      stageDirectionElement.textContent = selectedScene.stageDirection;
      sceneElement.appendChild(stageDirectionElement);

      // Loop through the speeches and append them with correct structure.
      selectedScene.speeches.forEach(speech => {
         const speechElement = document.createElement('div');
         speechElement.className = 'speech'; // Add speech class for styling.

         // Add speaker name (span).
         const speakerElement = document.createElement('span');
         speakerElement.textContent = speech.speaker;
         speechElement.appendChild(speakerElement);

         // Loop through the lines and append them as paragraphs (p).
         speech.lines.forEach(line => {
            const lineElement = document.createElement('p');
            lineElement.textContent = line;
            speechElement.appendChild(lineElement);
         });

         sceneElement.appendChild(speechElement); // Append the speech to the scene.
      });
   }

   // Add event listener to the highlight button to filter and highlight speeches.
   btnHighlight.addEventListener('click', function() {
      const searchTerm = txtHighlight.value.trim().toLowerCase(); // Get the search term.
      const selectedPlayer = playerList.value; // Get the selected player.

      clearHighlights(); // Clear any previous highlights.

      const speeches = document.querySelectorAll('.speech'); // Get all speech elements.

      // Loop through each speech to filter by player and highlight search term.
      speeches.forEach(speech => {
         const speaker = speech.querySelector('span').textContent; // Get the speaker's name.
         const lines = speech.querySelectorAll('p'); // Get all the lines in the speech.

         if (selectedPlayer !== "0" && speaker !== selectedPlayer) {
            speech.style.display = 'none'; // Hide speeches that don't match the selected player.
         } else {
            speech.style.display = ''; // Show speeches that match the selected player.
         }

         // Highlight search term in the lines.
         if (searchTerm) {
            lines.forEach(line => {
               const innerHTML = line.innerHTML; // Get the line's inner HTML.
               const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a regex for the search term.
               line.innerHTML = innerHTML.replace(regex, '<b>$1</b>'); // Wrap matching terms in <b> tags.
            });
         }
      });
   });

   // Function to clear any previous highlights.
   function clearHighlights() {
      const lines = document.querySelectorAll('.speech p'); // Get all speech lines.
      lines.forEach(line => {
         line.innerHTML = line.innerHTML.replace(/<b>(.*?)<\/b>/g, '$1'); // Remove <b> tags by replacing them with their content.
      });
   }
});
