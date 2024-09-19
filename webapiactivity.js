document.addEventListener("DOMContentLoaded", function() {
	const playList = document.getElementById('playList');
	const actList = document.getElementById('actList');
	const sceneList = document.getElementById('sceneList');
	const playHere = document.getElementById('playHere');
	const actHere = document.getElementById('actHere');
	const sceneHere = document.getElementById('sceneHere');
	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

	playList.addEventListener('change', function() {
		const playId = playList.value;
		if (playId !== '0') {
			fetch(url + '?name=' + playId)
				.then(response => response.json())
				.then(data => {
					actList.innerHTML = '';
					sceneList.innerHTML = '';
					playHere.innerHTML = data.title;

					data.acts.forEach(act => {
						const option = document.createElement('option');
						option.value = act.act;
						option.textContent = act.title;
						actList.appendChild(option);
					});

					const firstAct = playData.acts[0];
					firstAct.scenes.forEach((scene, sceneIndex) => {
						const sceneOption = document.createElement('option');
						sceneOption.text = scene.name;
						sceneOption.value = sceneIndex;
						sceneList.appendChild(sceneOption);
					});

					const firstScene = firstAct.scenes[0];
					displayScene(firstScene);
				});
		}
	});
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