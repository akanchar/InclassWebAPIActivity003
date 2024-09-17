

document.addEventListener("DOMContentLoaded", function() {
   const playlist = document.getElementById('playList');
   
   playlist.addEventListener('click', (e)=>{
      fetch(url+ `?name=${e.target.value}`)
         .then(console.log("hi"))
         .then(play = JSON.parse(e.target.value))
         .then(play=>{
            const acts = [];
            play.forEach( element => {
               acts = element.acts;
            } )
            acts.forEach(act => {
               const option = document.createElement('option');
               option.value = 
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