import {Play,Act,Scene} from './play-module.js';

document.addEventListener("DOMContentLoaded", function() {
   //list of variables and constants used to address different parts of html
   const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
   const playlist = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList =document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const filterBtn = document.getElementById('btnHighlight');
   const filterText = document.getElementById('txtHighlight')
   var playTitle = document.querySelector('#playHere h2');
   var actTitle = document.querySelector('#actHere h3');
   var sceneTitle = document.querySelector('#sceneHere h4');
   var sceneHere = document.getElementById('sceneHere');
   var speechText = document.querySelectorAll('#sceneHere speech');

   //console.log(typeof(speechText), "speechtext in js ")

   playlist.addEventListener('change', (e)=>{ 
      fetch(url + `?name=${e.target.value}`)//fetches url based on play list
         //.then(console.log("hi"))
         .then(response => response.json())
         .then(play=> {
            playTitle.innerHTML = `${play.title}`; //changes play title on screen
            const playObj = new Play(play.title, play.short, play.persona, play.acts); //creates Play object for selected play
            //console.log(play);
            if (playObj.acts.length>0){ // initializes act and scene name to act 1 and scene 1 of selected play
               actList.value = playObj.acts[0].name;
               actTitle.innerHTML = playObj.acts[0].name;
               sceneList.value = playObj.acts[0].scenes[0].name;
               sceneTitle.innerHTML = playObj.acts[0].scenes[0].name;
            }

            playObj.startPlay(actList,sceneList,playerList);  //initializes and populates act list, scene list, and player list
            playObj.acts[0].scenes[0].speechFill(speechText,sceneHere); // fills dialogue of act 1 scene 1 onto screen of selected play automatically

            actList.addEventListener('change', (e) => { // when the selected act changes...
               sceneList.innerHTML = '';
               
               // Find the selected act and scene based on the act name
               const selectedAct = playObj.getAct(e.target.value);
               actTitle.innerHTML = selectedAct.name;
               sceneTitle.innerHTML = selectedAct.scenes[0].name;
               const selectedScene = selectedAct.getScene(selectedAct.scenes[0].name);
               selectedScene.speechFill(speechText,sceneHere);
               // If an act is selected and it has scenes, populate the sceneList dropdown
               if (selectedAct) {
                     selectedAct.sceneOptionList(sceneList);
                     sceneTitle.innerHTML = selectedAct.scenes[0].name;
                     
               }
            
      
            sceneList.addEventListener('change', (e)=>{ //if scene list is changed to another option...
              // console.log(selectedAct);
               if(selectedAct){
                  const selectedScene = selectedAct.getScene(e.target.value);
                  sceneTitle.innerHTML = selectedScene.name;
                  selectedScene.speechFill(speechText, sceneHere);

               }
               
            });

             playerList.addEventListener('change', (e)=>{ // when the playerlist changes....
               const selectedSpeaker = e.target.value;
               console.log(selectedSpeaker);
               const selectedScene = selectedAct.getScene(sceneTitle.innerHTML);
               console.log(selectedScene.name);
               if (selectedSpeaker!=null){ //if there is a speaker, speech fill with speaker
                  selectedScene.speechFill(speechText, sceneHere, selectedSpeaker);
               }
               else{ //reset speeches
                  selectedScene.speechFill(speechText,sceneHere);
               } 
               
            });
            
            
            filterBtn.addEventListener('click',(e)=>{ //filters when button is pressed
               let input = filterText.value;
               //console.log("Input",input);
               const selectedSpeaker = playerList.value;
              // console.log("SelectedSpeaker",selectedSpeaker);
               const selectedScene = selectedAct.getScene(sceneTitle.innerHTML);
               if (input && selectedSpeaker){ //yes input + yes selectedSpeaker 
                  console.log("1");
                  selectedScene.speechFill(speechText,sceneHere,selectedSpeaker,input);
               }
               else if (!input&&!selectedSpeaker){ // no input + no selectedSpeaker
                  console.log("2");
                  selectedScene.speechFill(speechText,sceneHere);
               }
               else if(input&&!selectedSpeaker){ //yes input + no selectedSpeaker
                  console.log("3");
                  selectedScene.speechFill(speechText,sceneHere, null ,input);
               }
               else if(!input&&selectedSpeaker){ // no input + yes speaker
                  console.log("4");
                  selectedScene.speechFill(speechText, sceneHere, selectedSpeaker, null);
               }
            });

            
         });
         

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
});
