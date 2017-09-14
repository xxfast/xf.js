/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a scene manager managing the scenes of a game
*/
import {Manager} from '../../core/managers/Manager'
import {Camera} from './../Camera'
import {Scene} from './../Scene'

export class SceneManager extends Manager{
  constructor(owner) {
    super();
    this.owner = owner;
    this.scenes = [];
    this.current = null;
    this.initialise();
  }

  /*
    * initialises the scene manager's context, and creates the default scene and a default camera
    *   @returns {SceneManager} self
  */
  initialise(){
      var camera = new Camera("default").transform(this.owner.size.width,this.owner.size.height).center();
      var scene = new Scene("default","#eaeaea").observe(camera);
      this.set(scene);
      return this;
  }

  /*
    * checks whether the givens scene is a part of this game
    * @param {Scene} scene - the scene to check
    *   @returns {int} index found
  */
  contains(scene){
    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].identify(scene.id)){
        return i;
      }
    }
    return -1;
  }

  /*
    * adds a given scene to the list of scenes
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  add(scene){
    this.scenes.push(scene);
    return this;
  }

  /*
    * sets a given scene to the current of scene
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  set(scene){
    if(this.contains(scene)<0) this.add(scene);
    this.current = this.scenes[this.contains(scene)];
    return this;
  }

  /*
    * gets the first scene that matches the id
    * @param {string} id - id of the scene to get
    *   @returns {Scene} found[=null]
  */
  get(id){
    for(var i=0;i<this.scenes.length;i++)
      if(this.scenes[i].id==id)
        return this.scenes[i];
    return null;
  }

  /*
    * removes the first scene that matches the id
    * @param {string} id - the id of the scene to remove
    *   @returns {Scene} the removed scene
  */
  remove(id){
    var index = this.contains(this.get(id));
    var toReturn = ((index>0)?this.scenes.splice(index,1):null);
    return toReturn;
  }

  /**
    *  processes the current scene the SceneManager is focused on
  */
  process(){
    if(this.current){
      this.current.update();
    }
  }

  /**
    *  render the current scene the SceneManager is focused on
  */
  render(cc){
    if(this.current){
      this.current.render(cc);
    }
  }
}
