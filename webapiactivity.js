import {Play,Act,Scene} from './play-module.js';

document.addEventListener("DOMContentLoaded", function() {
   const playlist = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList =document.getElementById('sceneList');
   var playTitle = document.querySelector('#playHere h2');
   var actTitle = document.querySelector('#actHere h3');
   var sceneTitle = document.querySelector('#sceneHere h4');
   var sceneHere = document.getElementById('sceneHere');
   var speechText = document.querySelectorAll('#sceneHere speech');

   console.log(typeof(speechText), "speechtext in js ")
   playlist.addEventListener('change', (e)=>{
      fetch(url + `?name=${e.target.value}`)
         //.then(console.log("hi"))
         .then(response => response.json())
         .then(play=> {
            playTitle.innerHTML = `${play.title}`;
            const playObj = new Play(play.title, play.short, play.persona, play.acts);
            //console.log(play);
            if (playObj.acts.length>0){
               actList.value = playObj.acts[0].name;
               actTitle.innerHTML = playObj.acts[0].name;
               sceneList.value = playObj.acts[0].scenes[0].name;
               sceneTitle.innerHTML = playObj.acts[0].scenes[0].name;
            playObj.startPlay(actList,sceneList);
            }
            actList.addEventListener('change', (e) => {
               sceneList.innerHTML = '';
               
               // Find the selected act based on the act name
               const selectedAct = playObj.getAct(e.target.value);
               actTitle.innerHTML = selectedAct.name;
               sceneTitle.innerHTML = selectedAct.scenes[0].name;

               // If an act is selected and it has scenes, populate the sceneList dropdown
               if (selectedAct) {
                     selectedAct.sceneOptionList(sceneList);
                     sceneTitle.innerHTML = selectedAct.scenes[0].name;
                     
               }
            
            
            sceneList.addEventListener('change', (e)=>{
              // console.log(selectedAct);
               if(selectedAct){
                  const selectedScene = selectedAct.getScene(e.target.value);
                  sceneTitle.innerHTML = selectedScene.name;


                  selectedScene.speechFill(speechText, sceneHere);

               }
               
            });
         });
            
            
       })

        });
      });


	
	const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

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
