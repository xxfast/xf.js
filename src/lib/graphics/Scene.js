import {GameObject} from '../core/GameObject'
import {Manager} from '../core/managers/Manager'
import {Camera} from './Camera'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single scene that contains child sprite elements
*/
export class Scene extends GameObject{
  /**
    * Create an Scene.
    * @param {string} id - name of the Scene.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,bg="white",w,h,canvas=null) {
    super(id,0,0,w,h);
    this.elements = [];
    this.managers = {};
    this.manageProfiles = {Animatable:{process:{on:1}},
                           Rotatable:{process:{on:1}}};
    this.observer = null;
    this.background = bg;
    this.canvas = canvas;
  }

  /*
    * checks whether the givens gameobject is a part of this scene
    * @param {GameObject} obj - the object to check
    *   @returns {int} index found
  */
  contains(object){
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].identify(object.id)){
        return i;
      }
    }
    return -1;
  }

  /*
    * adds gameobjects to the scene
    * @param {GameObject[]} args - the gameobjects to add to the scene.
    *   @returns {Scene} itself
  */
  add(args){
    for (var i = 0; i < arguments.length; i++ ) {
      this.elements.push(arguments[i]);
      for (var component in arguments[i].components) {
        if (arguments[i].components.hasOwnProperty(component)) {
          if(!this.managers.hasOwnProperty(component)){
            this.managers[component] = new Manager();
            this.managers[component].adopt(this.manageProfiles[component]);
          }
          this.managers[component].manage(arguments[i].components[component],this.manageProfiles[component]);
        }
      }
      if((arguments[i] instanceof Camera))
        arguments[i].targets(this);
    }
    return this;
  }

  /*
    * removes a gameobject from the scene
    * @param {GameObject} obj - the canvas to draw the scene on.
  */
  remove(obj){
    this.elements = this.elements.filter(item => item !== obj);
    return this;
  }

  /*
    * adds and sets the observer for the scene
    * @param {Camera} camera - the camera to set to observe through
    *   @returns {Scene} itself
  */
  observe(camera=null){
    if(this.contains(camera)<0) this.add(camera);
    this.observer = camera;
    return this;
  }

  /**
    * initialise the scene and components
  */
  initialise(){
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].initialise();
      }
    }
  }

  /**
    * updates the scene once
  */
  update(){
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].update();
      }
    }
  }

  /**
   * clear the rendered patch for the scene
   * @param {context} c - the canvas to clear the canvas scene on.
   */
  clear(c){
      c.fillStyle=this.background;
      c.clearRect(0, 0, this.scale.width, this.scale.height);
      c.fillRect(0, 0, this.scale.width, this.scale.height );
  }

  /**
    * renders the scene on the given canvas,
    * if a camera is proviced, then as seen from the given camera
    * @param {context} c - the canvas to draw the scene on.
    * @param {Camera} [camera=false] - the camera to look at the scene from.
  */
  render(c,camera=this.observer){ // {position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}
    this.canvas = c.canvas;
    this.clear(c);
    c.save();
    //c.translate(-camera.position.x + camera.origin.x, -camera.position.y + camera.origin.y);
    // c.translate(((camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    c.rotate(-(camera.rotation) * Math.PI/180);
    // c.translate(((-camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((-camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    //c.translate(camera.position.x - camera.origin.x, camera.position.y - camera.origin.y);
    // for(var i=0; i<this.elements.length; i++){
    //   var s = this.elements[i];
    //   if(!(s instanceof Camera) && ( !camera || s.within(camera) )){
    //     this.elements[i].render(c,camera || undefined);
    //   }
    // }
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].render(c,camera);
      }
    }
    c.rotate((camera.rotation) * Math.PI/180);
    if(this.debug){
        var i = 0;
        c.fillStyle="white";
        c.fillRect(-1,-1,100,Object.keys(this.debug).length*12+5);
        for(var prop in this.debug){
          c.fillStyle="black";
          c.font="12px Helvatica";
          c.fillText(prop + ': ' + this.debug[prop], 5, (++i)*12);
        }
    }
  }
}
