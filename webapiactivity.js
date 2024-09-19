

document.addEventListener("DOMContentLoaded", function() {
   const playlist = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList =document.getElementById('sceneList');
   var playTitle = document.querySelector('#playHere h2');
   var actTitle = document.querySelector('#actHere h3');
   var sceneTitle = document.querySelector('#sceneHere h4');
   
   playlist.addEventListener('change', (e)=>{
      fetch(url+ `?name=${e.target.value}`)
         .then(console.log("hi"))
         .then(response => response.json())
         .then(play=> {
            playTitle.innerHTML = `${play.title}`;
            
            //console.log(play);
            const acts = [];

            play.acts.forEach(element => { //for each play, puts the acts into an array 
               acts.push(element);

            } )
            console.log(acts);
            if (acts.length>0){
               actList.value = acts[0].name;
               actTitle.innerHTML = acts[0].name;
               sceneList.value = acts[0].scenes[0].name;
               sceneTitle.innerHTML = acts[0].scenes[0].name;
            }

            actList.innerHTML= '';
            sceneList.innerHTML = '';

            const actInitial = document.createElement('option');
            actInitial.value = "Select An Act";
            actInitial.text = "Select An Act";
            actList.appendChild(actInitial);

            const sceneInitial = document.createElement('option');
            sceneInitial.value = "Select A Scene";
            sceneInitial.text = "Select A Scene";
            sceneList.appendChild(sceneInitial);
         

            acts.forEach(act => { //for each act...
               const optionAct = document.createElement('option');
               optionAct.value = act.name;
               optionAct.text = act.name;
               actList.appendChild(optionAct); 
            
         
            actList.addEventListener('change', (e) => {
               actTitle.innerHTML = e.target.value;
               
               // Find the selected act based on the act name
               const selectedAct = acts.find(act => act.name === e.target.value);
               sceneTitle.innerHTML = selectedAct.scenes[0].name;

               // Clear previous scenes
               sceneList.innerHTML = '';

               // If an act is selected and it has scenes, populate the sceneList dropdown
               if (selectedAct && selectedAct.scenes) {
                     selectedAct.scenes.forEach(scene => {
                        const optionScene = document.createElement('option');
                        optionScene.value = scene.name;
                        optionScene.text = scene.name;
                        sceneList.appendChild(optionScene);
                     });   
               }
            
            });
            sceneList.addEventListener('change', (e)=>{
               sceneTitle.innerHTML = e.target.value;
            })
            });
            
       })

        });
   });

	
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
// });