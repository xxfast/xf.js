/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single game instance
*/
import {SceneManager} from 'managers/SceneManager'

export class Game {
  constructor() {
    this.managers = { scenes: new SceneManager() };
    this.states = [];
  }

  /*
    * gets the scene manager of this game
    *   @returns {SceneManager} sceneManager
  */
  scenes(){
    return this.managers.scenes;
  }

  /*
    * updates the current scene of this game
  */
  update(){
      this.managers.scenes.process();
  }

  /*
    * renders the current scene of this game
  */
  render(){
    this.managers.scenes.render();
  }

}
