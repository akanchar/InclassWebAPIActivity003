console.log("Script is loading");

import { Play, Act, Scene } from './play-module.js';

document.addEventListener("DOMContentLoaded", function () {
	console.log("DOMContentLoaded event fired");

	const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

	let play = null;

	//event listener for selecting a play
	document.querySelector('#playList').addEventListener('change', async function () {
		const selectedPlay = this.value;
		console.log(`Play selected: ${selectedPlay}`);

		if (selectedPlay !== '0') {
			try {
				const response = await fetch(`${url}?name=${selectedPlay}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const playData = await response.json();
				play = new Play(playData);
				//display play title
				displayPlayTitle(play.title); 
				//displays acts and scenes
				displayPlayData(play);
			} catch (error) {
				console.error('Error fetching play data:', error);
			}
		}
	});

	//function to display the play title
	function displayPlayTitle(title) {
		const titleElement = document.querySelector('#playTitle');
		titleElement.textContent = title;
	}

	//event listener for selecting an act
	document.querySelector('#actList').addEventListener('change', function () {
		const selectedActIndex = this.value;
		if (play && play.acts[selectedActIndex]) {
			const selectedAct = play.acts[selectedActIndex];
			//display the selected act's first scene
			displayActScene(selectedAct); 
			populateSceneDropdown(selectedAct);
		}
	});

	//event listener for selecting a scene
	document.querySelector('#sceneList').addEventListener('change', function () {
		const selectedActIndex = document.querySelector('#actList').value;
		const selectedSceneIndex = this.value;
		if (play && play.acts[selectedActIndex] && play.acts[selectedActIndex].scenes[selectedSceneIndex]) {
			const selectedScene = play.acts[selectedActIndex].scenes[selectedSceneIndex];
			//display the selected scene
			displayScene(selectedScene);
			//populate players in the selected scene
			populatePlayerDropdown(selectedScene); 
		}
	});

	//event listener for the filter button (highlighting search terms)
	document.querySelector('#btnHighlight').addEventListener('click', function () {
		const selectedActIndex = document.querySelector('#actList').value;
		const selectedSceneIndex = document.querySelector('#sceneList').value;
		const searchTerm = document.querySelector('#txtHighlight').value.trim().toLowerCase();
		const selectedPlayer = document.querySelector('#playerList').value;

		if (play && play.acts[selectedActIndex] && play.acts[selectedActIndex].scenes[selectedSceneIndex]) {
			const selectedScene = play.acts[selectedActIndex].scenes[selectedSceneIndex];
			 //highlights speeches based on player and search term
			highlightSpeeches(selectedScene, searchTerm, selectedPlayer);
		}
	});

	//function to display the list of acts in a play
	function displayPlayData(play) {
		const actList = document.querySelector('#actList');
		actList.innerHTML = '';
		play.acts.forEach((act, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = act.name;
			actList.appendChild(option);
		});

		if (play.acts[0]) {
			//display first act and scene by default
			displayActScene(play.acts[0]);  
			populateSceneDropdown(play.acts[0]); 
		}
	}

	//function to populate the scene dropdown for a selected act
	function populateSceneDropdown(act) {
		const sceneList = document.querySelector('#sceneList');
		sceneList.innerHTML = '';
		act.scenes.forEach((scene, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = scene.name;
			sceneList.appendChild(option);
		});

		if (act.scenes[0]) {
			//display the first scene by default
			displayScene(act.scenes[0]);
			//populate players for the first scene
			populatePlayerDropdown(act.scenes[0]); 
		}
	}

	//function to populate the player dropdown for a selected scene
	function populatePlayerDropdown(scene) {
		const playerList = document.querySelector('#playerList');
		playerList.innerHTML = '';
		const uniquePlayers = new Set(scene.speeches.map(speech => speech.speaker));

		const allPlayersOption = document.createElement('option');
		allPlayersOption.value = '0';
		allPlayersOption.textContent = 'All Players';
		playerList.appendChild(allPlayersOption);

		uniquePlayers.forEach(player => {
			const option = document.createElement('option');
			option.value = player;
			option.textContent = player;
			playerList.appendChild(option);
		});
	}

	//function to display the first scene in the selected act
	function displayActScene(act) {
		const actHere = document.querySelector('#actHere');
		const sceneHere = document.querySelector('#sceneHere');

		actHere.innerHTML = `<h3>${act.name}</h3>`;
		sceneHere.innerHTML = '';

		if (act.scenes && act.scenes[0]) {
			const scene = act.scenes[0];
			sceneHere.innerHTML = `
                <h4>${scene.name}</h4>
                <p class="title">${scene.title}</p>
                <p class="direction">${scene.stageDirection}</p>
            `;

			scene.speeches.forEach(speech => {
				const speechDiv = document.createElement('div');
				speechDiv.classList.add('speech');
				speechDiv.innerHTML = `<span>${speech.speaker}</span><p>${speech.lines.join(' ')}</p>`;
				sceneHere.appendChild(speechDiv);
			});
		}
	}

	//function to display the selected scene
	function displayScene(scene) {
		const sceneHere = document.querySelector('#sceneHere');
		sceneHere.innerHTML = '';

		sceneHere.innerHTML = `
            <h4>${scene.name}</h4>
            <p class="title">${scene.title}</p>
            <p class="direction">${scene.stageDirection}</p>
        `;

		scene.speeches.forEach(speech => {
			const speechDiv = document.createElement('div');
			speechDiv.classList.add('speech');
			speechDiv.innerHTML = `<span>${speech.speaker}</span><p>${speech.lines.join(' ')}</p>`;
			sceneHere.appendChild(speechDiv);
		});
	}

	//unfction to highlight speeches in a scene based on search term and player
	function highlightSpeeches(scene, searchTerm, selectedPlayer) {
		const sceneHere = document.querySelector('#sceneHere');
		sceneHere.innerHTML = '';

		scene.speeches.forEach(speech => {
			let speechText = speech.lines.join(' ');

			if (searchTerm) {
				const regex = new RegExp(`(${searchTerm})`, 'gi');
				speechText = speechText.replace(regex, '<b>$1</b>');
			}

			const speechDiv = document.createElement('div');
			speechDiv.classList.add('speech');

			if (selectedPlayer === '0' || speech.speaker === selectedPlayer) {
				speechDiv.innerHTML = `<span>${speech.speaker}</span><p>${speechText}</p>`;
			} else {
				speechDiv.innerHTML = `<span>${speech.speaker}</span><p>${speech.lines.join(' ')}</p>`;
			}

			sceneHere.appendChild(speechDiv);
		});
	}
});

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