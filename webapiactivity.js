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
      if (playValue === '0') return; // Ignore the default option

      try {
         // Fetch the play data using the selected play's value as a query string
         const response = await fetch(`https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php?name=${playValue}`);
         const playData = await response.json();

         // Populate actList with the acts from the play
         actList.innerHTML = playData.acts.map(act => `<option value="${act.id}">${act.name}</option>`).join('');

         // Populate sceneList with the scenes from the first act
         sceneList.innerHTML = playData.acts[0].scenes.map(scene => `<option value="${scene.id}">${scene.name}</option>`).join('');

         // Populate playerList with the characters/players from the play
         playerList.innerHTML = playData.players.map(player => `<option value="${player.id}">${player.name}</option>`).join('');
         playerList.insertAdjacentHTML('afterbegin', '<option value="0">All Players</option>'); // Add default option

         // Populate playHere, actHere, and sceneHere elements with the first scene from the first act
         playHere.querySelector('h2').textContent = playData.title;
         actHere.querySelector('h3').textContent = playData.acts[0].name;
         sceneHere.querySelector('h4').textContent = playData.acts[0].scenes[0].name;

         // Clear previous scene content before adding new content
         sceneHere.querySelectorAll('.speech, .title, .direction').forEach(el => el.remove());

         // Add the content of the first scene (like speeches, directions, etc.)
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
