import {SceneManager} from './managers/SceneManager'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single game instance
*/

export class Game {
  /*
    * creates the game instance
    *   @returns {Game} itself
  */
  constructor() {
    this.managers = { scenes: new SceneManager() };
    this.states = [];
    this.canvas = null;
    this.display = { options:{
                        fullscreen:false,
                        framerate: 60
                     },
                     context: null,
                     container: null
                   };
  }

  /*
    * builds the game instance
    *   @returns {Game} itself
  */
  build(){
    var container = null, dpr = window.devicePixelRatio;
    this.canvas = document.createElement('canvas');
    /* if no container is specified, then the game will be attached to the root
       root document body, otherwise will be attached to the given node
    */
    if(this.display.container == null){
      this.display.container = document.body; // window;
      container = this.display.container;
      console.log("container is set to " + container);
    }

    var w = this.canvas.width = container.innerWidth;
    var h = this.canvas.height = container.innerHeight;
    var scale = Math.min(container.innerHeight / h, container.innerWidth / w);

    if(this.display.container==null){
      if(this.display.options.fullscreen){
        this.canvas.style.position = "absolute";
        this.canvas.style.width = (w * scale) + "px";
        this.canvas.style.height = (h * scale) + "px";
        this.canvas.style.left = (window.innerWidth * 0.5 - w * scale * 0.5) + "px";
        this.canvas.style.top = (window.innerHeight * 0.5 - h * scale * 0.5) + "px";
      }
      document.body.appendChild(this.canvas);
    }else{
      this.display.container.appendChild(this.canvas);
    }
    this.display.context = this.canvas.getContext("2d");
    return this;
  }

  /*
    * run the game loop
    *   @returns {Game} itself
  */
  start(){
    var callback = this;
    window.onload = function () {
        console.log("callback = " + callback);
        console.log("callback.display = " +  callback.display);
        console.log("callback.display = " +  callback.display);
        console.log("callback.display.options = " +  callback.display.options);
        setInterval(callback.update.call(callback), callback.display.options.framerate);
    }
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
      this.render();
  }

  /*
    * renders the current scene of this game
  */
  render(){
    this.managers.scenes.render(this.display.context);
  }

}
