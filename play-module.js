/* In this module, create three classes: Play, Act, and Scene. */

// Play module with Play, Act, and Scene classes

class Play {
    constructor(title, acts = []) {
       this.title = title;
       this.acts = acts.map(actData => new Act(actData));
    }
 
    render(playHere, actHere, sceneHere) {
       // Set the title of the play
       playHere.querySelector('h2').textContent = this.title;
 
       // Render the first act and its first scene
       if (this.acts.length > 0) {
          this.acts[0].render(actHere, sceneHere);
       }
    }
 }
 
 class Act {
    constructor(actData) {
       this.name = actData.name;
       this.scenes = actData.scenes.map(sceneData => new Scene(sceneData));
    }
 
    render(actHere, sceneHere) {
       // Set the act name
       actHere.querySelector('h3').textContent = this.name;
 
       // Render the first scene in this act
       if (this.scenes.length > 0) {
          this.scenes[0].render(sceneHere);
       }
    }
 }
 
 class Scene {
    constructor(sceneData) {
       this.name = sceneData.name;
       this.content = sceneData.content; // array of speech, title, direction, etc.
    }
 
    render(sceneHere) {
       // Set the scene name
       sceneHere.querySelector('h4').textContent = this.name;
 
       // Clear previous content
       sceneHere.querySelectorAll('.speech, .title, .direction').forEach(el => el.remove());
 
       // Populate scene content (speeches, titles, directions, etc.)
       this.content.forEach(content => {
          const element = document.createElement(content.type);
          element.className = content.class;
          element.innerHTML = content.text;
          sceneHere.appendChild(element);
       });
    }
 }
 
 export { Play, Act, Scene };
 